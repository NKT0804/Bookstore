import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ShopSection from "../components/homeComponents/ShopSection";
import ContactInfo from "../components/homeComponents/ContactInfo";
import CalltoActionSection from "../components/homeComponents/CalltoActionSection";
import Slideshow from "../components/Slideshow";
import Footer from "../components/Footer";
import Policy from "./Policy";
import CustomerReview from "./CustomerReview";
import BestSellerProduct from "../components/carouselProduct/BestSellerProduct";
import BestNumViewsProduct from "../components/carouselProduct/BestNumViewsProduct";

const HomeScreen = ({ location }) => {
  window.scrollTo(0, 0);
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("q") || "";
  const page = queryParams.get("p") || "";
  const limit = queryParams.get("limit") || "";

  const [isFilter, setIsFilter] = useState(false);

  return (
    <div>
      <Header />
      <div
        style={{
          display: `${keyword}` || `${page}` || `${isFilter}` === `${true}` ? "none" : "block"
        }}
      >
        <Slideshow />
        <Policy />
        <div className="container">
          <BestSellerProduct />
        </div>
        <div className="container">
          <BestNumViewsProduct />
        </div>
      </div>
      <ShopSection keyword={keyword} pageNumber={page} isFilter={isFilter} setIsFilter={setIsFilter} />
      <CustomerReview />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
