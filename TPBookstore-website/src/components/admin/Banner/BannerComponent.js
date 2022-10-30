import React, { useState } from "react";
import BannerTable from "./BannerTable";
import UpdateBanner from "./UpdateBanner";

const BannerComponent = () => {
  const [isEditBanner, setIsEditBanner] = useState(false);
  const [currentBanner, setCurrentBanner] = useState("");

  return (
    <>
      <div className="content-header">
        <h2 className="content-title">Banner</h2>
      </div>

      <div className="row">
        <div className="card shadow-sm p-3 pb-3 mb-3">
          <UpdateBanner
            isEditBanner={isEditBanner}
            currentBanner={currentBanner}
            setIsEditBanner={setIsEditBanner}
            setCurrentBanner={setCurrentBanner}
          />
        </div>
        <div className="card p-3">
          <BannerTable setIsEditBanner={setIsEditBanner} setCurrentBanner={setCurrentBanner} />
        </div>
      </div>
    </>
  );
};

export default BannerComponent;
