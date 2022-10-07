import React from "react";

const SortBy = (props) => {
  const { sortBy, setSortBy } = props;
  return (
    <div className="">
      <b>Sort by</b>
      <select className="form-select" aria-label="Sort By" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Sort by</option>
        <option value="asc" id="asc">
          Giá từ thấp đến cao
        </option>
        <option value="desc" id="desc">
          Giá từ cao đến thấp
        </option>
        <option value="newest" id="newest">
          Mới nhất
        </option>
        <option value="latest" id="latest">
          Cũ nhất
        </option>
      </select>
    </div>
  );
};
export default SortBy;
