import React from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { firstName, email, role },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card rounded">
        <div className="card-header text h4">Admin Navigation</div>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link text-primary" to="/admin/create/category">
              Create category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-primary" to="/admin/categories">
              Manage categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-primary" to="/admin/create/product">
              Create product
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-primary" to="/admin/products">
              Manage products
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-primary" to="/admin/orders">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4 rounded">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span>
            {firstName}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span>
            {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger mr-2">Admin area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="AdminDashboard page"
      description="Manage all your products here"
      className="container rounded bg-light p-4"
    >
      <div className="row rounded">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
