import React from "react";
import { Link } from "react-router-dom";

const ManageShipperMain = () => {
  return (
    <>
      <section className="content-main">
        <div className="">
          <h3 className="fw-bold my-3 text-center">ĐƠN HÀNG</h3>
        </div>
        <div className="card">
          <table className="table">
            <thead className="pc-header">
              <tr className="text-center">
                <th>Mã hoá đơn</th>
                <th>Khách hàng</th>
                <th>Người nhận</th>
                <th>Địa chỉ giao hàng</th>
                <th>Điện thoại</th>
                <th>Ngày giao</th>
                <th>Tổng hoá đơn</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Link to="">6393f9f712ef5ccaac77f536</Link>
                </td>
                <td className="fw-bold">Viết Phú</td>
                <td className="fw-bold">Khắc Tuấn</td>
                <td>Sơn Trung, Đắk Gằn, Đắk Mil, Đắk Nông</td>
                <td>0984673456</td>
                <td>22/12/2022</td>
                <td>1.000.000đ</td>
                <td>
                  <span className="badge3 rounded-pill btn-warning fw-bold">Đang giao hàng</span>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="">6393f9f712ef5ccaac77f536</Link>
                </td>
                <td className="fw-bold">Khắc Tuấn</td>
                <td className="fw-bold">Viết Phú</td>
                <td>Sơn Trung, Đắk Gằn, Đắk Mil, Đắk Nông</td>
                <td>0984673456</td>
                <td>22/12/2022</td>
                <td>1.000.000đ</td>
                <td>
                  <span className="badge3 rounded-pill btn-success">Giao hàng thành công</span>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="">6393f9f712ef5ccaac77f536</Link>
                </td>
                <td className="fw-bold">Khắc Tuấn</td>
                <td className="fw-bold">Viết Phú</td>
                <td>Sơn Trung, Đắk Gằn, Đắk Mil, Đắk Nông</td>
                <td>0984673456</td>
                <td>22/12/2022</td>
                <td>1.000.000đ</td>
                <td>
                  <span className="badge3 rounded-pill btn-danger fw-bold">Đã huỷ</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ManageShipperMain;
