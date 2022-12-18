import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listOrdersByShipper } from "../../../Redux/Actions/orderActions";
import formatCash from "../../../utils/formatCash";
import moment from "moment";

const ManageShipperMain = () => {
  const dispatch = useDispatch();
  const orderListOfShipper = useSelector((state) => state.orderListOfShipper);
  const { loading, error, orders, page, pages, total } = orderListOfShipper;
  useEffect(() => {
    dispatch(listOrdersByShipper());
  }, [dispatch]);
  return (
    <>
      <section className="content-main">
        <div className="">
          <h3 className="fw-bold my-3 text-center">ĐƠN HÀNG ĐƯỢC GIAO CHO BẠN</h3>
        </div>
        <div className="card">
          <table className="table">
            <thead className="pc-header">
              <tr className="text-center">
                <th>Mã hoá đơn</th>
                <th>Người nhận</th>
                <th>Điện thoại</th>
                <th>Địa chỉ giao hàng</th>
                <th>Ngày giao</th>
                <th>Tổng hoá đơn</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {!orders?.length > 0 ? (
                <div>Không có đơn hàng nào được giao cho bạn</div>
              ) : (
                orders?.map((order, index) => (
                  <>
                    <tr>
                      <td>
                        <Link to="">{order._id}</Link>
                      </td>
                      <td className="fw-bold">{order.receiver}</td>
                      <td>{order.phone}</td>
                      <td>{order.shippingAddress}</td>
                      <td>{order.delivered ? <>{moment(order.deliveredAt).format("DD/MM/yyyy")}</> : "--/--/----"}</td>
                      <td>{formatCash(order.totalPrice)}</td>
                      <td>
                        {order.cancelled ? (
                          <span className="badge3 btn-danger">Đã hủy</span>
                        ) : order.delivered ? (
                          <span className="badge3 btn-success">Đã giao</span>
                        ) : (
                          <span className="badge3 btn-warning">Chưa giao</span>
                        )}
                      </td>
                    </tr>
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ManageShipperMain;
