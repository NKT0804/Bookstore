import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../base/LoadingError/Loading";
import { updateBannerAdmin, listBanner } from "../../../Redux/Actions/bannerActions";
// import Modal from "../../base/modal/Modal";

const UpdateBanner = ({ isEditBanner, currentBanner, setIsEditBanner, setCurrentBanner }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [linkTo, setLinkTo] = useState("");

  const bannerList = useSelector((state) => state.bannerList);
  const { banners } = bannerList;

  const bannerUpdate = useSelector((state) => state.bannerUpdate);
  const { loading, success } = bannerUpdate;

  const updateBannerHandler = useCallback(() => {
    if (currentBanner || currentBanner === 0) {
      setName(banners[currentBanner]?.name);
      setImage(banners[currentBanner]?.image);
      setLinkTo(banners[currentBanner]?.linkTo);
    }
  }, [banners, currentBanner]);
  useEffect(() => {
    if (success) {
      setCurrentBanner("");
      setName("");
      setImage("");
      setLinkTo("");
      setIsEditBanner(false);
      dispatch(listBanner());
    }
  }, [dispatch, setIsEditBanner, success]);
  useEffect(() => {
    updateBannerHandler();
  }, [updateBannerHandler]);
  const cancelHandler = () => {
    setName("");
    setImage("");
    setLinkTo("");
    setIsEditBanner(false);
  };
  const submitHandler = () => {
    dispatch(
      updateBannerAdmin({
        _id: banners[currentBanner]?._id,
        name,
        image,
        linkTo
      })
    );
  };

  // const [modalTitle, setModalTitle] = useState("");
  // const [modalBody, setModalBody] = useState("");
  // const [btnTitle, setBtnTitle] = useState("");
  // const [btnType, setBtnType] = useState("");
  // const [typeAction, setTypeAction] = useState(() => {});

  // const typeModal = (type) => {
  //   if (type === "updateBanner") {
  //     setModalTitle("Cập nhật Banner");
  //     setModalBody("Bạn có chắc muốn cập nhật Banner này?");
  //     setBtnTitle("Lưu thay đổi");
  //     setBtnType("confirm");
  //     setTypeAction(type);
  //   }
  // };
  return (
    <>
      {/* <Modal
        modalTitle={modalTitle}
        modalBody={modalBody}
        btnTitle={btnTitle}
        btnType={btnType}
        handler={typeAction === "updateBanner" ? submitHandler : <></>}
      ></Modal> */}
      <div className="">
        <div>
          {loading && <Loading />}
          <div className="admin__sliders-banner-update">
            <div className="d-flex justify-content-between admin__sliders-banner-update-input">
              <div className="">
                <label htmlFor="banner_name" className="form-label">
                  Tên Banner
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên banner"
                  className="form-control"
                  id="banner_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="">
                <label htmlFor="banner_image" className="form-label">
                  Hình ảnh
                </label>
                <input
                  type="url"
                  placeholder="Nhập url hình ảnh"
                  className="form-control"
                  id="banner_image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="">
                <label htmlFor="banner_linkTo" className="form-label">
                  Liên kết đến
                </label>
                <input
                  type="text"
                  placeholder="Nhập liên kết"
                  className="form-control"
                  id="banner_linkTo"
                  value={linkTo}
                  onChange={(e) => setLinkTo(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <button disabled={!isEditBanner} className="btn btn-danger p-2" onClick={() => cancelHandler()}>
                Hủy
              </button>
              {/* <button
                disabled={!isEditBanner}
                className="btn btn-warning p-2"
                data-toggle="modal"
                data-target="#exampleModalCenter"
                onClick={() => {
                  typeModal("updateBanner");
                }}
              >
                Cập nhật
              </button> */}

              <button disabled={!isEditBanner} className="btn btn-warning p-2" onClick={() => submitHandler()}>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateBanner;
