import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getCartListItem } from "../Redux/Actions/cartActions";
import { logout } from "../Redux/Actions/userActions";
// import Sidebar from "./sidebar/Sidebar";

const Header = () => {
  const [keyword, setKeyword] = useState();
  const dispatch = useDispatch();
  let history = useHistory();

  const cart = useSelector((state) => {
    return state.cartListItem.cartUser ?? state.cartListItem;
  });
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(getCartListItem());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  // search handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  const onAvatarLoadError = (e) => {
    e.currentTarget.onerror = null; // prevents looping
    e.currentTarget.src = `${window.location.origin}/images/avatar/default.png`;
  };

  return (
    <div>
      {/* Top Header */}
      <div className="Announcement ">
        <img alt="banner_book" src=".././images/banner.jpg" className="banner__header" />
      </div>

      {/* Header */}
      <div className="header">
        <div className="container">
          {/* Toggle menu */}
          {/* <Sidebar /> */}

          {/* MOBILE HEADER */}
          <div className="mobile-header mb-3">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <img alt="logo" src="/images/logo.png" />
                  </Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  {userInfo ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      ></button>
                      <i class="fa fa-user" aria-hidden="true"></i>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">
                          Tài khoản
                        </Link>
                        {userInfo?.isAdmin === true && (
                          <Link className="dropdown-item" to="/admin">
                            Trang Quản trị
                          </Link>
                        )}
                        <Link className="dropdown-item" to="#" onClick={logoutHandler}>
                          Đăng xuất
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/login">
                          Đăng nhập
                        </Link>

                        <Link className="dropdown-item" to="/register">
                          Đăng ký
                        </Link>
                      </div>
                    </div>
                  )}

                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">{cartItems?.length}</span>
                  </Link>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <form onSubmit={submitHandler} className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Tìm kiếm"
                      // value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                      Tìm kiếm
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <img alt="logo" src="/images/logo.png" />
                </Link>
              </div>
              <div className="col-md-6 col-4 d-flex flex-column">
                <form onSubmit={submitHandler} className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Tìm kiếm"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button type="submit" className="search-button">
                    Tìm kiếm
                  </button>
                </form>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {userInfo ? (
                  <div className="btn-group">
                    <Link to="/profile">
                      <img
                        className="img-xs rounded-circle"
                        src={userInfo?.avatarUrl}
                        onError={onAvatarLoadError}
                        alt="User avatar"
                      />
                    </Link>
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {`${userInfo?.name.length} >= 10` ? `  ${userInfo?.name.slice(0, 10)}` : `  ${userInfo?.name}`}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Tài khoản
                      </Link>
                      {userInfo?.isAdmin === true && (
                        <Link className="dropdown-item" to="/admin">
                          Trang Quản trị
                        </Link>
                      )}
                      <Link className="dropdown-item" to="#" onClick={logoutHandler}>
                        Đăng xuất
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <button className="name-button">
                      <Link to="/register">Đăng ký</Link>
                    </button>

                    <button className="name-button">
                      <Link to="/login">Đăng nhập</Link>
                    </button>
                  </>
                )}

                <Link to="/cart">
                  <i className="fas fa-shopping-bag"></i>
                  <span className="badge">{cartItems?.length}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
