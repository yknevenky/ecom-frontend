import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getAllCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });
      }
    });
  };

  const preloadCategories = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log(data, "Hey hey");
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  //TODO: work on it
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    console.log("FORMDTA OF UPDATE PROD", formData);
    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      }
    );
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} updated successfully</h4>
    </div>
  );

  const createProductForm = () => (
    <form className="mx-5 mt-5" >
      <div className="form-group text-dark">
        <label className="form-label">Change photo</label>
        <input
          onChange={handleChange("photo")}
          type="file"
          name="photo"
          accept="image"
          className="form-control"
          placeholder="choose a file"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Product name</label>
        <input
          onChange={handleChange("name")}
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Category</label>
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Stock</label>
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <div className="row m-5">
        <div className="col-2">
          <button
            type="submit"
            onClick={onSubmit}
            className="btn btn-warning mr-3"
          >
            Update Product
          </button>
        </div>
        <div className="col-8"></div>
        <div className="col-2">
          <Link to="/admin/dashboard" className="btn btn-secondary">
            Admin Home
          </Link>
        </div>
      </div>
    </form>
  );

  return (
    <Base
      title="Update the product here"
      description="Update by entering the changes"
      className="container rounded bg-white px-4 py-2"
    >
      {successMessage()}
      {createProductForm()}
    </Base>
  );
};

export default UpdateProduct;
