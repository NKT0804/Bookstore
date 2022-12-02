import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";

const UploadImage = (props) => {
  const [images, setImages] = useState("");
  const { setImage } = props;
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
            <button style={isDragging ? { color: "red" } : undefined} onClick={onImageUpload} {...dragProps}>
              Click or Drop here
            </button>
            <button onClick={() => onImageRemove(0)}>Remove</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image["data_url"]} alt="" width="100" />
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default UploadImage;
