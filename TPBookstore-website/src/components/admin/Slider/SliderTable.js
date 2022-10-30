import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../../base/LoadingError/Error";
import Loading from "../../base/LoadingError/Loading";
import { deleteBannerAdmin, listSlider } from "../../../Redux/Actions/bannerActions";

const SliderTable = ({ setIsEditSlider, setCurrentSlider }) => {
  const dispatch = useDispatch();

  const sliderList = useSelector((state) => state.sliderList);
  const { error, loading, sliders } = sliderList;

  const sliderDeleteHandler = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa slider này?")) {
      dispatch(deleteBannerAdmin(id));
    }
  };

  useEffect(() => {
    dispatch(listSlider());
  }, [dispatch]);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên Slider</th>
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
            sliders?.map((item, index) => (
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
                          setIsEditSlider(true);
                          setCurrentSlider(index);
                        }}
                      >
                        Sửa
                      </button>
                      <button className="text-danger dropdown-item" onClick={() => sliderDeleteHandler(item._id)}>
                        Xóa
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

export default SliderTable;
