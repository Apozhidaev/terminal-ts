import React, { useState } from "react";
import { Link } from "react-router-dom";
import cx from "classnames";
import "./styles.css";
import Archive from "./Archive";

const Header = () => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-faded">
        <Link className="navbar-brand" to="/" onClick={() => setCollapsed(false)}>TERMINAL</Link>
        <button
          type="button"
          className={cx("navbar-toggler", collapsed && "collapsed")}
          onClick={() => setCollapsed(!collapsed)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={cx("navbar-collapse", "collapse", !collapsed && "show")}>
          <ul className="navbar-nav mr-auto" />
          <div className="navbar-nav">
            <Archive />
            <Link className="nav-item nav-link" to="/settings" onClick={() => setCollapsed(false)}>
              SETTINGS
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
