import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { listCategory } from "../../Redux/Actions/categoryActions";

const CategoryList = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { category } = categoryList;

  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

  return (
    <div className="col-md-1 icon__menu-product ">
      <i class="far fa-bars"></i>
      <div className="list-category-header">
        <div className="row py-2">
          <h3 className="mx-4 py-2">DANH MỤC SẢN PHẨM</h3>
          <div className="col-lg-3 col-md-6 py-1 list-category-header-item">
            <span className="list-category-header-item__title">Văn học</span>
            {category?.map((item) =>
              item.parent_category === "Văn học" ? (
                <Link to={`/category/${item.slug}`}>
                  <p className="list-category-header-item__link">{item.name}</p>
                </Link>
              ) : (
                <></>
              )
            )}
          </div>
          <div className="col-lg-3 col-md-6 py-1 list-category-header-item">
            <span className="list-category-header-item__title">Kinh tế</span>
            {category?.map((item) =>
              item.parent_category === "Kinh tế" ? (
                <Link to={`/category/${item.slug}`}>
                  <p className="list-category-header-item__link">{item.name}</p>
                </Link>
              ) : (
                <></>
              )
            )}
          </div>
          <div className="col-lg-3 col-md-6 py-1 list-category-header-item">
            <span className="list-category-header-item__title">Tâm lý-Kĩ năng sống</span>
            {category?.map((item) =>
              item.parent_category === "Tâm lý-Kĩ năng sống" ? (
                <Link to={`/category/${item.slug}`}>
                  <p className="list-category-header-item__link">{item.name}</p>
                </Link>
              ) : (
                <></>
              )
            )}
          </div>
          <div className="col-lg-3 col-md-6 py-1 list-category-header-item">
            <span className="list-category-header-item__title">Nuôi dạy con</span>
            {category?.map((item) =>
              item.parent_category === "Nuôi dạy con" ? (
                <Link to={`/category/${item.slug}`}>
                  <p className="list-category-header-item__link">{item.name}</p>
                </Link>
              ) : (
                <></>
              )
            )}
          </div>
        </div>
        <div className="row py-2">
          <div className="col-lg-3 col-md-6 py-1 list-category-header-item">
            <span className="list-category-header-item__title">Sách thiếu nhi</span>
            {category?.map((item) =>
              item.parent_category === "Sách thiếu nhi" ? (
                <Link to={`/category/${item.slug}`}>
                  <p className="list-category-header-item__link">{item.name}</p>
                </Link>
              ) : (
                <></>
              )
            )}
          </div>
          <div className="col-lg-3 col-md-6 py-1 list-category-header-item">
            <span className="list-category-header-item__title">Tiểu sử-Hồi ký</span>
            {category?.map((item) =>
              item.parent_category === "Tiểu sử-Hồi ký" ? (
                <Link to={`/category/${item.slug}`}>
                  <p className="list-category-header-item__link">{item.name}</p>
                </Link>
              ) : (
                <></>
              )
            )}{" "}
          </div>
          <div className="col-lg-3 col-md-6 py-1 list-category-header-item">
            <span className="list-category-header-item__title">Giáo khoa-Tham khảo</span>
            {category?.map((item) =>
              item.parent_category === "Giáo khoa-Tham khảo" ? (
                <Link to={`/category/${item.slug}`}>
                  <p className="list-category-header-item__link">{item.name}</p>
                </Link>
              ) : (
                <></>
              )
            )}{" "}
          </div>
          <div className="col-lg-3 col-md-6 py-1 list-category-header-item">
            <span className="list-category-header-item__title">Sách học ngoại ngữ</span>
            {category?.map((item) =>
              item.parent_category === "Sách học ngoại ngữ" ? (
                <Link to={`/category/${item.slug}`}>
                  <p className="list-category-header-item__link">{item.name}</p>
                </Link>
              ) : (
                <></>
              )
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
