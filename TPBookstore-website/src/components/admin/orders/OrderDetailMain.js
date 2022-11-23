import React, { useEffect } from "react";
import OrderDetailProducts from "./OrderDetailProducts";
import OrderDetailInfo from "./OrderDetailInfo";
import { Link } from "react-router-dom";
import formatCash from "../../../utils/formatCash";
import { useDispatch, useSelector } from "react-redux";
import {
  deliverOrder,
  getOrderDetails,
  isPaidOrder,
  confirmOrder,
  cancelOrderAdmin
} from "./../../../Redux/Actions/orderActions";
import Loading from "./../../base/LoadingError/Loading";
import Message from "./../../base/LoadingError/Error";
import moment from "moment";

const OrderDetailmain = (props) => {
  const { orderId } = props;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce((accumulate, item) => accumulate + item.price * item.qty, 0);
  }

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDelivered, success: successDelivered } = orderDeliver;

  const orderConfirm = useSelector((state) => state.orderConfirm);
  const { loading: loadingConfirm, success: successConfirm } = orderConfirm;

  const orderIsPaid = useSelector((state) => state.orderIsPaidAdmin);
  const { loading: loadingIsPaid, success: successIsPaid } = orderIsPaid;

  const orderCancelAdmin = useSelector((state) => state.orderCancelAdmin);
  const { loading: loadingCancel, success: successCancel } = orderCancelAdmin;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, successDelivered, successIsPaid, successConfirm, successCancel]);

  const deliverHandler = () => {
    if (window.confirm("Xác nhận đã giao hàng?")) {
      dispatch(deliverOrder(order));
    }
  };
  const confirmHandler = () => {
    if (window.confirm("Xác nhận đơn hàng?")) {
      dispatch(confirmOrder(order));
    }
  };
  const isPaidHandler = () => {
    if (window.confirm("Xác nhận đã thanh toán?")) {
      dispatch(isPaidOrder(order));
    }
  };
  const cancelHandler = () => {
    if (window.confirm("Xác nhận hủy đơn hàng?")) {
      dispatch(cancelOrderAdmin(order));
    }
  };
  return (
    <section className="content-main">
      <div className="content-header">
        <Link to="/admin/orders" className="btn btn-dark text-white btn-size">
          Back To Orders
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="card">
          <header className="card-header p-3 Header-green">
            <div className="row align-items-center ">
              <div className="col-lg-6 col-md-6">
                <i class="far fa-barcode-alt"></i>
                <b className="text-white mx-1">Mã đơn hàng:</b>
                <span className="text-white mx-1">{order._id}</span>
                <br />
                <span>
                  <i className="far fa-calendar-alt"></i>
                  <b className="text-white"> Ngày đặt:</b>
                  <span className="text-white mx-3 ">
                    {moment(order.createdAt).format("LT") + " " + moment(order.createdAt).format("L")}
                  </span>
                </span>
              </div>
              <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                <Link className="btn btn-success ms-2" to="#">
                  <i className="fas fa-print"></i>
                </Link>
              </div>
            </div>
          </header>
          <div className="card-body">
            {/* Order info */}
            <OrderDetailInfo order={order} />

            <div className="row">
              <div className="col-lg-9 col-md-12">
                <div className="table-responsive">
                  <OrderDetailProducts order={order} loading={loading} />
                </div>
              </div>
              {/* Payment Info */}
              <div className="col-lg-3 px-0">
                <div className="">
                  <table className="table__order-details">
                    <tr>
                      <td colSpan="4">
                        <article className="float-end">
                          <dl className="dlist">
                            <dt className="text-start">Tổng tiền sản phẩm:</dt>{" "}
                            <dd className="mx-0 text-end">{formatCash(order.itemsPrice)}</dd>
                          </dl>
                          <dl className="dlist">
                            <dt className="text-start">Phí vận chuyển: </dt>{" "}
                            <dd className="mx-0 text-end">{formatCash(order.shippingPrice)}</dd>
                          </dl>
                          <dl className="dlist">
                            <dt className="text-start">Thuế VAT(5%):</dt>{" "}
                            <dd className="mx-0 text-end">{formatCash(order.taxPrice)}</dd>
                          </dl>
                          <dl className="dlist">
                            <dt className="text-start">Tổng cộng:</dt>
                            <dd className="mx-0 text-end">
                              <b>{formatCash(order.totalPrice)}</b>
                            </dd>
                          </dl>
                          <dl className="dlist">
                            <dt className="text-start fw-bold">Trạng thái thanh toán :</dt>
                            <dd className="mx-0 text-end">
                              {order.isPaid ? (
                                <span className="badge3 rounded-pill alert alert-success text-success fw-bold">
                                  Thanh toán thành công
                                </span>
                              ) : (
                                <span className="badge3 rounded-pill alert alert-danger text-danger fw-bold">
                                  Chưa thanh toán
                                </span>
                              )}
                            </dd>
                          </dl>
                        </article>
                      </td>
                    </tr>
                  </table>
                </div>
                <div className=" box shadow-sm bg-light">
                  {order?.delivered ? (
                    <button className="btn btn-success col-12">
                      Đã giao hàng ({" "}
                      {moment(order.isDeliveredAt).format("LT") + " " + moment(order.isDeliveredAt).format("L")})
                    </button>
                  ) : !order?.confirmed ? (
                    <>
                      {loadingConfirm && <Loading />}
                      <button onClick={() => confirmHandler()} className="btn btn-primary col-12 btn-size">
                        Xác nhận đơn hàng
                      </button>
                    </>
                  ) : (
                    <>
                      {loadingDelivered && <Loading />}
                      <button onClick={() => deliverHandler()} className="btn btn-primary col-12 btn-size">
                        Xác nhận đã giao hàng
                      </button>
                    </>
                  )}
                  {order.isPaid ? (
                    <button className="btn btn-success col-12 mt-2">
                      <p>Đã thanh toán</p>
                      <p>( {moment(order.isPaidAt).format("LT") + moment(order.isPaidAt).format("L")})</p>
                    </button>
                  ) : (
                    <>
                      {loadingIsPaid && <Loading />}
                      <button onClick={isPaidHandler} className="btn btn-warning col-12 btn-size mt-2">
                        Xác nhận đã thanh toán
                      </button>
                    </>
                  )}
                  {!order.cancelled ? (
                    <>
                      {loadingCancel && <Loading />}
                      <button onClick={cancelHandler} className="btn btn-danger col-12 btn-size mt-2">
                        Hủy đơn hàng
                      </button>
                    </>
                  ) : (
                    <button className="btn btn-danger col-12 btn-size mt-2">Đơn hàng đã hủy</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderDetailmain;
