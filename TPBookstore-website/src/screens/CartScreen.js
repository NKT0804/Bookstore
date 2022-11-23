import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartListItem, removeFromCartItem, updateCart } from "./../Redux/Actions/cartActions";
import { toast } from "react-toastify";
import Toast from "../components/base/LoadingError/Toast";
import formatCash from "../utils/formatCash";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000
};
const CartScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    return state.cartListItem.cartUser ?? state.cartListItem;
  });
  const { cartItems } = cart;

  // product total handler
  const itemChecked = cartItems?.filter((item) => item.isBuy === true);
  const totalHandler = itemChecked?.reduce((pro, item) => pro + item.qty * item?.product.price, 0); /*.toFixed(2);*/

  const addToCart = useSelector((state) => state.addToCart);
  const { success } = addToCart;

  const removeCart = useSelector((state) => state.removeCart);
  const { success: removeCartSuccess, error: removeCartError, message: removeCartMessage } = removeCart;

  const updateCartStore = useSelector((state) => state.cartUpdate);
  const { success: updateCartSuccess, error: updateCartError } = updateCartStore;

  useEffect(() => {
    dispatch(getCartListItem());
  }, [dispatch, success, removeCartSuccess, removeCartMessage, updateCartSuccess]);

  // checkout handler
  const checkOutHandler = () => {
    history.push("/placeOrder");
  };

  // checkbox handler  all items from the cart
  const checkboxAllHandler = (e) => {
    const listItemCheckbox = document.getElementsByName("checkboxBuy");
    for (let i = 0; i < listItemCheckbox.length; i++) {
      if (listItemCheckbox[i].type === "checkbox" && !listItemCheckbox[i].disabled) {
        if (!listItemCheckbox[i].checked === e) listItemCheckbox[i].click();
      }
    }
  };

  // handler remove the product from the cart
  const removeFromCartHandler = (id) => {
    if (window.confirm("Are you sure remove cart item???")) {
      dispatch(removeFromCartItem([id]));
      if (removeCartSuccess) {
        toast.success("Remove cart item success", ToastObjects);
      } else if (removeCartError) {
        toast.error(removeCartError, ToastObjects);
      }
    }
  };

  //handler updates the product from the cart
  const updateFromCartHandler = (productId, qty, isBuy) => {
    dispatch(updateCart(productId, qty, isBuy));
    if (updateCartError) {
      toast.error(updateCartError, ToastObjects);
    }
  };

  return (
    <>
      <Toast />
      <Header />
      {/* Cart */}
      <div className="container">
        {cartItems?.length === 0 || !cartItems ? (
          <div className=" alert alert-info text-center mt-3">
            Giỏ hàng của bạn còn trống{" "}
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: "12px"
              }}
            >
              MUA NGAY
            </Link>
          </div>
        ) : (
          <>
            {/* PC */}

            <div className="cart-title row">
              <div className="cart-title-item col-lg-6">Sản phẩm</div>
              <div className="cart-title-item col-lg-2">Đơn giá</div>
              <div className="cart-title-item col-lg-1">Số lượng</div>
              <div className="cart-title-item col-lg-2">Thành tiền</div>
              <div className="cart-title-item col-lg-1">Thao tác</div>
            </div>
            {/* cartitem */}
            {cartItems?.map((item) => (
              <div className="cart-item" key={item.product._id}>
                {/* ------------ PC -------------- */}
                {/* checkbox */}
                <div className="cart-itemPC row">
                  <div className="cart-itemPC-checkbox col-lg-1">
                    <input
                      className="cart-itemPC-checkbox-input"
                      type="checkbox"
                      name="checkboxBuy"
                      id={item.product._id}
                      checked={item.isBuy}
                      hidden={item.product?.countInStock <= 0}
                      disabled={item.product?.countInStock <= 0}
                      onChange={(e) => updateFromCartHandler(item.product._id, item.qty, e.target.checked)}
                    />
                  </div>
                  {/* Image */}
                  <div className="cart-itemPC-image col-lg-2">
                    <Link to={`/product/${item.product._id}`}>
                      <img src={item.product.image} alt={item.product.name} />
                    </Link>
                  </div>
                  {/* Name */}
                  <div className="cart-itemPC-text col-lg-3 col-md-5">
                    <Link to={`/product/${item.product._id}`}>
                      <p>{item.product.name}</p>
                    </Link>
                  </div>
                  {/* Price */}
                  <div className="cart-itemPC-price col-lg-2">
                    <b>{formatCash(item.product.priceSale)}</b>
                  </div>
                  {/* Quantity */}
                  <div className="cart-itemPC-qty col-lg-1">
                    {item.product.countInStock > 0 ? (
                      <select
                        value={item.qty}
                        onChange={(e) => updateFromCartHandler(item.product._id, Number(e.target.value), item.isBuy)}
                      >
                        {[...Array(item.product.countInStock).keys()].map((x, index) => (
                          <option key={index} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="cart-item-qty-alert">Hết hàng</div>
                    )}
                  </div>
                  {/* Total a product */}
                  <div className="cart-itemPC-total col-lg-2">
                    <b>{formatCash(item.product.priceSale * item.qty)}</b>
                  </div>
                  {/* Remove product */}
                  <div className="col-lg-1 cart-itemPC-remove text-danger">
                    <i class="fas fa-trash-alt" onClick={() => removeFromCartHandler(item.product._id)}></i>
                  </div>
                </div>

                {/* -------------TABLET AND MOBILE --------------------- */}
                <div className="cart-itemMobile row">
                  <div className="row col-md-5 col-5">
                    {/* checkbox */}
                    <div className="cart-itemMobile-checkbox col-md-4 col-3">
                      <input
                        className="cart-itemMobile-checkbox-input"
                        type="checkbox"
                        name="checkboxBuy"
                        id={item.product._id}
                        checked={item.isBuy}
                        hidden={item.product?.countInStock <= 0}
                        disabled={item.product?.countInStock <= 0}
                        onChange={(e) => updateFromCartHandler(item.product._id, item.qty, e.target.checked)}
                      />
                    </div>
                    {/* Image */}
                    <div className="cart-itemMobile-image col-md-8 col-9">
                      <Link to={`/product/${item.product._id}`}>
                        <img src={item.product.image} alt={item.product.name} />
                      </Link>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="row col-md-7 col-7">
                    <div className="cart-itemMobile-text col-md-12 col-12">
                      <Link to={`/product/${item.product._id}`}>
                        <p>{item.product.name}</p>
                      </Link>
                    </div>
                    {/* Price */}
                    <div className="cart-itemMobile-price col-md-4 col-7">
                      <b>{formatCash(item.product.priceSale)}</b>
                    </div>
                    {/* Quantity */}
                    <div className="cart-itemMobile-qty col-md-4 col-5">
                      {item.product.countInStock > 0 ? (
                        <select
                          value={item.qty}
                          onChange={(e) => updateFromCartHandler(item.product._id, Number(e.target.value), item.isBuy)}
                        >
                          {[...Array(item.product.countInStock).keys()].map((x, index) => (
                            <option key={index} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="cart-item-qty-alert">Hết hàng</div>
                      )}
                    </div>
                    {/* Total a product */}
                    {/* <div className="cart-itemMobile-total col-lg-2 col-md-2 col-sm-7">
                      <b>${item.product.price * item.qty}</b>
                    </div> */}
                    {/* Remove product */}
                    <div className="col-md-12 col-12 mt-3 cart-itemMobile-remove text-danger">
                      <i class="fas fa-trash-alt" onClick={() => removeFromCartHandler(item.product._id)}></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* End of cart iterms */}
            <div className="total row ">
              <div className="total-checkbox col-lg-1 col-md-2 col-3">
                <input
                  className="total-checkbox-check"
                  type="checkbox"
                  onChange={(e) => checkboxAllHandler(e.target.checked)}
                />
                <span>Tất cả</span>
              </div>
              <div className="col-lg-9 col-md-7 col-6">
                <span className="total__text">
                  Tổng thanh toán
                  <span className="total__qty">({itemChecked?.length} sản phẩm)</span> :
                </span>
                <span className="total__price">{formatCash(totalHandler)}</span>
              </div>
              <div className="cart-buttons col-lg-2 col-md-3 col-3 justify-content-md-end">
                <button onClick={checkOutHandler} disabled={!itemChecked?.length > 0}>
                  <b>Thanh toán</b>
                </button>
              </div>
            </div>
            {/* <div className="cart-buttons d-flex align-items-center mt-3 mb-5 mt-md-0 row">
              <div className="col-lg-6 col-md-6 col-6 d-flex justify-content-md-end">
                <button onClick={checkOutHandler} disabled={!itemChecked?.length > 0}>
                  <b>Thanh toán</b>
                </button>
              </div>
            </div> */}
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
