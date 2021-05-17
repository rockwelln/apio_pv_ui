import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Panel from "react-bootstrap/lib/Panel";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import { fetchPostCreateTenant, clearCreatedTenant } from "../../store/actions";
import { removeEmpty } from "../remuveEmptyInObject";
import { FormattedMessage } from "react-intl";

const AddEntreprises = (props) => {
  const [entrerpriseName, setEntrerpriseName] = useState("");
  const [tinaId, setTinaId] = useState("");
  const [buttonName, setButtonName] = useState("Create");
  const createdTenant = useSelector((state) => state.createdTenant);
  const dispatch = useDispatch();

  useEffect(() => {
    if (createdTenant.tenantId) {
      props.history.push(
        `/provisioning/${props.match.params.gwName}/tenants/${createdTenant.tenantId}`
      );
    }
  }, [createdTenant.tenantId]);

  useEffect(() => {
    return () => {
      dispatch(clearCreatedTenant());
    };
  }, []);

  const cancelClick = () => {
    props.history.push(`/provisioning/${props.match.params.gwName}/tenants`);
  };

  const addEntreprise = () => {
    const data = {
      name: entrerpriseName,
      tina_id: tinaId,
    };
    const clearData = removeEmpty(data);
    setButtonName("Creating...");
    dispatch(fetchPostCreateTenant(clearData));
    setButtonName("Create");
  };

  return (
    <React.Fragment>
      <Panel className={"margin-0"}>
        <Panel.Heading>
          <div className={"header"}>
            <FormattedMessage
              id="addEnterprises"
              defaultMessage="ADD ENTERPRISES"
            />

            <Button
              className={"margin-left-1 btn-danger"}
              onClick={cancelClick}
            >
              <FormattedMessage id="cancel" defaultMessage="Cancel" />
            </Button>
          </div>
          <div>
            <FormattedMessage
              id="addEnterprisesInfo"
              defaultMessage="Enter your enterprise name and customer ID. Your enterprise ID will be auto-generated"
            />
          </div>
        </Panel.Heading>
        <Panel.Body>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                <FormattedMessage
                  id="enterpriseId"
                  defaultMessage="Enterprise ID"
                />
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl type="text" disabled />
              </div>
            </Col>
          </Row>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                <FormattedMessage
                  id="customerName"
                  defaultMessage="Customer name"
                />
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  type="text"
                  value={entrerpriseName}
                  placeholder={"Customer name"}
                  onChange={(e) => setEntrerpriseName(e.target.value)}
                />
              </div>
            </Col>
          </Row>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                <FormattedMessage
                  id="customerId"
                  defaultMessage="Customer ID"
                />
                {"\u002a"}
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  type="text"
                  value={tinaId}
                  placeholder={"Customer ID"}
                  onChange={(e) => setTinaId(e.target.value)}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="button-row">
                <div className="pull-right">
                  <Button
                    onClick={() => addEntreprise()}
                    type="submit"
                    className="btn-primary"
                    disabled={!tinaId || buttonName === "Creating..."}
                  >
                    <Glyphicon glyph="glyphicon glyphicon-ok" /> {buttonName}
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Panel.Body>
      </Panel>
    </React.Fragment>
  );
};

export default withRouter(AddEntreprises);
