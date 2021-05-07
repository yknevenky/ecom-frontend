import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className=" container rounded bg-light">
      <h1 className="text-dark text-left p-5">T shirts</h1>
      <div className="row container bg-white rounded text-center">
       
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </Base>
  );
}
