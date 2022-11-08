import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartListItem, removeFromCartItem, updateCart } from "./../Redux/Actions/cartActions";
import { toast } from "react-toastify";
import Toast from "../components/base/LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000
};
const CartScreen = ({ history }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    return state.cartListItem.cartUser ?? state.cartListItem;
  });
  const { cartItems } = cart;

  // product total handler
  const totalHandler = cartItems?.reduce((pro, item) => pro + item.qty * item?.product.price, 0); /*.toFixed(2);*/

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
    history.push("/login?redirect=shipping");
  };

  // remove product from cart handler
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

  // update product from cart handler
  const updateFromCartHandler = (productId, qty) => {
    dispatch(updateCart(productId, qty));
    if (updateCartSuccess) {
      toast.success("Update cart item success", ToastObjects);
    } else if (updateCartError) {
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
            {/* <div className=" alert alert-info text-center mt-1">
              Total Cart Products
              <Link className="text-success mx-2" to="/cart">
                ({cartItems?.length})
              </Link>
            </div> */}

            {/* PC */}
            <div className="cart-title row">
              <div className="cart-title-item col-lg-1"></div>
              <div className="cart-title-item col-lg-2">Sản phẩm</div>
              <div className="cart-title-item col-lg-3">Tên sách</div>
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
                    <input className="cart-itemPC-checkbox-input" type="checkbox" id="" name="" />
                  </div>
                  {/* Image */}
                  <div className="cart-itemPC-image col-lg-2">
                    <img src={item.product.image} alt={item.product.name} />
                  </div>
                  {/* Name */}
                  <div className="cart-itemPC-text col-lg-3 col-md-5">
                    <Link to={`/products/${item.product._id}`}>
                      <p>{item.product.name}</p>
                    </Link>
                  </div>
                  {/* Price */}
                  <div className="cart-itemPC-price col-lg-2">
                    <b>{item.product.price}đ</b>
                  </div>
                  {/* Quantity */}
                  <div className="cart-itemPC-qty col-lg-1 mt-3">
                    <select
                      value={item.qty}
                      onChange={(e) => updateFromCartHandler(item.product._id, Number(e.target.value))}
                    >
                      {[...Array(item.product.countInStock).keys()].map((x, index) => (
                        <option key={index} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Total a product */}
                  <div className="cart-itemPC-total col-lg-2">
                    <b>{item.product.price * item.qty}đ</b>
                  </div>
                  {/* Remove product */}
                  <div
                    onClick={() => removeFromCartHandler(item.product._id)}
                    className="col-lg-1 cart-itemPC-remove text-danger"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </div>
                </div>

                {/* -------------TABLET AND MOBILE --------------------- */}
                <div className="cart-itemMobile row">
                  <div className="row col-md-5 col-5">
                    {/* checkbox */}
                    <div className="cart-itemMobile-checkbox col-md-4 col-3">
                      <input className="cart-itemMobile-checkbox-input" type="checkbox" id="" name="" />
                    </div>
                    {/* Image */}
                    <div className="cart-itemMobile-image col-md-8 col-9">
                      <img src={item.product.image} alt={item.product.name} />
                    </div>
                  </div>

                  {/* Name */}
                  <div className="row col-md-7 col-7">
                    <div className="cart-itemMobile-text col-md-12 col-12">
                      <Link to={`/products/${item.product._id}`}>
                        <p>{item.product.name}</p>
                      </Link>
                    </div>
                    {/* Price */}
                    <div className="cart-itemMobile-price col-md-4 col-7">
                      <b>{item.product.price}đ</b>
                    </div>
                    {/* Quantity */}
                    <div className="cart-itemMobile-qty col-md-4 col-5">
                      <select
                        value={item.qty}
                        onChange={(e) => updateFromCartHandler(item.product._id, Number(e.target.value))}
                      >
                        {[...Array(item.product.countInStock).keys()].map((x, index) => (
                          <option key={index} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Total a product */}
                    {/* <div className="cart-itemMobile-total col-lg-2 col-md-2 col-sm-7">
                      <b>${item.product.price * item.qty}</b>
                    </div> */}
                    {/* Remove product */}
                    <div
                      onClick={() => removeFromCartHandler(item.product._id)}
                      className="col-md-12 col-12 mt-3 cart-itemMobile-remove text-danger"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* End of cart iterms */}
            <div className="total">
              <span className="total__text">Tổng thanh toán ({cartItems?.length} sản phẩm): </span>
              <span className="total__price">{totalHandler}đ</span>
            </div>
            <hr />
            {totalHandler > 0 && (
              <div className="cart-buttons d-flex align-items-center row">
                <Link to="/" className="col-md-6 ">
                  <button>
                    <b>Chọn thêm sản phẩm</b>
                  </button>
                </Link>
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={checkOutHandler}>
                    <b>Thanh toán</b>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartScreen;
