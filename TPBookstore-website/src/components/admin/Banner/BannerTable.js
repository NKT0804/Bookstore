import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../../base/LoadingError/Error";
import Loading from "../../base/LoadingError/Loading";
import Toast from "../../base/LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000
};
const BannerTable = () => {
  const dispatch = useDispatch();

  const bannerDeleteHandeler = (id) => {
    if (window.confirm("Are you sure delete category???")) {
    }
  };

  return (
    <>
      <Toast />
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên Banner</th>
            <th>Hình ảnh</th>
            <th>Liên kết đến</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody></tbody>
      </table>
    </>
  );
};

export default BannerTable;
