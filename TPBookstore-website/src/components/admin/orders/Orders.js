import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteOrderAdmin, hiddenOrderAdmin } from "../../../Redux/Actions/orderActions";
import formatCash from "../../../utils/formatCash";
import Modal from "../../base/modal/Modal";

const Orders = (props) => {
  const dispatch = useDispatch();
  const { orders } = props;
  const [orderIdDelete, setOrderIdDelete] = useState("");
  const [orderIdHidden, setOrderIdHidden] = useState("");
  const handleDeleteOrder = () => {
    dispatch(deleteOrderAdmin(orderIdDelete));
  };

  const handleHiddenOrder = (id) => {
    dispatch(hiddenOrderAdmin(id));
  };

  return (
    <>
      <Modal
        modalTitle={"Xóa đơn hàng"}
        modalBody={"Bạn có chắc muốn xóa đơn hàng này?"}
        btnTitle={"Xóa"}
        btnType={"delete"}
        handler={handleDeleteOrder}
      />
      <table className="table">
        <thead>
          <tr className="text-center">
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
            orders.map((order) =>
              order.isDisabled ? (
                <tr className="status-disabled" key={order._id}>
                  <td>
                    <td>
                      <Link to={`/admin/order/${order._id}`}>{order._id}</Link>
                    </td>
                  </td>
                  <td>
                    <b>{order.user.name.length >= 15 ? `${order.user.name.slice(0, 15)}...` : `${order.user.name}`}</b>
                  </td>
                  <td>{formatCash(order.totalPrice)}</td>
                  <td>
                    {order.isPaid ? (
                      <span className="badge3 rounded-pill alert-success fw-bold">
                        Thanh toán lúc {moment(order.paidAt).format("DD/MM/yyyy")}
                      </span>
                    ) : (
                      <span className="badge3 rounded-pill alert-danger fw-bold">Chưa thanh toán</span>
                    )}
                  </td>
                  <td>{moment(order.createdAt).format("DD/MM/yyyy")}</td>
                  <td>
                    {order.cancelled ? (
                      <span className="badge3 btn-danger">Đã hủy</span>
                    ) : order.delivered ? (
                      <span className="badge3 btn-success">Đã giao</span>
                    ) : order.confirmed ? (
                      <span className="badge3 btn-warning">Đang giao</span>
                    ) : (
                      <span className="badge3 btn-primary">Đang chờ xác nhận</span>
                    )}
                  </td>
                  <td className="d-flex justify-content-end align-item-center">
                    <Link title="Đang bị ẩn" target="_blank">
                      <i class="fas fa-eye-slash"></i>
                    </Link>
                    <Link data-toggle="modal" data-target="#exampleModalCenter">
                      <i class="text-danger fas fa-trash-alt ms-3" onClick={() => setOrderIdDelete(order._id)}></i>
                    </Link>
                    {/* <Link to={`/admin/order/${order._id}`}>
                      <i class="fas fa-ellipsis-h ms-3"></i>
                    </Link> */}
                  </td>
                </tr>
              ) : (
                <tr className="" key={order._id}>
                  <td>
                    <td>
                      <Link to={`/admin/order/${order._id}`}>{order._id}</Link>
                    </td>
                  </td>
                  <td>
                    <b>{order.user.name.length >= 15 ? `${order.user.name.slice(0, 15)}...` : `${order.user.name}`}</b>
                  </td>
                  <td>{formatCash(order.totalPrice)}</td>
                  <td>
                    {order.isPaid ? (
                      <span className="badge3 rounded-pill alert-success fw-bold">
                        Thanh toán lúc {moment(order.paidAt).format("DD/MM/yyyy")}
                      </span>
                    ) : (
                      <span className="badge3 rounded-pill alert-danger fw-bold">Chưa thanh toán</span>
                    )}
                  </td>
                  <td>{moment(order.createdAt).format("DD/MM/yyyy")}</td>
                  <td>
                    {order.cancelled ? (
                      <span className="badge3 btn-danger">Đã hủy</span>
                    ) : order.delivered ? (
                      <span className="badge3 btn-success">Đã giao</span>
                    ) : order.confirmed ? (
                      <span className="badge3 btn-warning">Đang giao</span>
                    ) : (
                      <span className="badge3 btn-primary">Đang chờ xác nhận</span>
                    )}
                  </td>
                  <td className="d-flex justify-content-end align-item-center">
                    <Link className="text-success">
                      <i className="fas fa-eye" onClick={() => handleHiddenOrder(order._id)}></i>
                    </Link>
                    <Link data-toggle="modal" data-target="#exampleModalCenter" title="Xoá" target="_blank">
                      <i class="text-danger fas fa-trash-alt ms-3" onClick={() => setOrderIdDelete(order._id)}></i>
                    </Link>
                    {/* <Link to={`/admin/order/${order._id}`}>
                      <i class="fas fa-ellipsis-h ms-3"></i>
                    </Link> */}
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </>
  );
};

export default Orders;
