import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Message from "../components/base/LoadingError/Error";
import Loading from "../components/base/LoadingError/Loading";
import { toast } from "react-toastify";
import Toast from "../components/base/LoadingError/Toast";
import { forGotPassWord } from "../Redux/Actions/userActions";
import { USER_FORGOT_PASSWORD_RESET } from "../Redux/Constants/userConstants";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 3000
};
const ForgotPassword = () => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();

  const forgotPassword = useSelector((state) => state.userForgotPassword);
  const { error: errorForgot, loading: loadingForgot, success: successForgot } = forgotPassword;

  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Giá trị bắt buộc*")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Vui lòng nhập một địa chỉ email hợp lệ")
    }),
    onSubmit: (value) => {
      dispatch(forGotPassWord(formik.values.email));
    }
  });
  useEffect(() => {
    if (successForgot) {
      toast.success("Yêu cầu đã được gửi đi, hãy kiểm tra hộp thư email của bạn!", ToastObjects);
      dispatch({ type: USER_FORGOT_PASSWORD_RESET });
    }
    if (errorForgot) {
      toast.error(errorForgot, ToastObjects);
    }
  }, [dispatch, errorForgot, successForgot]);
  return (
    <>
      <Toast />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {loadingForgot && <Loading />}
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={formik.handleSubmit}>
          <div>
            <Link to="/login">
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </Link>
            <div className="col-6 d-flex align-items-center">
              <img alt="logo" src="/images/logo.png" />
            </div>
          </div>

          <h5 className="form-title">Đặt lại mật khẩu</h5>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <div className="frame-error">
            {formik.errors.email && <span className="error-message">{formik.errors.email}</span>}
          </div>

          <button type="submit">Gửi Yêu cầu</button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
