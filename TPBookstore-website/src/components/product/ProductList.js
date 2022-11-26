import React, { useCallback, useEffect, useState } from "react";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../Redux/Actions/productActions";
import Filter from "../../screens/Filter";
import { listCategory } from "../../Redux/Actions/categoryActions";
import SortBy from "./SortBy";
import Limit from "./Limit";
import ProductComponent from "./ProductComponent";
import { useHistory } from "react-router-dom";
const ProductList = (props) => {
  const { categorySlug, keyword, pageNumber, limit } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const [categoryFilter, setCategoryFilter] = useState(categorySlug ?? "");
  const [ratingFilter, setRatingFilter] = useState("");
  const [minPrice, setMinPriceInput] = useState("");
  const [maxPrice, setMaxPriceInput] = useState("");
  const [limitInput, setLimitInput] = useState(limit ?? 12);
  const [sortBy, setSortBy] = useState("");

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { category } = categoryList;

  const loadData = useCallback(() => {
    dispatch(listProducts(keyword, categorySlug, pageNumber, ratingFilter, minPrice, maxPrice, sortBy, limit));
    dispatch(listCategory());
  }, [dispatch, keyword, categorySlug, pageNumber, ratingFilter, minPrice, maxPrice, , sortBy, limit]);

  useEffect(() => {
    loadData();
  }, [loadData]);
  useEffect(() => {
    const pageQuery = pageNumber ? `&p=${pageNumber}` : "";
    const baseQuery = keyword
      ? categoryFilter
        ? `/search/category/${categoryFilter}?q=${keyword}`
        : `/search?q=${keyword}`
      : categoryFilter
      ? `/category/${categoryFilter}?`
      : `/products?`;
    const limitQuery = limitInput ? `&limit=${limitInput}` : "";
    history.push(`${baseQuery}${limitQuery}${pageQuery}`);
  }, [pageNumber, keyword, categoryFilter, limitInput]);
  return (
    <>
      <div className="container all-products">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12  article">
              <div className="shopcontainer row">
                {/* Search and products quantity */}
                <div className="search__catrgoty row">
                  <div className="col-lg-6">
                    <SortBy sortBy={sortBy} setSortBy={setSortBy} />
                  </div>
                  <div className="col-lg-6">
                    <Limit limitInput={limitInput} setLimitInput={setLimitInput} />
                  </div>
                </div>
                {/* Show products */}
                <div className="row col-lg-12 col-md-12 col-12">
                  <div className="find-product col-lg-2 col-md-4 col-3 pc-header">
                    <Filter
                      category={category}
                      categoryFilter={categoryFilter}
                      setCategoryFilter={setCategoryFilter}
                      ratingFilter={ratingFilter}
                      setRatingFilter={setRatingFilter}
                      setMinPriceInput={setMinPriceInput}
                      setMaxPriceInput={setMaxPriceInput}
                    />
                  </div>
                  <ProductComponent loading={loading} error={error} products={products} />
                </div>

                {/* Pagination */}
                <Pagination
                  page={page}
                  pages={pages}
                  keyword={keyword ? keyword : ""}
                  limit={limit}
                  categorySlug={categorySlug}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;