import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

 
  const handleChange = event => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to create category</h4>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="h2">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
       <div className="row m-5">
        <div className="col-2">
          <button
            type="submit"
            onClick={onSubmit}
            className="btn btn-warning mr-3"
          >
            Add Category
          </button>
        </div>
        <div className="col-8"></div>
        <div className="col-2">
          <Link to="/admin/dashboard" className="btn btn-secondary">
            Admin Home
          </Link>
        </div>
      </div>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new tshirts"
      className="container rounded p-2 bg-white"
    >
     

      <div className="row pt-4">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
