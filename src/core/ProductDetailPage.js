import React, { useEffect, useState } from "react";
import { API } from "../backend";
import ImageHelper from "./helper/ImageHelper";
import Base from "./Base";
import { addItemToCart } from "./helper/cartHelper";

const ProductDetailPage = ({ match }) => {
  const [prodDetails, setProdDetails] = useState({
    productId: "",
    productCat: "",
    productStock: "",
    productName: "",
    productDesc: "",
    productPrice: "",
    productImg: "",
  });

  const [redirect, setRedirect] = useState(false);

  const addToCart = () => {
    addItemToCart(prodDetails, () => setRedirect(true));
  };

  const getProduct = (prodId) => {
    return fetch(`${API}/product/${prodId}`, { method: "GET" })
      .then((res) => res.json())
      .catch((err) => err);
  };

  useEffect(() => {
    getProduct(match.params.productId)
      .then((product) => {
        console.log(product);
        setProdDetails({
          productCat: product.category.name,
          productDesc: product.description,
          productName: product.name,
          productPrice: product.price,
          productStock: product.stock,
          productImg: product.photo,
          productId: product._id,
        });
      })
      .catch((err) => err);
  }, []);
  return (
    <Base
      title="Product Details Page"
      description=""
      className="container bg-white p-5 rounded"
    >
      <div className="card rounded p-5 m-3">
        <div className="row">
          <div className="col">
            <h1>{prodDetails.productName}</h1>
            <ImageHelper product={{ _id: prodDetails.productId }} />
            <div className="row text-center">
              <div className="col m-1">
                <div className="btn btn-lg btn-primary">
                  Price : {prodDetails.productPrice}
                </div>
              </div>
              <div className="col m-1">
                <div className="btn btn-lg btn-warning text-white">
                  Stock : {prodDetails.productStock}
                </div>
              </div>
            </div>
          </div>
          <div className="col mt-5">
            <div>
              <h4>Product description</h4>
              <h6 className="text-danger">
                Category:{" "}
                <span className="badge badge-dark">
                  {prodDetails.productCat}
                </span>
              </h6>
              <p> {`\t${prodDetails.productDesc}`}</p>
            </div>
            <div
              className="btn d-block btn-lg btn-success my-5"
              onClick={addToCart}
            >
              Add to cart
            </div>

            <div className="btn d-block btn-lg btn-primary my-5">Buy Now</div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default ProductDetailPage;
