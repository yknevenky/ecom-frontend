import React from "react";
import Menu from "./Menu";

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
      <footer className="footer bg-dark mr-auto pt-5">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>If you got any questions, feel free to reach us!</h4>
          <button className="btm btn-warning btn-lg">Contact us</button>
        </div>
        <div className="container">
          <span className="text-muted">Amazing MERN bootcamp</span>
        </div>
      </footer>
    </div>
  );
};

export default Base;