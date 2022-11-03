import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./../base/LoadingError/Toast";
import Loading from "./../base/LoadingError/Loading";
import Message from "./../base/LoadingError/Error";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../Redux/Actions/userActions";

const UserPassword = () => {
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

      {/* Giao diện */}
      <form className="row form-container ms-4 shadow" onSubmit={submitHandler} encType="multipart/form-data">
        <div className="profile-title">
          <b>Đổi mật khẩu</b>
        </div>
        <div className="user-password">
          <div className="col-md-12">
            <div className="form">
              <label htmlFor="account-pass__current">Mật khẩu hiện tại</label>
              <input
                className="form-control"
                type="password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu hiện tại"
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="form">
              <label htmlFor="account-pass__new">Mật khẩu mới</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới"
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="form">
              <label htmlFor="account-confirm-pass">Xác nhận mật khẩu</label>
              <input
                className="form-control"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Xác nhận mật khẩu mới"
              />
            </div>
          </div>
          <button type="submit">Cập nhật</button>
        </div>
      </form>
    </>
  );
};

export default UserPassword;
