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
            <h7 className="fw-bold mb-1">Khách hàng</h7>
            <p className="mb-1">
              Tên:&nbsp;{order.user.name} <br />
              SĐT:&nbsp; {order.user.phone} <br />
              {/* {order.user.email} <br /> */}
            </p>
          </div>
        </article>
      </div>

      <div className="col-md-6 col-lg-5 col-md-6 col-6">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-map-marker-alt"></i>
          </span>
          <div className="text">
            <h7 className="fw-bold mb-1">Thông tin người nhận</h7>
            <p className="">Tên:&nbsp;{order.receiver}</p>
            <p className="">SĐT: &nbsp;{order.phone}</p>
            <p className="">{order.shippingAddress}</p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-3 col-md-6 col-6">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-map-marker-alt"></i>
          </span>
          <div className="text">
            <h7 className="fw-bold mb-1">Trạng thái thanh toán</h7>
            <br></br>
            {order.isPaid ? (
              <div className="status__order-admin border-success text-success">Thanh toán thành công</div>
            ) : (
              <div className="status__order-admin border-danger text-danger">Chưa thanh toán</div>
            )}
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-2 col-md-6 col-6">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-truck-moving"></i>
          </span>
          <div className="text">
            <h7 className="fw-bold mb-1">Nhân viên giao hàng</h7>
            <p>Tên: &nbsp; Viết Phú </p>
            <p>SĐT: &nbsp; 0847474747 </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default OrderDetailInfo;
