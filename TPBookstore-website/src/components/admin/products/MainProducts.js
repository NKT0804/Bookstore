import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProductsAdmin } from "./../../../Redux/Actions/productActions.js";
import Loading from "./../../base/LoadingError/Loading";
import Message from "./../../base/LoadingError/Error";
import PaginationAdmin from "../Home/PaginationAdmin";
import Toast from "../../base/LoadingError/Toast";
import { listCategoryAdmin } from "../../../Redux/Actions/categoryActions";
import CategoryFilterAdmin from "../filterAdmin/CategoryFilterAdmin";

const MainProducts = (props) => {
  const { keyword, pageNumber } = props;
  const dispatch = useDispatch();

  const [categoryFilterAdmin, setCategoryFilterAdmin] = useState("");

  const productListAdmin = useSelector((state) => state.productListAdmin);
  const { loading, error, products, page, pages } = productListAdmin;

  const categoryListAdmin = useSelector((state) => state.categoryListAdmin);
  const { category } = categoryListAdmin;

  const productDeleteAdmin = useSelector((state) => state.productDeleteAdmin);
  const { error: errorDelete, success: successDelete } = productDeleteAdmin;

  let productsFilterCategory = [];

  const handleCategoryFilterAdmin = () => {
    if (categoryFilterAdmin !== "") {
      productsFilterCategory = products
        ? products.filter((itemCate) => itemCate.category._id === categoryFilterAdmin)
        : [];
    } else {
      productsFilterCategory = products;
    }
  };
  handleCategoryFilterAdmin();

  useEffect(() => {
    dispatch(listProductsAdmin(keyword, pageNumber));
    dispatch(listCategoryAdmin());
  }, [dispatch, keyword, pageNumber, successDelete]);

  return (
    <section className="content-main">
      <Toast />
      <div className="content-header">
        <h2 className="content-title">Sản phẩm</h2>
        <div>
          <Link to="/admin/addproduct" className="btn btn-primary btn-size">
            Thêm sản phẩm
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input type="search" placeholder="Tìm kiếm" className="form-control p-2" />
            </div>
            <CategoryFilterAdmin
              category={category}
              categoryFilterAdmin={categoryFilterAdmin}
              setCategoryFilterAdmin={setCategoryFilterAdmin}
            />
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Mới nhất</option>
                <option>Cũ nhất</option>
                <option>Giá tăng dần</option>
                <option>Giá giảm dần</option>
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
                  {productsFilterCategory?.map((product, index) => (
                    <Product product={product} index={index} key={product._id} successDelete={successDelete} />
                  ))}
                </tbody>
              </table>
            </>
          )}
          {/* PaginationAdmin */}
          <PaginationAdmin page={page} pages={pages} keyword={keyword ? keyword : ""} />
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
