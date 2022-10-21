import React from "react";

const PriceFilter = ({ setMinPriceInput, setMaxPriceInput, minPrice, maxPrice, message, ApplyHandler }) => {
  return (
    <div className="filter-menu-item">
      <div className="distance-price">
        <p className="distance-price__p">Khoảng giá</p>
        <div className="distance-price__flex" style={{ display: "flex", alignItems: "center" }}>
          <input
            className="distance-price__input"
            type="number"
            placeholder="$TỪ"
            value={minPrice}
            onChange={(e) => setMinPriceInput(e.target.value)}
            min="0"
          ></input>
          <label>-</label>
          <input
            className="distance-price__input"
            type="number"
            placeholder="$ĐẾN"
            value={maxPrice}
            onChange={(e) => setMaxPriceInput(e.target.value)}
            min="1"
          ></input>
        </div>
        <p style={{ fontSize: "14px", color: "red" }}>{message}</p>
        <button className="distance-price__submit" onClick={ApplyHandler}>
          ÁP DỤNG
        </button>
      </div>
    </div>
  );
};

export default PriceFilter;
