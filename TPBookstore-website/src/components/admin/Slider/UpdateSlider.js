import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../base/LoadingError/Loading";

const UpdateCategory = ({ currentCategory, setIsEditCategory }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  return (
    <>
      <div className="">
        <div>
          {/* {loading && <Loading />} */}
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
                // value={name}
                // onChange={(e) => setName(e.target.value)}
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
                // value={name}
                // onChange={(e) => setName(e.target.value)}
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
                // value={name}
                // onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-size btn-primary p-2">Cập nhật Slider</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCategory;
