import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getAllCategories, createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const AddProduct = () => {
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

  const preload = () => {
    getAllCategories().then((data) => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
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
    });
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
      <h4>{createdProduct} created successfully</h4>
    </div>
  );

  const createProductForm = () => (
    <form>
      <div className="form-group text-dark">
        <label className="form-label" for="photo">
          Add photo
        </label>

        <input
          onChange={handleChange("photo")}
          type="file"
          id="photo"
          name="photo"
          accept="image"
          placeholder="choose a file"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="form-label" for="name">
          Product name
        </label>
        <input
          onChange={handleChange("name")}
          name="name"
          id="name"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="form-label" for="description">
          Product description
        </label>
        <textarea
          onChange={handleChange("description")}
          name="description"
          id="description"
          className="form-control"
          value={description}
        />
      </div>
      <div className="form-group">
        <label className="form-label" for="price">
          Unit price
        </label>
        <input
          onChange={handleChange("price")}
          type="number"
          name="price"
          id="price"
          className="form-control"
          value={price}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Choose category</label>
        <select
          onChange={handleChange("category")}
          className="form-control"
          name="category"
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
        <label className="form-label" for="photo">
          Number in stock
        </label>
        <input
          onChange={handleChange("stock")}
          type="number"
          name="stock"
          className="form-control"
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
            Add Product
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
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container rounded bg-white p-4"
    >
      <div className="container px-5">
       
        {successMessage()}
        
        {createProductForm()}
      </div>
    </Base>
  );
};

export default AddProduct;
