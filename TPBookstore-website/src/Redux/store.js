import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { addToCartReducer, cartListItemReducers, cartRemoveReducer, cartUpdateReducer } from "./Reducers/cartReducers";
//admin
import {
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateAvatarReducer,
  userUpdateProfileReducer,
  userGetAddressDataReducer,
  userUpdatePasswordReducer,
  userForgotPasswordReducer
} from "./Reducers/userReducers";
import {
  productListReducer,
  //client
  productDetailsReducer,
  //admin
  productUpdateReducer,
  productCreateReviewReducer,
  productListReducerAdmin,
  productCreateReducerAdmin,
  productEditReducerAdmin,
  productDeleteReducerAdmin,
  productListReducerAdminAll,
  productListReducerBestSeller,
  productListReducerBestNumView,
  productCommentReducer,
  productCreateCommentReducer,
  productCreateCommentReplyReducer,
  productDeleteCommentReducer,
  productUpdateCommentReducer,
  productListCommentReducerAdmin
} from "./Reducers/productReducers";
import {
  orderCreateReducer,
  orderDeleteReducerAdmin,
  orderDeliveredReducer,
  orderConfirmReducer,
  orderCancelAdminReducer,
  orderCancelUserReducer,
  orderDetailsReducer,
  orderIsPaidReducer,
  orderListMyReducer,
  orderListReducerAdmin,
  orderPayReducer
} from "./Reducers/orderReducres";
import {
  categoryCreateReducerAdmin,
  categoryDeleteReducerAdmin,
  // categoryEditReducerAdmin,
  categoryListReducer,
  categoryListReducerAdmin,
  categoryUpdateReducerAdmin
} from "./Reducers/categoryReducers";
import {
  bannerListReducer,
  sliderListReducer,
  bannerCreateReducerAdmin,
  bannerDeleteReducerAdmin,
  bannerUpdateReducerAdmin
} from "./Reducers/bannerReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productListBestSeller: productListReducerBestSeller,
  productListBestNumView: productListReducerBestNumView,
  productDetails: productDetailsReducer,
  productReviewCreate: productCreateReviewReducer,
  productComment: productCommentReducer,
  productCreateComment: productCreateCommentReducer,
  productCreateCommentReply: productCreateCommentReplyReducer,
  productDeleteComment: productDeleteCommentReducer,
  productUpdateComment: productUpdateCommentReducer,
  cartListItem: cartListItemReducers,
  addToCart: addToCartReducer,
  removeCart: cartRemoveReducer,
  cartUpdate: cartUpdateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdatePassword: userUpdatePasswordReducer,
  userForgotPassword: userForgotPasswordReducer,
  userUpdateAvatar: userUpdateAvatarReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderCancelUser: orderCancelUserReducer,
  listMyOrders: orderListMyReducer,
  categoryList: categoryListReducer,
  addressData: userGetAddressDataReducer,

  //admin
  userList: userListReducer,
  productListAdmin: productListReducerAdmin,
  productListAdminAll: productListReducerAdminAll,
  productDeleteAdmin: productDeleteReducerAdmin,
  productCreateAdmin: productCreateReducerAdmin,
  productEditAdmin: productEditReducerAdmin,
  productUpdate: productUpdateReducer,
  productListCommentAdmin: productListCommentReducerAdmin,
  categoryListAdmin: categoryListReducerAdmin,
  categoryCreateAdmin: categoryCreateReducerAdmin,
  categoryDeleteAdmin: categoryDeleteReducerAdmin,
  categoryUpdateAdmin: categoryUpdateReducerAdmin,
  orderListAdmin: orderListReducerAdmin,
  orderDeliver: orderDeliveredReducer,
  orderConfirm: orderConfirmReducer,
  orderCancelAdmin: orderCancelAdminReducer,
  orderDeleteAdmin: orderDeleteReducerAdmin,
  orderIsPaidAdmin: orderIsPaidReducer,
  bannerList: bannerListReducer,
  sliderList: sliderListReducer,
  bannerCreate: bannerCreateReducerAdmin,
  bannerDelete: bannerDeleteReducerAdmin,
  bannerUpdate: bannerUpdateReducerAdmin
});

//get cart from localstorage
// const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];

//login
const userInfoFromLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

// shipping address
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

// payment method
const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};
// cart: {
//   cartItems: cartItemsFromLocalStorage,
// },
const initialState = {
  shippingAddress: shippingAddressFromLocalStorage,
  paymentMethod: paymentMethodFromLocalStorage,
  userLogin: { userInfo: userInfoFromLocalStorage }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
export default store;
