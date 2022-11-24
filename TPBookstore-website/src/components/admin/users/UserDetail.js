import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetUserDetails } from "../../../Redux/Actions/userActions";
import Loading from "../../base/LoadingError/Loading";
import Message from "../../base/LoadingError/Error";

const UserDetail = (props) => {
  const { userId } = props;
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.adminGetUserDetails);
  const { loading, success, error, user } = userDetails;
  useEffect(() => {
    dispatch(adminGetUserDetails(userId));
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          <div className="profile-title">
            <b>Thông tin cá nhân</b>
          </div>
          <div className="user-information">
            {/* User name */}
            <div className="col-md-12">
              <div className="form account__user">
                <label htmlFor="account-fn">Tên người dùng</label>
                <label>{user.name ?? ""}</label>
              </div>
            </div>

            {/* Phone number */}
            <div className="col-md-12">
              <div className="form account__user">
                <label htmlFor="account-phone">Số điện thoại</label>
                <label>{user.phone ?? ""}</label>
              </div>
            </div>

            {/* Email */}
            <div className="col-md-12">
              <div className="form account__user">
                <label htmlFor="account-email">Địa chỉ e-mail</label>
                <label>{user.email ?? ""}</label>
              </div>
            </div>

            {/* Sex */}
            <div className="col-md-6">
              <div className="form account__user account-sex">
                <label htmlFor="account-sex-title">Giới tính</label>
                <label>{user.sex ?? ""}</label>
              </div>
            </div>
            {/*Birthday*/}
            <div className="form account__user">
              <label htmlFor="account-birthday">Ngày sinh</label>
              <label>{user.birthday ?? ""}</label>
            </div>

            {/* ADDRESS */}
            <div className="col-md-12">
              <div className="form account__user_address">
                <label htmlFor="account-address">Địa chỉ</label>
                <label>
                  {user.address?.province?.concat(
                    ", ",
                    user.address?.district,
                    ", ",
                    user.address?.ward,
                    ", ",
                    user.address?.specificAddress
                  )}
                </label>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default UserDetail;
