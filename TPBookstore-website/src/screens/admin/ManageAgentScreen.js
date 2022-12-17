import React from "react";
import Sidebar from "./../../components/admin/Sidebar";
import Header from "./../../components/admin/Header";
import ManageAgent from "../../components/admin/users/ManageAgent";

const ManageAgentScreen = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("q") || "";
  const page = queryParams.get("p") || "";
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ManageAgent keyword={keyword} pageNumber={page} />
      </main>
    </>
  );
};

export default ManageAgentScreen;
