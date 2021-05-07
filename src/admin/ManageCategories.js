import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { deleteCategory, getAllCategories } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllCategories().then((data) => {
      console.log("categories", data);
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <Link className="btn btn-warning mb-3" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h2 className="mb-4">All Categories:</h2>
      <div className="list-group">
        <div className="list-group-item">
          {categories.map((category, index) => {
            return (
              <div
                key={category.name}
                className="row text-center text-dark p-2 "
              >
                <div className="col-1 text-primary">
                  <h3>{index + 1} .</h3>
                </div>
                <div className="col-7">
                  <h3 className="text-left">{category.name}</h3>
                </div>

                <div className="col-2">
                  <Link
                    className="btn btn-success"
                    to={`/admin/category/update/${category._id}`}
                  >
                    Update
                  </Link>
                </div>
                <div className="col-2">
                  <button
                    onClick={() => {
                      deleteThisCategory(category._id);
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

export default ManageCategories;
