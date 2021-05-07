import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategoryById, updateCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateCategory = ({ match }) => {
  const [category, setCategory] = useState({
    categoryName: "",
    success: false,
    formData: ""
  });
  const { user, token } = isAuthenticated();
  const { categoryName, success, formData } = category;

  const preload = (catId) => {
    getCategoryById(catId)
      .then((res) => {
          console.log(res, "hihihihih")
        setCategory({
            ...category,
          categoryName: res.name,
         formData: new FormData()
        });
        console.log("After", formData)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload(match.params.categoryId);
    return () => {
        return console.log(formData, "hey heyhow")
    }
  }, []);

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: success ? "" : "none" }}
    >
      <h4> updated successfully</h4>
    </div>
  );

  const catChangeHandler = (event) => {
    formData.set("name",event.target.value)
    console.log("Get name",formData.get("name"))
    setCategory({
      ...category,
      categoryName: event.target.value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    formData.set("_id", match.params.categoryId)
    updateCategory(user._id, token, match.params.categoryId,formData)
      .then((res) => {
        setCategory({
          ...category,
          categoryName: "",
          success: true,
        });
      })
      .catch((err) => console.log(err));
  };

  const updateCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="form-label">Category name:</label>
          <input className="form-control" onChange={catChangeHandler} value={categoryName} />
        </div>
        <button className="btn btn-success" onClick={onSubmitHandler}>Update</button>
      </form>
    );
  };

  return (
    <Base
      title="Update a category"
      description="update a category"
      className="container bg-white p-4"

    >
      
          {successMessage()}
          {updateCategoryForm()}
       
    </Base>
  );
};

export default UpdateCategory;
