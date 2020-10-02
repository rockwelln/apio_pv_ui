import React from "react";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Panel from "react-bootstrap/lib/Panel";
import Alert from "react-bootstrap/lib/Alert";

import LoginForm from "./LoginForm";
import apio_logo from "../../images/logo.png";

const LoginPage = ({ updateToken, error_msg, standby_alert }) => (
  <React.Fragment>
    <Row style={{ height: "20px", display: "block" }} />
    <Row style={{ height: "100%", display: "block" }}>
      <Col xsOffset={1} xs={10} mdOffset={4} md={4}>
        {standby_alert}
        <Panel>
          <Panel.Body>
            <Row>
              <Col xsOffset={3} xs={6} mdOffset={3} md={7}>
                <img
                  src={apio_logo}
                  width={"100%"}
                  height={"100%"}
                  style={{ padding: 0 }}
                  alt="apio"
                />
              </Col>
            </Row>
            <Row>
              <Col xsOffset={1} xs={10} mdOffset={0} md={12}>
                {error_msg && (
                  <Alert bsStyle="danger">
                    <p>{error_msg}</p>
                  </Alert>
                )}
                {/* <LoginOpenIdConnect /> */}
                <hr />
                <LoginForm updateToken={updateToken} />
              </Col>
            </Row>
          </Panel.Body>
        </Panel>
      </Col>
    </Row>
  </React.Fragment>
);

export default LoginPage;
