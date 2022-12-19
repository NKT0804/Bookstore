import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import UserDetails from "../../components/admin/users/UserDetails";

const UserDetailsScreenAdmins = ({ match }) => {
  const userId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <UserDetails userId={userId} />
      </main>
    </>
  );
};

export default UserDetailsScreenAdmins;
