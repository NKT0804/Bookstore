import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Message from "../components/base/LoadingError/Error";
import Loading from "../components/base/LoadingError/Loading";
import { toast } from "react-toastify";
import Toast from "../components/base/LoadingError/Toast";
import { verifyEmail } from "../Redux/Actions/userActions";

const RegisterVerify = ({ history, match }) => {
  window.scrollTo(0, 0);
  const { email, verificationToken } = match.params;
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, success, userInfo } = userRegister;
  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);
  const submitHandler = () => {
    dispatch(verifyEmail(email, verificationToken));
  };
  return (
    <>
      <Toast />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {/* {loading && <Loading />}
        <form className="Login col-md-8 col-lg-4 col-11"> */}
        <div>
          <Link to="/login">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </Link>
          <div className="col-6 d-flex align-items-center">
            <img alt="logo" src="/images/logo.png" />
          </div>
        </div>

        <h4 className="form-title">Xác thực email</h4>
        {verificationToken ? (
          <>
            <h5>{email?.toString()}</h5>
            <button className="btn btn--primary-color" onClick={submitHandler}>
              Xác thực
            </button>
          </>
        ) : (
          <div>
            Thư xác thực tài khoản đã được gửi đến email <b>{email?.toString()}</b>, hãy kiểm tra hộp thư của bạn.
          </div>
        )}
        {/* </form> */}
      </div>
    </>
  );
};

export default RegisterVerify;
