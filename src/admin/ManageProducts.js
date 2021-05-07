import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllProducts()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };
  return (
    <Base title="Welcome admin" description="Manage products here" className="bg-white rounded container py-3">
      <Link className="btn btn-info mb-3" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h2 className="mb-4">All products:</h2>
      <div className="list-group">
        <div className="list-group-item">
          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center text-dark p-2">
                <div className="col-1 text-primary">
                  <h3>{index + 1} .</h3>
                </div>
                <div className="col-7">
                  <h3 className="text-left">{product.name}</h3>
                </div>
                <div className="col-2">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    Update
                  </Link>
                </div>
                <div className="col-2">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
