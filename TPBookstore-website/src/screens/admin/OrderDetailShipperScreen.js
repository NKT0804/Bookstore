import React from "react";
import { Link } from "react-router-dom";
import Header from "./../../components/admin/Header";
import OrderDetailMain from "../../components/admin/orders/OrderDetailMain";

const OrderDetailShipperScreen = ({ match }) => {
  const orderId = match.params.id;
  return (
    <>
      <div className="shipper__order-header">
        <Link className="navbar-brand" to="/">
          <img className="img__logo" alt="logo" src="/images/logo.png" />
        </Link>
        <Header />
      </div>
      <OrderDetailMain orderId={orderId} />
    </>
  );
};

export default OrderDetailShipperScreen;
