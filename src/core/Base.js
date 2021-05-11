import React from "react";
import Menu from "./Menu";
import { Link } from "react-router-dom";
const Base = ({
  title = "My title",
  description = "My description",
  className = "bg-dark text-white px-4",
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="bg-dark text-white text-center py-5">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>

      <footer className="page-footer bg-success text-white font-small blue pt-4 mt-5">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <h5 className="text-uppercase">The Tshirt store</h5>
              <p>The go to place for amazing T shirts.</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-3" />
            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase">Links</h5>

              <ul className="list-unstyled">
                <p>Email</p>
              </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase">Links</h5>

              <ul className="list-unstyled">
                <p>Contact No</p>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-copyright text-center py-3">
          © 2021 Copyright  
          <Link to="/" className="text-warning">  The T'shirt store</Link>
        </div>
      </footer>
    </div>
  );
};

export default Base;
