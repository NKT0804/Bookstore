import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteOrderAdmin } from "../../../Redux/Actions/orderActions";
import formatCash from "../../../utils/formatCash";

const Orders = (props) => {
  const dispatch = useDispatch();
  const { orders } = props;

  const handleDeleteOrder = (id) => {
    if (window.confirm("Are you sure delete order???")) {
      dispatch(deleteOrderAdmin(id));
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Mã đơn hàng</th>
          <th scope="col">Tên khách hàng</th>
          <th scope="col">Tổng cộng</th>
          <th scope="col">Trạng thái thanh toán</th>
          <th scope="col">Ngày đặt</th>
          <th scope="col">Trạng thái</th>
          <th scope="col" className="text-end">
            Thao tác
          </th>
        </tr>
      </thead>
      <tbody>
        {orders &&
          orders.map((order) => (
            <tr key={order._id}>
              <td>
                <td>
                  <Link to={`/admin/order/${order._id}`}>{order._id}</Link>
                </td>
              </td>
              <td>
                <b>{order.user.name.lenght >= 15 ? `${order.user.name.slice(0, 15)}...` : `${order.user.name}`}</b>
              </td>
              <td>{formatCash(order.totalPrice)}</td>
              <td>
                {order.isPaid ? (
                  <span className="badge3 rounded-pill alert-success fw-bold">
                    Thanh toán lúc {moment(order.paidAt).format("L")}
                  </span>
                ) : (
                  <span className="badge3 rounded-pill alert-danger fw-bold">Chưa thanh toán</span>
                )}
              </td>
              <td>{moment(order.createdAt).format("L")}</td>
              <td>
                {order.isDelivered ? (
                  <span className="badge3 btn-success">Đang giao</span>
                ) : (
                  <span className="badge3 btn-dark">Đang xử lý</span>
                )}
              </td>
              <td className="d-flex justify-content-end align-item-center">
                <Link to={`/admin/order/${order._id}`} className="text-success">
                  <i className="fas fa-eye"></i>
                </Link>
                <Link to="#" className="text-danger ms-3" onClick={() => handleDeleteOrder(order._id)}>
                  <i class="text-danger fas fa-trash-alt"></i>
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Orders;
