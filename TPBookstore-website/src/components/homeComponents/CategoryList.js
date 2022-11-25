import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const CategoryList = () => {
  const categoryList = useSelector((state) => state.categoryList);
  const { category } = categoryList;
  console.log("hshsh" + category);
  return (
    <div className="col-md-1 icon__menu-product ">
      <i class="far fa-bars"></i>
      <div className="list-category-header">
        {category.map((category, index) => (
          <div className="row">
            {index < 5 ? (
              <div className="list-category-header-item col-3">
                <Link>
                  <p className="list-category-header-item__link">{category.name}</p>
                </Link>
              </div>
            ) : index < 10 ? (
              <div className="list-category-header-item col-3">
                <Link>
                  <p className="list-category-header-item__link">{category.name}</p>
                </Link>
              </div>
            ) : index < 15 ? (
              <div className="list-category-header-item col-3">
                <Link>
                  <p className="list-category-header-item__link">{category.name}</p>
                </Link>
              </div>
            ) : (
              <div className="list-category-header-item col-3">
                <Link>
                  <p className="list-category-header-item__link">{category.name}</p>
                </Link>
              </div>
            )}
          </div>
        ))}

        {/* <div className="row py-2">
          <div className="col-3 list-category-header-item">
            <span className="list-category-header-item__title">Văn học</span>
            <p className="list-category-header-item__link">Ngôn tình</p>
          </div>
          <div className="col-3 list-category-header-item">
            <span className="list-category-header-item__title">Kinh tế</span>
            <p className="list-category-header-item__link">Marketing-Bán hàng</p>
          </div>
          <div className="col-3 list-category-header-item">
            <span className="list-category-header-item__title">Tâm lý- Kĩ năng sống</span>
            <p className="list-category-header-item__link">Kĩ năng sống</p>
          </div>
          <div className="col-3 list-category-header-item">
            <span className="list-category-header-item__title">Nuôi dạy con</span>
            <p className="list-category-header-item__link">Phương pháp giáo dục trẻ</p>
          </div>
        </div>
        <div className="row py-2">
          <div className="col-3 list-category-header-item">
            <span className="list-category-header-item__title">Sách thiếu nhi</span>
            <p className="list-category-header-item__link">Kiến thức bách khoa</p>
          </div>
          <div className="col-3 list-category-header-item">
            <span className="list-category-header-item__title">Tiểu sử-Hồi ký</span>
            <p className="list-category-header-item__link">Chính trị</p>
          </div>
          <div className="col-3 list-category-header-item">
            <span className="list-category-header-item__title">Giáo khoa-Tham khảo</span>
            <p className="list-category-header-item__link">Sách Giáo khoa</p>
          </div>
          <div className="col-3 list-category-header-item">
            <span className="list-category-header-item__title">Sách học ngoại ngữ</span>
            <p className="list-category-header-item__link">Tiếng Anh</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CategoryList;
