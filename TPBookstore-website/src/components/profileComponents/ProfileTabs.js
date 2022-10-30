import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./../base/LoadingError/Toast";
import Loading from "./../base/LoadingError/Loading";
import Message from "./../base/LoadingError/Error";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../Redux/Actions/userActions";

const ProfileTabs = () => {
  const toastObjects = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toastId = React.useRef(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading } = userUpdateProfile;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    // check password match
    if (password !== confirmPassword || password === "" || password.length < 6 || password.length > 16) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Password does not match", toastObjects);
      }
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, avatarUrl: user.avatarUrl, password }));

      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Profile Updated", toastObjects);
      }
    }
  };
  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      <form className="row ms-4 form-container" onSubmit={submitHandler} encType="multipart/form-data">
        <div className="profile-title">
          <b>Thông tin cá nhân</b>
        </div>
        <div className="user-information">
          {/* User name */}
          <div className="col-md-12">
            <div className="form">
              <label htmlFor="account-fn">Tên người dùng</label>
              <input
                className="form-control"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Phone number */}
          <div className="col-md-12">
            <div className="form">
              <label htmlFor="account-phone">Số điện thoại</label>
              <input
                className="form-control"
                type="text"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                // disabled
              />
            </div>
          </div>

          {/* Email */}
          <div className="col-md-12">
            <div className="form">
              <label htmlFor="account-email">Địa chỉ e-mail</label>
              <input
                className="form-control disabled-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
            </div>
          </div>

          {/* ADDRESS */}
          <div className="col-md-12">
            <div className="form">
              <label htmlFor="account-address__title">Địa chỉ</label>
              <div className="account-address__select">
                <select className="acount-address__item">
                  <option value="">Tỉnh/Thành phố</option>
                  <option value="">TP.Hồ Chí Minh</option>
                  <option value="">TP.Hà Nội</option>
                </select>
                <select className="acount-address__item">
                  <option value="">Quận/Huyện</option>
                  <option value="">Quận 1</option>
                  <option value="">Quận 12</option>
                  <option value="">Quận 10</option>
                </select>
                <select className="acount-address__item">
                  <option value="">Xã/Phường</option>
                  <option value="">Phường Tân Chánh Hiệp</option>
                  <option value="">Phường 11</option>
                  <option value="">Phường Thạnh Lộc</option>
                </select>
              </div>
              <input
                className="form-control input__address"
                type="text"
                required
                placeholder="Nhập địa chỉ cụ thể"
                // value={name}
                // onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Sex */}
          <div className="col-md-6">
            <div className="form account-sex">
              <label htmlFor="account-address__title">Giới tính</label>
              <p>
                <input type="radio" name="gender" value="nam" />
                <label for="male">Nam</label>
              </p>

              <p>
                <input type="radio" name="gender" id="female" value="nữ" class="information_input-sex--item" />
                <label for="female">Nữ</label>
              </p>

              <p>
                <input type="radio" name="gender" value="khác" id="another" class="information_input-sex--item" />
                <label for="another">Khác</label>
              </p>
            </div>
          </div>
          <button type="submit">Cập nhật</button>
        </div>
      </form>
    </>
  );
};

export default ProfileTabs;
