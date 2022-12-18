import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../../../Redux/Actions/userActions";
import Loading from "../../base/LoadingError/Loading";
import Message from "../../base/LoadingError/Error";
import PaginationAdmin from "../Home/PaginationAdmin";

const ManageAgent = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const { keyword, pageNumber } = props;
  const userList = useSelector((state) => state.userList);
  const { loading, error, users, page, pages, total } = userList;

  const [status, setStatus] = useState("");
  const [limit, setLimit] = useState(8);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  const onAvatarLoadError = (e) => {
    e.currentTarget.onerror = null; // prevents looping
    e.currentTarget.src = `${window.location.origin}/images/avatar/default.png`;
  };
  useEffect(() => {
    dispatch(listUser(keyword, status, limit, pageNumber));
  }, [dispatch, keyword, status, limit, pageNumber]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      history.push(`/admin/staff?q=${searchKeyword}`);
    } else {
      history.push("/admin/staff");
    }
  };
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Tài khoản nhân viên</h2>
        <Link to="/admin/createUser">
          <button className="btn btn-primary">Tạo tài khoản</button>
        </Link>
      </div>

      <div className="card mb-4">
        <header className="card-header" style={{ backgroundColor: "#fff" }}>
          <h5 className="title__top" style={{ top: "-48px" }}>
            Tổng tài khoản:&nbsp;{total}
          </h5>
          <div className="row gx-3">
            <form onSubmit={submitHandler} className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Tìm kiếm khách hàng"
                className="form-control "
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </form>
            <div className="col-lg-2 col-6 mx-2 col-md-3">
              <select className="form-select" value={limit} onChange={(e) => setLimit(e.target.value)}>
                <option value={"8"}>8 tài khoản</option>
                <option value={"12"}>12 tài khoản</option>
                <option value={"16"}>16 tài khoản</option>
                <option value={"20"}>20 tài khoản</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value={""}>Tất cả</option>
                <option value={"is_active"}>Đang hoạt động</option>
                <option value={"locked"}>Đang bị khóa</option>
              </select>
            </div>
          </div>
        </header>

        {/* Card */}
        <div className="card-body">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              <table className="table">
                <thead className="">
                  <tr className="text-center">
                    <th scope="col">Mã nhân viên</th>
                    <th scope="col">Tên nhân viên</th>
                    <th scope="col">Email</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Chức vụ</th>
                    <th scope="col">Ngày vào làm</th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((user) => (
                      <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.role}</td>
                        <td>{user.createdAt.length > 11 ? user.createdAt.slice(0, 10) : user.createdAt}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          <PaginationAdmin page={page} pages={pages} keyword={keyword ? keyword : ""} basePath={"/admin/staff"} />
        </div>
      </div>
    </section>
  );
};

export default ManageAgent;
