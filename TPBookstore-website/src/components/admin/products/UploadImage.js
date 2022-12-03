import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";

const UploadImage = (props) => {
  const [images, setImages] = useState("");
  const { setImage } = props;
  const [imageUrl, setImageUrl] = useState("");

  const onChange = (imageList) => {
    // data for submit
    setImage(imageList[0]?.data_url);
    setImages(imageList);
  };

  return (
    <div>
      <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
        {({ imageList, onImageUpload, onImageRemove, isDragging, dragProps }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <div className="upload__image-item">
              <span
                className="upload__image-file"
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                <i class="fas fa-file-image" title="Chọn ảnh"></i>
              </span>
              <input
                className="form-control upload__image-url"
                type="url"
                placeholder="Nhập URL hình ảnh"
                value={imageUrl}
                required
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            {imageList.map((image, index) => (
              <div key={index} className="upload__image-item">
                <img className="upload__image-img" src={image["data_url"]} alt="" width="100" />
                <span className="upload__image-cancel" title="Xoá ảnh" onClick={() => onImageRemove(0)}>
                  <i class="fas fa-window-close"></i>
                </span>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default UploadImage;
