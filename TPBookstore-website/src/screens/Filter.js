import React from "react";
import CategoryFilter from "../components/filterClient/CategoryFilter";
import PriceFilter from "../components/filterClient/PriceFilter";
import RatingFilter from "../components/filterClient/RatingFilter";
import { Link } from "react-router-dom";

const Filter = (props) => {
  const {
    category,
    categoryFilter,
    setCategoryFilter,
    ratingFilter,
    setRatingFilter,
    minPrice,
    maxPrice,
    setMinPriceInput,
    setMaxPriceInput,
    message,
    ApplyHandler,
    ClearHandle
  } = props;
  return (
    <>
      <div className="filter-menu">
        <div>
          <h4 className="filter-menu__title">DANH MỤC</h4>
        </div>
        <CategoryFilter category={category} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} />
        <div>
          <h4 className="filter-menu__title">BỘ LỌC TÌM KIẾM</h4>
        </div>
        <PriceFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPriceInput={setMinPriceInput}
          setMaxPriceInput={setMaxPriceInput}
          message={message}
          ApplyHandler={ApplyHandler}
        />
        <RatingFilter ratingFilter={ratingFilter} setRatingFilter={setRatingFilter} />
      </div>
      <div className="" display={{ display: "flex", alignItems: "center" }}>
        <button className="distance-price__submit">
          <Link className="navbar-brand" to="/" onClick={ClearHandle} style={{ fontSize: "0.85rem", color: "#fff" }}>
            XÓA TẤT CẢ
          </Link>
        </button>
      </div>
    </>
  );
};

export default Filter;
