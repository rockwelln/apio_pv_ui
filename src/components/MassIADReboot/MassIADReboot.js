import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Table from "react-bootstrap/lib/Table";
import Checkbox from "react-bootstrap/lib/Checkbox";
import FormControl from "react-bootstrap/lib/FormControl";
import Panel from "react-bootstrap/lib/Panel";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import { fetchGetSearchIADs, clearSearchedIADs } from "../../store/actions";

import { FormattedMessage } from "react-intl";

import { removeEmpty } from "../remuveEmptyInObject";

const MassIADReboot = props => {
  const [allIads, setAllIads] = useState(false);
  const [enterpriseId, setEnterpriseId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [buttonName, setButtonName] = useState("Search");
  const [disableSearchButton, setDisableSearchButton] = useState(false);
  const [IADs, setIADs] = useState([]);
  const propsSearchedIADs = useSelector(state => state.searchedIADs);
  const dispatch = useDispatch();

  const handleSearchButton = newButtomName => {
    if (buttonName === "Search") {
      const data = {
        allIADs: allIads ? allIads : "",
        insensitiveTenantIdEquals: enterpriseId,
        insensitiveGroupIdEquals: groupId,
        sensitiveDeviceTypeEquals: deviceType
      };
      const clearData = removeEmpty(data);
      const querySearch = Object.keys(clearData).reduce(
        (query, key) => (query = `${query}${key}=${clearData[key]}`),
        ""
      );
      dispatch(fetchGetSearchIADs(querySearch));
      setButtonName(newButtomName);
      setDisableSearchButton(true);
      return;
    }
    setButtonName(newButtomName);
    dispatch(clearSearchedIADs());
  };

  useEffect(() => {
    setIADs(propsSearchedIADs);
    setDisableSearchButton(false);
  }, [propsSearchedIADs.length]);

  return (
    <Panel.Body>
      <Row>
        <Col md={6}>
          <Row>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}>
                <ControlLabel>
                  <FormattedMessage id="all" defaultMessage="All" />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-66"}>
                <Checkbox
                  value={allIads}
                  disabled={!!enterpriseId || !!groupId || !!deviceType} //expects only boolean value
                  onChange={e => setAllIads(e.target.checked)}
                />
              </div>
            </Col>
          </Row>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}>
                <ControlLabel>
                  <FormattedMessage
                    id="enterpriseId"
                    defaultMessage="Enterprise ID"
                  />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  type="text"
                  disabled={allIads || groupId || deviceType}
                  value={enterpriseId}
                  onChange={e => setEnterpriseId(e.target.value)}
                />
              </div>
            </Col>
          </Row>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}>
                <ControlLabel>
                  <FormattedMessage id="groupId" defaultMessage="Group ID" />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  type="text"
                  disabled={allIads || enterpriseId || deviceType}
                  value={groupId}
                  onChange={e => setGroupId(e.target.value)}
                />
              </div>
            </Col>
          </Row>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}>
                <ControlLabel>
                  <FormattedMessage
                    id="deviceType"
                    defaultMessage="Device Type"
                  />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  type="text"
                  disabled={allIads || enterpriseId || groupId}
                  value={deviceType}
                  onChange={e => setDeviceType(e.target.value)}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="button-row">
                <div className="pull-right">
                  <Button
                    onClick={() => {
                      buttonName === "Search"
                        ? handleSearchButton("Clear")
                        : handleSearchButton("Search");
                    }}
                    disabled={disableSearchButton}
                    type="submit"
                    className="btn-primary"
                  >
                    <Glyphicon glyph="glyphicon glyphicon-ok" /> {buttonName}
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={6}>Right side </Col>
      </Row>
    </Panel.Body>
  );
};

export default withRouter(MassIADReboot);
