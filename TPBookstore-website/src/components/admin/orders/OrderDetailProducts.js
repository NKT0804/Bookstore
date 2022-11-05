import React from "react";
import { Link } from "react-router-dom";

const OrderDetailProducts = (props) => {
  const { order, loading } = props;

  const formatPrice = (price) => {
    return (price / 1000).toFixed(3) + " ₫";
  };

  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Sản phẩm</th>
          <th style={{ width: "20%" }}>Số lượng</th>
          <th style={{ width: "20%" }}>Đơn giá</th>
          <th style={{ width: "20%" }} className="text-end">
            Thành tiền
          </th>
        </tr>
      </thead>
      <tbody>
        {order?.orderItems.map((item, index) => (
          <tr key={index}>
            <td>
              <Link className="itemside" to="#">
                <div className="left">
                  <img src={item.image} alt={item.name} style={{ width: "100px", height: "auto" }} className="img-xs" />
                </div>
                <div className="info">{item.name}</div>
              </Link>
            </td>
            <td>{item.qty} </td>
            <td>{formatPrice(item.price)} </td>
            <td className="text-end"> {formatPrice(item.qty * item.price)}</td>
          </tr>
        ))}

        <tr>
          <td colSpan="4">
            <article className="float-end">
              <dl className="dlist">
                <dt>Tổng tiền sản phẩm:</dt> <dd>{formatPrice(order.itemsPrice)}</dd>
              </dl>
              <dl className="dlist">
                <dt>Phí vận chuyển: </dt> <dd>{formatPrice(order.shippingPrice)}</dd>
              </dl>
              <dl className="dlist">
                <dt>Thuế VAT(5%):</dt> <dd>{formatPrice(order.taxPrice)}</dd>
              </dl>
              <dl className="dlist">
                <dt>Tổng cộng:</dt>
                <dd>
                  <b className="h5">{formatPrice(order.totalPrice)}</b>
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted fw-bold fs-4">Trạng thái thanh toán:</dt>
                <dd>
                  {order.isPaid ? (
                    <span className="badge3 rounded-pill alert alert-success text-success fw-bold fs-4">
                      Thanh toán thành công
                    </span>
                  ) : (
                    <span className="badge3 rounded-pill alert alert-danger text-danger fw-bold fs-4">
                      Chưa thanh toán
                    </span>
                  )}
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
