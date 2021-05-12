import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    try {
      getProducts().then((data) => {
        console.log(data, "hi");
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data);
        }
      });
    } catch (error) {
      console.log("hahaha");
      setProducts([]);
    }
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className=" container rounded bg-light">
        <h1 className="text-dark text-left p-5">T shirts <span className="text-primary">&gt;</span></h1>
        <div className="row container bg-white rounded text-center">
          <div className="row">
            {products.length > 0 ? products.map((product, index) => {
              return (
                <div key={index} className="col-4">
                 
                    <Card product={product} />
                  
                </div>
              );
            }) : <h1 className="text-dark p-5 text-center display-5">No products</h1>}
          </div>
        </div>
      </div>
    </Base>
  );
}
