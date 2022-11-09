import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Actions/userActions";
import { useHistory } from "react-router-dom";

const Header = () => {
  const [keyword, setKeyword] = useState();
  let history = useHistory();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const onAvatarLoadError = (e) => {
    e.currentTarget.onerror = null; // prevents looping
    e.currentTarget.src = `${window.location.origin}/images/avatar/default.png`;
  };
  useEffect(() => {
    $("[data-trigger]").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var offcanvas_id = $(this).attr("data-trigger");
      $(offcanvas_id).toggleClass("show");
    });

    $(".btn-aside-minimize").on("click", function () {
<<<<<<< HEAD
      if (window.innerWidth < 1024) {
=======
      if (window.innerWidth < 768) {
>>>>>>> 43897214a505e9743e806d5aa9f66dc03fec442b
        $("body").removeClass("aside-mini");
        $(".navbar-aside").removeClass("show");
      } else {
        // minimize sidebar on desktop
        $("body").toggleClass("aside-mini");
      }
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
<<<<<<< HEAD
      history.push(`/admin/search/${keyword}`);
=======
      // history.push(`/admin/search/${keyword}`);
>>>>>>> 43897214a505e9743e806d5aa9f66dc03fec442b
    } else {
      history.push(`/admin`);
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="main-header navbar">
      <div className="col-search">
        <form className="searchform" onSubmit={submitHandler}>
          <div className="input-group search-wrap-admin">
            <input
              list="search_terms"
              type="text"
              className="form-control input-search-admin"
<<<<<<< HEAD
              placeholder="Search term"
=======
              placeholder="Tìm kiếm"
>>>>>>> 43897214a505e9743e806d5aa9f66dc03fec442b
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="btn btn-light bg btn-search-admin" type="submit">
              <i className="far fa-search icon-search-admin"></i>
            </button>
          </div>
<<<<<<< HEAD
          <datalist id="search_terms"></datalist>
=======
          <datalist id="search_terms">
            <option value="Bảng điều khiển" />
            <option value="Sản phẩm" />
            <option value="Thêm sản phẩm" />
            <option value="Danh mục" />
            <option value="Đơn hàng" />
            <option value="Tài khoản" />
            <option value="Bình luận" />
            <option value="Slider" />
            <option value="Banner" />
          </datalist>
>>>>>>> 43897214a505e9743e806d5aa9f66dc03fec442b
        </form>
      </div>
      <div className="col-nav">
        <button className="btn btn-icon btn-mobile me-auto" data-trigger="#offcanvas_aside">
          <i className="md-28 fas fa-bars"></i>
        </button>
        <ul className="nav">
          <li className="nav-item">
            <Link className={`nav-link btn-icon `} title="Dark mode" to="#">
              <i className="fas fa-moon"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link btn-icon" to="#">
              <i className="fas fa-bell"></i>
            </Link>
          </li>
          <li className="nav-item">
<<<<<<< HEAD
            <Link className="nav-link" to="#">
              English
            </Link>
=======
            <select className="border border-white">
              <option>Tiếng việt</option>
              <option>Tiếng anh</option>
            </select>
>>>>>>> 43897214a505e9743e806d5aa9f66dc03fec442b
          </li>
          <li className="dropdown nav-item">
            <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
              <img className="img-xs rounded-circle" src={userInfo.avatarUrl} onError={onAvatarLoadError} alt="User" />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link className="dropdown-item" to="/profile">
<<<<<<< HEAD
                My profile
              </Link>
              <Link className="dropdown-item" to="#">
                Settings
              </Link>
              <Link onClick={logoutHandler} className="dropdown-item text-danger" to="#">
                Exit
=======
                Tài khoản
              </Link>
              <Link className="dropdown-item" to="#">
                Cài đặt
              </Link>
              <Link onClick={logoutHandler} className="dropdown-item text-danger" to="#">
                Đăng xuất
>>>>>>> 43897214a505e9743e806d5aa9f66dc03fec442b
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
