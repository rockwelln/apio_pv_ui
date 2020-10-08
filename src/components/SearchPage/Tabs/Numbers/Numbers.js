import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import Panel from "react-bootstrap/lib/Panel";
import Table from "react-bootstrap/lib/Table";

import { FormattedMessage } from "react-intl";

import {
  fetchGetGlobalSearchNumbers,
  clearSearchNumber
} from "../../../../store/actions";

const Numbers = () => {
  const [searchNumber, setSearchNumber] = useState("");
  const [buttonName, setButtonName] = useState("Search");
  const [disabledButton, setDisabledButton] = useState(false);

  const propsSearchedNumber = useSelector(state => state.globalSearchNumber);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(clearSearchNumber());
  }, []);

  const onEnterSearch = e => {
    if (e.key === "Enter" && searchNumber) {
      search();
    }
  };

  const search = () => {
    setButtonName("Searching...");
    setDisabledButton(true);
    dispatch(fetchGetGlobalSearchNumbers(searchNumber)).then(() => {
      setButtonName("Search");
      setDisabledButton(false);
    });
  };

  return (
    <React.Fragment>
      <Panel className={"margin-top-1"} defaultExpanded>
        <Panel.Heading toggle>
          <Panel.Title toggle>Search criteria</Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  Phone number:
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={searchNumber}
                    onChange={e => setSearchNumber(e.target.value)}
                    onKeyPress={e => onEnterSearch(e)}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}></div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <HelpBlock>
                    Please use the whole phone number for search
                  </HelpBlock>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12}>
                <div className="button-row">
                  <div className="pull-right">
                    <Button
                      className={"btn-primary"}
                      onClick={search}
                      disabled={disabledButton || !searchNumber}
                    >
                      {buttonName}
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
      <Panel className={"margin-top-1"}>
        <Panel.Heading>Search results</Panel.Heading>
        <Panel.Body>
          <Row>
            <Col md={12}>
              {propsSearchedNumber && (
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>
                        <FormattedMessage
                          id="tenantId"
                          defaultMessage="Tenant ID"
                        />
                      </th>
                      <th>
                        <FormattedMessage
                          id="groupId"
                          defaultMessage="Group ID"
                        />
                      </th>
                      <th>
                        <FormattedMessage
                          id="userId"
                          defaultMessage="User ID"
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Link
                          to={`/provisioning/${params.gwName}/tenants/${propsSearchedNumber.tenantId}`}
                        >
                          {propsSearchedNumber.tenantId}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/provisioning/${params.gwName}/tenants/${propsSearchedNumber.tenantId}/groups/${propsSearchedNumber.groupId}`}
                        >
                          {propsSearchedNumber.groupId}
                        </Link>
                      </td>
                      <td>
                        {/* <Link
                          to={`/provisioning/${params.gwName}/tenants/${propsSearchedNumber.tenantId}/groups/${propsSearchedNumber.groupId}/users/${propsSearchedNumber.userId}`}
                        > */}
                        {propsSearchedNumber.userId}
                        {/* </Link> */}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>
        </Panel.Body>
      </Panel>
    </React.Fragment>
  );
};

export default Numbers;
