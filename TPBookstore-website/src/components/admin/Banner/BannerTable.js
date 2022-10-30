import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../../base/LoadingError/Error";
import Loading from "../../base/LoadingError/Loading";
import { listBanner } from "../../../Redux/Actions/bannerActions";

const BannerTable = ({ setIsEditBanner, setCurrentBanner }) => {
  const dispatch = useDispatch();

  const bannerList = useSelector((state) => state.bannerList);
  const { error, loading, banners } = bannerList;

  useEffect(() => {
    dispatch(listBanner());
  }, [dispatch]);

  return (
    <>
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
        <tbody>
          {loading ? (
            <tr className="mb-5 mt-5">
              <Loading />
            </tr>
          ) : error ? (
            <tr>
              <Message variant="alert-danger">{error}</Message>
            </tr>
          ) : (
            banners?.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td className="fw-bold">{item.name}</td>
                <td className="fw-bold">
                  <img src={item.image} alt="Slider" />
                </td>
                <td className="fw-bold">{item.linkTo}</td>
                <td className="text-end">
                  <div className="dropdown">
                    <Link to="#" data-bs-toggle="dropdown">
                      <i className="fas fa-ellipsis-h"></i>
                    </Link>
                    <div className="dropdown-menu">
                      <button
                        className="text-warning dropdown-item"
                        onClick={() => {
                          setIsEditBanner(true);
                          setCurrentBanner(index);
                        }}
                      >
                        Sửa
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default BannerTable;
