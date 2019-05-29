import React from "react";

import { withRouter } from "react-router";

import Breadcrumb from "react-bootstrap/lib/Breadcrumb";
import { Link } from "react-router-dom";

import "./styles.css";

const linkByCrumb = (item, lastItem) => {
  if (item === "tenants" && !lastItem.includes(item)) {
    return <Link to={"/data/tenants"}>{item}</Link>;
  }
  return item;
};

const BreadcrumbComponent = ({ location }) => {
  const path = location.pathname.split("/").slice(1);
  const lastItem = path.slice(-1);
  return (
    <Breadcrumb>
      {path.map((item, i) => (
        <Breadcrumb.Item active key={String(i)}>
          {linkByCrumb(item, lastItem)}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default withRouter(BreadcrumbComponent);
