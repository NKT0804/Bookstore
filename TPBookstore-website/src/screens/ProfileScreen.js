import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import ProfileTabs from "../components/profileComponents/ProfileTabs";
import { getUserDetails } from "../Redux/Actions/userActions";
import Orders from "./../components/profileComponents/Orders";
import moment from "moment";
import { listMyOrders } from "../Redux/Actions/orderActions";
import Avatar from "../components/profileComponents/Avatar";
import Footer from "../components/Footer";
import UserPassword from "../components/profileComponents/UserPassword";

const ProfileScreen = () => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const listMyOrder = useSelector((state) => state.listMyOrders);
  const { loading, error, orders } = listMyOrder;

  useEffect(() => {
    dispatch(listMyOrders());
    dispatch(getUserDetails("profile"));
  }, [dispatch]);

  const onAvatarLoadError = (e) => {
    e.currentTarget.onerror = null; // prevents looping
    e.currentTarget.src = `${window.location.origin}/images/avatar/default.png`;
  };

  return (
    <>
      <Header />
      <div className="container user__profile mt-lg-5 mt-3">
        <div className="row align-items-start">
          <div className="col-lg-3 p-0 shadow ">
            <div className="author-card pb-0">
              <div className="author-card-cover">
                <div className="author-card-details col-md-7">
                  <h5 className="author-card-name mb-2">
                    <strong>{userInfo.name}</strong>
                  </h5>
                  <span className="author-card-position">
                    <>Joined {moment(userInfo.createdAt).format("LLL")}</>
                  </span>
                </div>
              </div>
              <div className="author-card-profile row">
                <div className="author-card-avatar col-md-5">
                  <img src={userInfo?.avatarUrl} onError={onAvatarLoadError} alt="Avatar" />
                </div>
                <Avatar />
              </div>
            </div>
            <div className="wizard ">
              <div className="d-flex align-items-start">
                <div
                  className="nav align-items-start flex-column col-12 nav-pills me-3 "
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link active"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    Tài khoản của tôi
                  </button>

                  <button
                    className="nav-link"
                    id="v-pills-password-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-password"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-password"
                    aria-selected="true"
                  >
                    Đổi mật khẩu
                  </button>

                  <button
                    className="nav-link d-flex justify-content-between"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Danh sách đơn hàng
                    <span className="badge2">{orders ? orders.length : 0}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* panels */}
          <div className="tab-content col-lg-9 pb-5 pt-lg-0 pt-3" id="v-pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <ProfileTabs />
            </div>

            <div
              className="tab-pane fade show"
              id="v-pills-password"
              role="tabpanel"
              aria-labelledby="v-pills-password-tab"
            >
              <UserPassword />
            </div>

            <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
              <Orders orders={orders} loading={loading} error={error} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileScreen;
