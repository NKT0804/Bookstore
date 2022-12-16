import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import ManageShipperMain from "../../components/admin/users/ManageShipperMain";

const ManageShipper = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ManageShipperMain />
      </main>
    </>
  );
};

export default ManageShipper;
