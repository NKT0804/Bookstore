import express from "express";
import mongoose from "mongoose";
import expressAsyncHandler from "express-async-handler";
import { admin, protect } from "../middleware/AuthMiddleware.js";
import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";
import Cart from "../models/CartModel.js";
import { orderQueryParams, validateConstants } from "../constants/searchConstants.js";

//User place new order
const createNewOrder = async (req, res, next) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    const orderItemsId = orderItems.map((orderItem) => orderItem.product);
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("Đơn hàng không có sản phẩm nào!");
    }
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        res.status(404);
        throw new Error("Giỏ hàng không tồn tại!");
    }
    const session = await mongoose.startSession();
    const transactionOptions = {
        readPreference: "primary",
        readConcern: { level: "local" },
        writeConcern: { w: "majority" }
    };
    try {
        await session.withTransaction(async () => {
            const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            });
            for (const orderItem of orderItems) {
                const orderedProduct = await Product.findOneAndUpdate(
                    { _id: orderItem.product, isDisabled: false, countInStock: { $gte: orderItem.qty } },
                    { $inc: { countInStock: -orderItem.qty, totalSales: +orderItem.qty } },
                    { new: true }
                ).session(session);
                if (!orderedProduct) {
                    await session.abortTransaction();
                    res.status(400);
                    throw new Error("Đơn hàng có sản phẩm đã vượt số lượng sản phẩm trong kho!");
                }
                /* let cartItemIndex = cart.cartItems.findIndex(
                        (cartItem) => cartItem.product.toString() == orderItem.product.toString()
                    );
                    if (cartItemIndex !== -1) {
                        cart.cartItems.splice(cartItemIndex, 1);
                    } */
            }
            const updatedCart = await Cart.findOneAndUpdate(
                { user: req.user._id },
                { $pull: { cartItems: { product: { $in: orderItemsId } } } }
            );
            if (!updatedCart) {
                await session.abortTransaction();
                res.status(500);
                throw new Error("Xóa sản phẩm trong giỏ hàng không thành công!");
            }
            const createdOrder = await order.save();
            res.status(201);
            res.json(createdOrder);
            //  send order to customer
            const url = `${process.env.WEB_CLIENT_URL}/order`;
            const html = `
            <div style = "display: flex">
            <span>Mã đơn hàng: </span>
            <span>${order._id}</span>
            </div>
            <div>
            
            </div>
            `;
        }, transactionOptions);
    } catch (error) {
        next(error);
    } finally {
        await session.endSession();
    }
};

//Get order
const getOrderAdmin = async (req, res) => {
    let page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const keyword = req.query.keyword || "";

    const statusFilter = validateConstants(orderQueryParams, "status", req.query.status);
    const count = await Order.countDocuments({ ...statusFilter });
    if (count == 0) {
        res.status(204);
        throw new Error("Không có đơn hàng nào!");
    }
    const pages = Math.ceil(count / limit);
    page = page <= pages ? page : 1;
    const orders = await Order.find({ ...statusFilter })
        .limit(limit)
        .skip(limit * (page - 1))
        .sort({ createdAt: "desc" })
        .populate("user", "-password");
    res.status(200);
    res.json({ orders, page, pages, total: count });
};

/**
 * Read: ADMIN GET ALL ORDERS
 */
// orderRouter.get(
//     "/all",
//     protect,
//     admin,
//     expressAsyncHandler(async (req, res) => {
//         //await Order.updateMany({}, { $set: { isDisabled: false } }, {multi: true});
//         const orders = await Order.find({ isDisabled: false }).sort({ _id: -1 }).populate("user", "-password");
//         res.json(orders);
//     })
// );

// //Admin get all disabled orders
// orderRouter.get(
//     "/disabled",
//     protect,
//     admin,
//     expressAsyncHandler(async (req, res) => {
//         const orders = await Order.find({ isDisabled: true });
//         if (orders.length != 0) {
//             res.status(200);
//             res.json(orders);
//         } else {
//             res.status(204);
//             res.json({ message: "No orders are disabled" });
//         }
//     })
// );

/**
 * Read: USER LOGIN ORDERS
 */
const getOrder = async (req, res) => {
    const orders = await Order.find({ user: req.params.user, isDisabled: false })
        .sort({ createdAt: "desc" })
        .populate("user", "-password");
    res.json(orders);
};

/**
 * Read: GET ORDER BY ID
 */
const getDetailOrderById = async (req, res) => {
    const orderId = req.params.id || null;
    const order = await Order.findOne({ _id: orderId, isDisabled: false }).populate("user", "-password");
    if (!order) {
        res.status(404);
        throw new Error("Đơn hàng không tồn tại!");
    }
    res.status(200);
    res.json(order);
};

/**
 * Update: ORDER IS PAID
 */
const orderPayment = async (req, res) => {
    const orderId = req.params.id || null;
    const order = await Order.findOne({ _id: orderId, isDisabled: false });
    if (!order) {
        res.status(404);
        throw new Error("Đơn hàng không tồn tại!");
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    const updateOrder = await order.save();
    res.json(updateOrder);
};

/**
 * Update: ORDER IS DELIVERED
 */
const confirmDelivered = async (req, res) => {
    const orderId = req.params.id || null;
    const order = await Order.findOne({ _id: orderId, isDisabled: false });
    if (!order) {
        res.status(404);
        throw new Error("Đơn hàng không tồn tại!");
    }
    order.delivered = true;
    order.deliveredAt = Date.now();
    const updateOrder = await order.save();
    res.status(200);
    res.json(updateOrder);
};

/**
 * Update: CONFIRM ORDER
 */
const confirmOrder = async (req, res) => {
    const orderId = req.params.id || null;
    const order = await Order.findOne({ _id: orderId, isDisabled: false });
    if (!order) {
        res.status(404);
        throw new Error("Đơn hàng không tồn tại!");
    }
    order.confirmed = true;
    const updateOrder = await order.save();
    res.status(200);
    res.json(updateOrder);
};

/**
 * Update: CANCEL ORDER ADMIN
 */
const cancelOrderAdmin = async (req, res) => {
    const orderId = req.params.id || null;
    const order = await Order.findOne({ _id: orderId, isDisabled: false });
    if (!order) {
        res.status(404);
        throw new Error("Đơn hàng không tồn tại!");
    }
    order.cancelled = true;
    const updateOrder = await order.save();
    res.status(200);
    res.json(updateOrder);
};

/**
 * Update: CANCEL ORDER USER
 */
const cancelOrderUser = async (req, res) => {
    const orderId = req.params.id || null;
    const userId = req.user._id || null;
    const order = await Order.findOne({ _id: orderId, user: userId, isDisabled: false });
    if (!order) {
        res.status(404);
        throw new Error("Đơn hàng không tồn tại!");
    }
    order.cancelled = true;
    const updateOrder = await order.save();
    res.status(200);
    res.json(updateOrder);
};

/**
 * Update: ORDER IS RECEIVED
 */
const Received = async (req, res) => {
    const orderId = req.params.id || null;
    const order = await Order.findOne({ _id: orderId, isDisabled: false });
    if (!order) {
        res.status(404);
        throw new Error("Đơn hàng không tồn tại!");
    }
    order.received = true;
    const updateOrder = await order.save();
    res.status(200);
    res.json(updateOrder);
};
//Admin disable order
const disableOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        res.status(404);
        throw new Error("Đơn hàng không tồn tại!");
    }
    order.isDisabled = true;
    await order.save();
    res.status(200);
    res.json({ message: "Đơn hàng đã bị vô hiệu hóa!" });
};

//Admin restore disabled order
const restoreOrder = async (req, res) => {
    const orderId = req.params.id || null;
    const order = await Order.findOne({ _id: orderId, isDisabled: true });
    if (!order) {
        res.status(404);
        throw new Error("Đơn hàng không tồn tại!");
    }
    order.isDisabled = save;
    const updateOrder = await order.save();
    res.status(200);
    res.json(updateOrder);
};

//Admin delete order
const deleteOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        res.status(404);
        throw new Error("Đơn hàng không tồn tại!");
    }
    await order.remove();
    res.status(200);
    res.json({ message: "Đơn hàng đã được xóa!" });
};

const OrderController = {
    createNewOrder,
    getOrderAdmin,
    getOrder,
    getDetailOrderById,
    orderPayment,
    confirmDelivered,
    confirmOrder,
    cancelOrderAdmin,
    cancelOrderUser,
    Received,
    disableOrder,
    restoreOrder,
    deleteOrder
};

export default OrderController;
