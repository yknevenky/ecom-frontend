import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import BrainTreePayment from "./BrainTreePayment";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  return (
    <Base
      title="Cart Page"
      description="Ready to checkout"
      className="py-5 px-4 bg-white text-dark rounded"
    >
      <div className="row">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h4 className="text-left">Cart is empty</h4>
          )}
        </div>
        <div className="col-6">
          <BrainTreePayment products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
