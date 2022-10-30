import React, { useState } from "react";
import BannerTable from "./BannerTable";
import UpdateBanner from "./UpdateBanner";

const BannerComponent = () => {
  return (
    <>
      <div className="content-header">
        <h2 className="content-title">Banner</h2>
      </div>

      <div className="row">
        <div className="card shadow-sm p-3 pb-3 mb-3">
          <UpdateBanner />
        </div>
        <div className="card p-3">
          <BannerTable />
        </div>
      </div>
    </>
  );
};

export default BannerComponent;
