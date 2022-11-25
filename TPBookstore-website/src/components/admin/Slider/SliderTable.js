import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../../base/LoadingError/Error";
import Loading from "../../base/LoadingError/Loading";
import { deleteBannerAdmin, listSlider } from "../../../Redux/Actions/bannerActions";
import Modal from "../../base/modal/Modal";

const SliderTable = ({ setIsEditSlider, setCurrentSlider }) => {
  const dispatch = useDispatch();

  const sliderList = useSelector((state) => state.sliderList);
  const { error, loading, sliders } = sliderList;

  const sliderDelete = useSelector((state) => state.bannerDelete);
  const { success } = sliderDelete;
  const [sliderIdDelete, setSliderIdDelete] = useState("");

  const sliderDeleteHandler = () => {
    dispatch(deleteBannerAdmin(sliderIdDelete));
  };
  useEffect(() => {
    if (success) {
      dispatch(listSlider());
    }
  }, [dispatch, listSlider()]);

  useEffect(() => {
    dispatch(listSlider());
  }, [dispatch]);

  return (
    <>
      <Modal
        modalTitle={"Xóa slider"}
        modalBody={"Bạn có chắc muốn xóa slider này?"}
        btnTitle={"Xóa"}
        btnType={"delete"}
        handler={sliderDeleteHandler}
      />
      <table className="admin__sliders-banner-table">
        <thead>
          <tr>
            <th className="admin__sliders-banner-table-id">STT</th>
            <th className="admin__sliders-banner-table-name">Tên Slider</th>
            <th className="admin__sliders-banner-table-img">Hình ảnh</th>
            <th className="admin__sliders-banner-table-link">Liên kết đến</th>
            <th className="admin__sliders-banner-table-action text-end">Thao tác</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody className="admin__sliders-banner-table-content">
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
                  <div className="dropdown action__slider">
                    <Link to="#" data-bs-toggle="dropdown">
                      <i
                        className="text-warning fas fa-edit"
                        onClick={() => {
                          setIsEditSlider(true);
                          setCurrentSlider(index);
                        }}
                      ></i>
                    </Link>
                    <Link data-toggle="modal" data-target="#exampleModalCenter">
                      <i class="text-danger fas fa-trash-alt" onClick={() => setSliderIdDelete(item._id)}></i>
                    </Link>
                    <div className="dropdown-menu"></div>
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
