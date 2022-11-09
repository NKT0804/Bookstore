import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductsAdminAll } from "../../../Redux/Actions/productActions";
import formatCash from "../../../utils/formatCash";
import { listUser } from "../../../Redux/Actions/userActions";

const TopTotal = (props) => {
  const dispatch = useDispatch();
  const productListAdminAll = useSelector((state) => state.productListAdminAll);
  const { products } = productListAdminAll;

  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  useEffect(() => {
    dispatch(listProductsAdminAll());
    dispatch(listUser());
  }, [dispatch]);

  const { orders } = props;
  let totalSale = 0;
  if (orders) {
    orders.map((order) => (order.isPaid === true ? (totalSale = totalSale + order.totalPrice) : null));
  }
  return (
    <div className="row">
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <i className="text-primary fas fa-usd-circle"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Tổng doanh thu</h6> <span>{formatCash(totalSale)}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-success">
              <i className="text-success fas fa-bags-shopping"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Tổng đơn hàng</h6>
              {orders ? <span>{orders.length}</span> : <span>0</span>}
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-warning">
              <i className="text-warning fas fa-shopping-basket"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Tổng sản phẩm</h6>
              <span>{products?.total ?? 0}</span>
            </div>
          </article>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <i className="text-primary fas fa-user"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Tổng tài khoản</h6>
              <span>{users?.length ?? 0}</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default TopTotal;
