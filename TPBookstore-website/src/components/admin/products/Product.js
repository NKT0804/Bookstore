import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProductAdmin, hiddenProductAdmin } from "../../../Redux/Actions/productActions";
import Rating from "../../product/Rating";
import formatCash from "../../../utils/formatCash";
import Modal from "../../base/modal/Modal";

const Product = (props) => {
  const { products, preIndex } = props;
  const [productIdDelete, setProductIdDelete] = useState("");
  const [productIdHidden, setProductIdHidden] = useState("");
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteProductAdmin(productIdDelete));
  };
  const hiddenHandler = () => {
    dispatch(hiddenProductAdmin(productIdHidden));
  };

  return (
    <>
      <Modal
        modalTitle={"Xóa sản phẩm"}
        modalBody={"Bạn có chắc muốn xóa sản phẩm này?"}
        btnTitle={"Xóa"}
        btnType={"delete"}
        handler={deleteHandler}
      />
      {/* <Modal
        modalTitle={"Ẩn sản phẩm"}
        modalBody={"Bạn có chắc muốn ẩn sản phẩm này?"}
        btnTitle={"Ẩn sản phẩm"}
        btnType={"delete"}
        handler={hiddenHandler}
      /> */}
      {products?.map((product, index) => (
        <>
          <div className="mobile-header row col-md-12 col-sm-6 col-lg-3 mb-3">
            <div className="row col-md-6 d-flex">
              <div className="card card-product-grid shadow-sm">
                <Link to="#" className="img-wrap">
                  <img src={product.image} alt="Product" />
                </Link>
                <div className="row col-12 info-wrap">
                  <div className="col-9">
                    <Link to="#" className="title text-truncate">
                      {product.name}
                    </Link>
                    <div className="price mb-2">${product.price}</div>
                    <Rating value={product.rating} text={`(${product.numReviews})`} />
                  </div>
                  <div className="row col-2">
                    <Link
                      to={`/admin/product/${product._id}/edit`}
                      className="col-12 btn btn-sm btn-outline-success p-2 pb-3 col-md-6 btn-item-product"
                    >
                      <i className="fas fa-pen"></i>
                    </Link>
                    <Link className="text-center" to="#" data-toggle="modal" data-target="#exampleModalCenter">
                      <i
                        className="text-danger fas fa-trash-alt col-12 btn btn-sm btn-outline-danger p-2 pb-3 col-md-6 btn-item-product"
                        onClick={() => setProductIdDelete(product._id)}
                      ></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {product.isDisabled ? (
            <tr className="pc-header status-disabled">
              <td>{preIndex + index + 1}</td>
              <td>
                <img style={{ maxWidth: "70px", minWidth: "70px" }} src={product?.image} alt={product?.name} />
              </td>
              <td>
                <b alt={product?.name}>
                  {`${product?.name.lenght}>=25` ? `${product?.name.slice(0, 25)}...` : `${product?.name}`}
                </b>
              </td>
              <td>
                <Rating value={product.rating} text={`(${product.numReviews})`} />
              </td>
              <td>
                <b>{product?.category.name}</b>
              </td>
              <td>
                <b>{formatCash(product?.priceSale)}</b>
              </td>
              <td>
                <b>{product?.countInStock}</b>
              </td>
              <td>
                <b>{product?.totalSales}</b>
              </td>
              <td className="text-end">
                <div className="dropdown">
                  <div className="text-center">
                    <Link title="Đang bị ẩn" target="_blank">
                      <i class="fas fa-eye-slash"></i>
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link className="text-warning p-md-2" to={`/admin/product/${product._id}/edit`}>
                      <i className="fas fa-edit"></i>
                    </Link>
                    <Link className="" data-toggle="modal" data-target="#exampleModalCenter">
                      <i
                        class="fas fa-trash-alt edit__products text-danger"
                        onClick={() => setProductIdDelete(product._id)}
                      ></i>
                    </Link>
                  </div>
                  <div className="dropdown-menu"></div>
                </div>
              </td>
            </tr>
          ) : (
            <tr className="pc-header">
              <td>{preIndex + index + 1}</td>
              <td>
                <img style={{ maxWidth: "70px", minWidth: "70px" }} src={product?.image} alt={product?.name} />
              </td>
              <td>
                <b alt={product?.name}>
                  {`${product?.name.lenght}>=25` ? `${product?.name.slice(0, 25)}...` : `${product?.name}`}
                </b>
              </td>
              <td>
                <Rating value={product.rating} text={`(${product.numReviews})`} />
              </td>
              <td>
                <b>{product?.category.name}</b>
              </td>
              <td>
                <b>{formatCash(product?.priceSale)}</b>
              </td>
              <td>
                <b>{product?.countInStock}</b>
              </td>
              <td>
                <b>{product?.totalSales}</b>
              </td>
              <td className="text-end">
                <div className="dropdown">
                  <div className="text-center">
                    <Link className="text-success">
                      <i className="fas fa-eye" onClick={hiddenHandler}></i>
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link
                      className="text-warning p-md-2"
                      to={`/admin/product/${product._id}/edit`}
                      title="Cập nhật"
                      target="_blank"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                    <Link data-toggle="modal" data-target="#exampleModalCenter" title="Xoá" target="_blank">
                      <i
                        class="fas fa-trash-alt edit__products text-danger"
                        onClick={() => setProductIdDelete(product._id)}
                      ></i>
                    </Link>
                  </div>

                  <div className="dropdown-menu"></div>
                </div>
              </td>
            </tr>
          )}
        </>
      ))}
    </>
  );
};

export default Product;
