import React from "react";

import { withRouter } from "react-router";

import Breadcrumb from "react-bootstrap/lib/Breadcrumb";
import { Link } from "react-router-dom";

import "./styles.css";

const convertCrumb = crumb => {
  if (crumb === "broadsoft_xsp1_as1") {
    return "broadsoft XSP 1 / AS 1";
  }
  return crumb;
};

const linkByCrumb = (item, lastItem, i, path) => {
  const crumb = convertCrumb(item);
  if (crumb === "tenants" && !lastItem.includes(crumb)) {
    return <Link to={"/provisioning/broadsoft_xsp1_as1/tenants"}>{crumb}</Link>;
  }
  if (lastItem.includes(crumb) && path[i - 1] === "tenants") {
    return (
      <Link to={`/provisioning/broadsoft_xsp1_as1/tenants/${item}`}>
        {crumb}
      </Link>
    );
  }
  return crumb;
};

const BreadcrumbComponent = ({ location }) => {
  const path = location.pathname.split("/").slice(1);
  const lastItem = path.slice(-1);
  return (
    <Breadcrumb>
      {path.map((item, i) => (
        <Breadcrumb.Item active key={String(i)}>
          {linkByCrumb(item, lastItem, i, path)}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default withRouter(BreadcrumbComponent);
