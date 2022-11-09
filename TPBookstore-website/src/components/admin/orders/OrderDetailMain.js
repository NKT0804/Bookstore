import React, { useEffect } from "react";
import OrderDetailProducts from "./OrderDetailProducts";
import OrderDetailInfo from "./OrderDetailInfo";
import { Link } from "react-router-dom";
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
    if (window.confirm("Bạn có chắc chắn không?")) {
      dispatch(deliverOrder(order));
    }
  };
  const confirmHandler = () => {
    if (window.confirm("Bạn có chắc chắn không?")) {
      dispatch(confirmOrder(order));
    }
  };
  const isPaidHandler = () => {
    if (window.confirm("Bạn có chắc chắn không?")) {
      dispatch(isPaidOrder(order));
    }
  };
  const cancelHandler = () => {
    if (window.confirm("Bạn có chắc chắn không?")) {
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
                <b className="text-white mx-3 ">Mã đơn hàng:</b>
                <span className="text-white mx-3 ">{order._id}</span>
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
              <div className="col-lg-9">
                <div className="table-responsive">
                  <OrderDetailProducts order={order} loading={loading} />
                </div>
              </div>
              {/* Payment Info */}
              <div className="col-lg-3">
                <div className="box shadow-sm bg-light">
                  {order?.delivered ? (
                    <button className="btn btn-success col-12">
                      Đã giao hàng ( {moment(order.isDeliveredAt).format("MMM Do YY")})
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
                      Đã thanh toán ( {moment(order.isPaidAt).format("LT") + " " + moment(order.isPaidAt).format("L")})
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
                    <button className="btn-danger">Đơn hàng đã hủy</button>
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
