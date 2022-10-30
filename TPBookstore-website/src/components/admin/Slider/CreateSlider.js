import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../../base/LoadingError/Loading";
import { BANNER_CREATE_RESET } from "../../../Redux/Constants/bannerConstants";
import { createBannerAdmin } from "../../../Redux/Actions/bannerActions";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000
};
const CreateSlider = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [linkTo, setLinkTo] = useState("");

  const dispatch = useDispatch();

  const bannerCreate = useSelector((state) => state.bannerCreate);
  const { loading, error, success } = bannerCreate;

  useEffect(() => {
    if (success) {
      toast.success("Thêm slider thành công", ToastObjects);
      dispatch({ type: BANNER_CREATE_RESET });
      setName("");
      setImage("");
      setLinkTo("");
    }
    if (error) {
      toast.error(error, ToastObjects);
      dispatch({ type: BANNER_CREATE_RESET });
    }
  }, [success, dispatch, loading, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createBannerAdmin({ name, index: 1, image, linkTo, role: "slider" }));
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        {loading && <Loading />}
        <div className="d-flex justify-content-between">
          <div className="mb-4 w-50">
            <label htmlFor="slider_name" className="form-label">
              Tên Slider
            </label>
            <input
              type="text"
              placeholder="Nhập tên slider"
              className="form-control"
              id="slider_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4 w-50">
            <label htmlFor="slider_image" className="form-label">
              Hình ảnh
            </label>
            <input
              type="url"
              placeholder="Nhập url hình ảnh"
              className="form-control"
              id="slider_image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="mb-4 w-50">
            <label htmlFor="slider_linkTo" className="form-label">
              Liên kết đến
            </label>
            <input
              type="url"
              placeholder="Nhập liên kết"
              className="form-control"
              id="slider_linkTo"
              value={linkTo}
              onChange={(e) => setLinkTo(e.target.value)}
            />
          </div>
        </div>
        <div className="d-grid w-25">
          <button className="btn btn-size btn-primary p-2">Thêm slider</button>
        </div>
      </form>
    </>
  );
};

export default CreateSlider;
