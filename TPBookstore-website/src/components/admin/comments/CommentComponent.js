import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { listCommentProductsAdminAll } from "../../../Redux/Actions/productActions";
import { useEffect } from "react";

const CommentComponent = () => {
  const dispatch = useDispatch();
  const getAllComment = useSelector((state) => state.productListCommentAdmin);
  const { comments } = getAllComment;
  const onAvatarLoadError = (e) => {
    e.currentTarget.onerror = null; // prevents looping
    e.currentTarget.src = "../images/avatar/default.png";
  };

  const loadDataComment = useCallback(() => {
    dispatch(listCommentProductsAdminAll());
  }, [dispatch]);

  useEffect(() => loadDataComment(), [loadDataComment]);

  return (
    <div className="wrap-comment wrap-comment-admin mt-4 p-3">
      <h3>BÌNH LUẬN KHÁCH HÀNG</h3>
      <div className="list-comment rounded mt-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Stt</th>
              <th>Sản phẩm</th>
              <th>Nội dung bình luận</th>
              <th>Khách hàng</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {comments?.length > 0 ? (
              comments?.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link className="link" to={`/product/${item.product.slug}`}>
                        {item.product.name}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/product/${item.product.slug}`}>{item.content}</Link>
                    </td>
                    <td>
                      {/* <img
                        className="img-xs rounded-circle p-1"
                        src={item.user.avatarUrl}
                        onError={onAvatarLoadError}
                        alt="User avatar"
                      /> */}
                      <b>{item.user.name.length >= 15 ? `${item.user.name.slice(0, 15)}...` : `${item.user.name}`}</b>
                    </td>
                    <td>{moment(item.createdAt).format("LT") + ", " + moment(item.createdAt).format("DD/MM/yyyy")}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="p-2 bg-light border">
                  Không có bình luận nào
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CommentComponent;
