import React from "react";
import Sidebar from "./../../components/admin/Sidebar";
import Header from "./../../components/admin/Header";
import BannerComponent from "./../../components/admin/Banner/BannerComponent";
import SliderComponent from "./../../components/admin/Slider/SliderComponent";

const UsersScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <section className="content-main">
          <div className="shadow-sm">
            <div className="card shadow-sm p-3 pb-3 mb-3">
              <BannerComponent />
              <SliderComponent />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default UsersScreen;
