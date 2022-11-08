import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../components/base/LoadingError/Error";
import Header from "../components/Header";
import { createOrder } from "../Redux/Actions/orderActions";
import { ORDER_CREATE_RESET } from "../Redux/Constants/orderConstants";
import Toast from "../components/base/LoadingError/Toast";
import formatCash from "../utils/formatCash";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000
};
const PlaceOrderScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();

  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Thanh toán khi nhận hàng");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => {
    return state.cartListItem.cartUser ?? state.cartListItem;
  });
  const { cartItems } = cart;

  let newCartOrder = cartItems.reduce((arrayCartCurrent, item) => {
    arrayCartCurrent.push({
      name: item.product.name,
      qty: item.qty,
      image: item.product.image,
      price: item.product.price,
      product: item.product._id
    });
    return arrayCartCurrent;
  }, []);

  cart.itemsPrice = Number(cart.cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0));
  cart.shippingPrice = 15000;
  cart.taxPrice = Math.round(Number(0.05 * cart.itemsPrice));
  cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (userInfo) {
      setShippingAddress(
        userInfo.address?.province.concat(
          ", ",
          userInfo.address?.district,
          ", ",
          userInfo.address?.ward,
          ", ",
          userInfo.address?.specificAddress
        )
      );
    }
  });
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      toast.success("Product order success!!!", ToastObjects);
    }
    if (error) {
      toast.error(error, ToastObjects);
    }
    dispatch({ type: ORDER_CREATE_RESET });
  }, [history, dispatch, success, order, error]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: newCartOrder,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice
      })
    );
  };

  return (
    <>
      <Toast />
      <Header />
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Khách hàng</strong>
                </h5>
                <p>Tên: {userInfo?.name}</p>
                <p>SĐT: {userInfo?.phone}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Thông tin vận chuyển</strong>
                </h5>
                <p>Đơn vị vận chuyển: GHTK</p>
                <p>Hình thức vận chuyển: Nhanh</p>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Địa chỉ giao hàng</strong>
                  <p>{shippingAddress}</p>
                </h5>
                <Link to={"/shipping"}>Thay đổi</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {cartItems?.length === 0 ? (
              <Message variant="alert-info mt-5">Your cart is empty</Message>
            ) : (
              <>
                {cartItems?.map((item, index) => (
                  <div className="order-product row" key={index}>
                    <div className="col-md-3 col-6">
                      <Link to={`/product/${item.product}`}>
                        <img src={item.product.image} alt={item.name} />
                      </Link>
                    </div>
                    <div className="col-md-5 col-6 d-flex align-items-center">
                      <Link to={`/product/${item.product}`}>
                        <h6>{item.product.name}</h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                      <h4>Số lượng</h4>
                      <h6>{item.qty}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                      <h4>Đơn giá</h4>
                      <h6>{formatCash(item.product.price)}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                      <h4>Thành tiền</h4>
                      <h6>{formatCash(item.qty * item.product.price)}</h6>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* total */}
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Tổng tiền sách</strong>
                  </td>
                  <td>{formatCash(cart.itemsPrice)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Phí vận chuyển</strong>
                  </td>
                  <td>{formatCash(cart.shippingPrice)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Thuế VAT (5%)</strong>
                  </td>
                  <td>{formatCash(cart.taxPrice)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Tổng số tiền</strong>
                  </td>
                  <td>{formatCash(cart.totalPrice)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Phương thức thanh toán</strong>
                  </td>
                  <td>
                    {/* <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                      <option key={"thanh-toan-khi-nhan-hang"} value={"Thanh toán khi nhận hàng"}> */}
                    Thanh toán khi nhận hàng
                    {/* </option>
                    </select> */}
                  </td>
                </tr>
              </tbody>
            </table>
            {cart.cartItems.length === 0 ? null : (
              <button type="submit" onClick={placeOrderHandler}>
                Đặt hàng
              </button>
            )}
            {/* {error && (
              <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
