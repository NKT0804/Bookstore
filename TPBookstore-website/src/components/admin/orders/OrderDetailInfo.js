import React from "react";
import formatCash from "../../../utils/formatCash";

const OrderDetailInfo = (props) => {
  const { order } = props;
  return (
    <div className="row mb-5 order-info-wrap">
      <div className="col-md-6 col-lg-2 col-md-6 col-6">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-user"></i>
          </span>
          <div className="text">
            <h6 className="fw-bold mb-1">Khách hàng</h6>
            <p className="mb-1">
              {order.user.name} <br />
              {order.user.phone} <br />
            </p>
          </div>
        </article>
      </div>

      <div className="col-md-6 col-lg-4 col-md-6 col-6">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-map-marker-alt"></i>
          </span>
          <div className="text">
            <h6 className="fw-bold mb-1">Thông tin người nhận</h6>
            <p className="">
              {order.receiver} &nbsp;| &nbsp;{order.phone}
            </p>
            <p className=""></p>
            <p className="">{order.shippingAddress}</p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-3 col-md-6 col-6">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-truck-moving"></i>
          </span>
          <div className="text">
            <h6 className="fw-bold mb-1">Trạng thái đơn hàng</h6>
            <div className="mt-1">
              {order.cancelled ? (
                <span className="badge3 btn-danger">Đã hủy</span>
              ) : order.delivered ? (
                <span className="badge3 btn-success">Đã giao</span>
              ) : order.confirmed ? (
                <span className="badge3 btn-warning">Đang giao</span>
              ) : (
                <span className="badge3 btn-primary">Đang chờ xác nhận</span>
              )}
            </div>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-3 col-md-6 col-6">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i class="text-success fas fa-user-check"></i>
          </span>
          <div className="text">
            <h6 className="fw-bold mb-1">Nhân viên giao hàng</h6>
            <p>Viết Phú </p>
            <p>0847474747 </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default OrderDetailInfo;
