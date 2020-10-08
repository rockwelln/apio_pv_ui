import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchGetGlobalSearchNumbers,
  clearSearchNumber
} from "../../store/actions";

import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";

import Sidebar from "../../common/Sidebar";
import Title from "../../common/Title";

import BWKSLicenses from "./BWKSLicenses";

const BWKSLicensesPage = () => {
  const [searchNumber, setSearchNumber] = useState("");

  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Row className={"margin-bottom-4"}>
        <Title />
      </Row>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10} className={"padding-left-3 padding-right-3"}>
          <Row className={"panel panel-default"}>
            <BWKSLicenses />
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BWKSLicensesPage;
