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

      <footer class="page-footer bg-success text-white font-small blue pt-4 mt-5">
        <div class="container-fluid text-center text-md-left">
          <div class="row">
            <div class="col-md-6 mt-md-0 mt-3">
              <h5 class="text-uppercase">The Tshirt store</h5>
              <p>The go to place for amazing T shirts.</p>
            </div>

            <hr class="clearfix w-100 d-md-none pb-3" />
            <div class="col-md-3 mb-md-0 mb-3">
              <h5 class="text-uppercase">Links</h5>

              <ul class="list-unstyled">
                <p>Email</p>
              </ul>
            </div>

            <div class="col-md-3 mb-md-0 mb-3">
              <h5 class="text-uppercase">Links</h5>

              <ul class="list-unstyled">
                <p>Contact No</p>
              </ul>
            </div>
          </div>
        </div>

        <div class="footer-copyright text-center py-3">
          © 2021 Copyright  
          <Link to="/" className="text-warning">  The T'shirt store</Link>
        </div>
      </footer>
    </div>
  );
};

export default Base;
