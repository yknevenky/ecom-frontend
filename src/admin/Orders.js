import React from "react";
import Base from "../core/Base";
const Orders = () => {
  return (
    <Base
      title="Orders section"
      description="All your orders are listed here!!"
      className="container rounded bg-white p-4"
    >
      <div>
        <h3>Orders</h3>
        <p>Currently there are no orders</p>
      </div>
    </Base>
  );
};

export default Orders;
