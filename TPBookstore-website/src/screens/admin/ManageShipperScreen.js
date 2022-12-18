import React from "react";
import Header from "../../components/admin/Header";
import { Link } from "react-router-dom";
import ManageShipperMain from "../../components/admin/orders/ManageShipperMain";

const ManageShipper = () => {
  return (
    <>
      <div className="shipper__order">
        <div className="shipper__order-header">
          <Link className="navbar-brand" to="/">
            <img className="img__logo" alt="logo" src="/images/logo.png" />
          </Link>
          <Header />
        </div>
        <ManageShipperMain />
      </div>
    </>
  );
};

export default ManageShipper;
