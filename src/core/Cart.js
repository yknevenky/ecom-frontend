import React, { useState, useEffect } from "react";
import "../styles.css";
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
      <React.Fragment>
        <h1 className="ml-3 mb-5 d-block">All your products</h1>
        <div className="row">
          {console.log(products, "in cart card")}
          {products.length > 0 ? products.map((product, index) => (
            <div className="col-3">
              <Card
                key={index}
                product={product}
                removeFromCart={true}
                addtoCart={false}
                setReload={setReload}
                reload={reload}
              />
            </div>
          )) : <h1 className="display-5 text-dark">No items in cart</h1>}
        </div>
      </React.Fragment>
    );
  };

  return (
    <Base
      title="Cart Page"
      description="Ready to checkout"
      className="py-5 px-4 bg-white text-dark rounded container"
    >
      
        {products.length > 0 ? (
          loadAllProducts(products)
        ) : (
          <h4 className="text-left">Cart is empty</h4>
        )}
      

      <div className="card m-5 jumbotron bg-light p-5">
        <h1 className="mb-5">CHECK OUT</h1>

        <BrainTreePayment products={products} setReload={setReload} />
      </div>
    </Base>
  );
};

export default Cart;
