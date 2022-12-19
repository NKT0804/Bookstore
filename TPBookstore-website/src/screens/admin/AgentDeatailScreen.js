import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import AgentDetail from "../../components/admin/users/AgentDetail";

const AgentDetailScreen = ({ match }) => {
  const userId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AgentDetail userId={userId} />
      </main>
    </>
  );
};

export default AgentDetailScreen;
