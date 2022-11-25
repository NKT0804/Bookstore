import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProductsAdmin } from "./../../../Redux/Actions/productActions.js";
import Loading from "./../../base/LoadingError/Loading";
import Message from "./../../base/LoadingError/Error";
import PaginationAdmin from "../Home/PaginationAdmin";
import Toast from "../../base/LoadingError/Toast";
import { toast } from "react-toastify";
import { listCategoryAdmin } from "../../../Redux/Actions/categoryActions";
import CategoryFilterAdmin from "../filterAdmin/CategoryFilterAdmin";
import SortBy from "../filterAdmin/SortBy";
import { PRODUCT_DELETE_RESET } from "../../../Redux/Constants/productConstants";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000
};
const MainProducts = React.memo((props) => {
  const { keyword, pageNumber } = props;
  const dispatch = useDispatch();
  let history = useHistory();

  const [keywordSearch, setKeywordSearch] = useState(keyword);
  const [categoryFilterAdmin, setCategoryFilterAdmin] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [limit, setLimit] = useState(10);

  const productListAdmin = useSelector((state) => state.productListAdmin);
  const { loading, error, products, page, pages } = productListAdmin;

  const categoryListAdmin = useSelector((state) => state.categoryListAdmin);
  const { category } = categoryListAdmin;

  const productDeleteAdmin = useSelector((state) => state.productDeleteAdmin);
  const { error: errorDelete, success: successDelete } = productDeleteAdmin;

  useEffect(() => {
    dispatch(listProductsAdmin(keyword, pageNumber, categoryFilterAdmin, sortBy, limit));
    dispatch(listCategoryAdmin());
    if (successDelete) {
      toast.success("Xóa sản phẩm thành công!", ToastObjects);
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
  }, [dispatch, keyword, pageNumber, successDelete, categoryFilterAdmin, sortBy, limit]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keywordSearch.trim()) {
      history.push(`/admin/products?q=${keywordSearch}`);
    } else {
      history.push("/admin/products");
    }
  };
  return (
    <section className="content-main">
      <Toast />
      <div className="content-header">
        <h2 className="content-title">Sản phẩm</h2>
        <div>
          <Link to="/admin/addProduct" className="btn btn-primary btn-size">
            Thêm sản phẩm
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row">
            <form onSubmit={submitHandler} className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Tìm kiếm sản phẩm"
                className="form-control"
                value={keywordSearch}
                onChange={(e) => setKeywordSearch(e.target.value)}
              />
            </form>
            <CategoryFilterAdmin
              category={category}
              categoryFilterAdmin={categoryFilterAdmin}
              setCategoryFilterAdmin={setCategoryFilterAdmin}
            />
            <SortBy sortBy={sortBy} setSortBy={setSortBy} />
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" value={limit} onChange={(e) => setLimit(e.target.value)}>
                <option value={"10"}>10 sản phẩm</option>
                <option value={"20"}>20 sản phẩm</option>
                <option value={"30"}>30 sản phẩm</option>
                <option value={"40"}>40 sản phẩm</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && <Message variant="alert-danger">{errorDelete}</Message>}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <>
              <table className="table">
                <thead className="pc-header">
                  <tr>
                    <th>Stt</th>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Đánh giá</th>
                    <th>Thể loại</th>
                    <th>Đơn giá</th>
                    <th>Kho</th>
                    <th>Đã bán</th>
                    <th className="text-end">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <Product products={products} preIndex={(page - 1) * limit} />
                </tbody>
              </table>
            </>
          )}
          {/* PaginationAdmin */}
          <PaginationAdmin page={page} pages={pages} keyword={keyword ? keyword : ""} basePath={"/admin/products"} />
        </div>
      </div>
    </section>
  );
});

export default MainProducts;
