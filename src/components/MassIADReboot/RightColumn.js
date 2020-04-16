import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Table from "react-bootstrap/lib/Table";
import Checkbox from "react-bootstrap/lib/Checkbox";
import FormControl from "react-bootstrap/lib/FormControl";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormGroup from "react-bootstrap/lib/FormGroup";
import HelpBlock from "react-bootstrap/lib/HelpBlock";

import TableOfTransferedIADs from "./TableOfTransferedIADs";
import RebootWindow from "./RebootWindow";

import { FormattedMessage } from "react-intl";

const RightColumn = () => {
  const [IADs, setIADs] = useState([]);
  const [manualIAD, setManualIAD] = useState("");
  const [errorIAD, setErrorIAD] = useState(null);
  const [showRebootWindow, setShowRebootWindow] = useState(false);

  const propsTransferedIADs = useSelector(state => state.transferedIADs);

  useEffect(() => {
    const newIADs = [...IADs];
    for (let i = 0; i < propsTransferedIADs.length; i++) {
      if (!newIADs.includes(propsTransferedIADs[i])) {
        newIADs.push(propsTransferedIADs[i]);
      }
    }
    setIADs(newIADs);
  }, [propsTransferedIADs.join()]);

  const handleClearIads = () => {
    setIADs([]);
  };

  const removeSingleIAD = iad => {
    const newIADs = [...IADs];
    const index = newIADs.indexOf(iad);
    newIADs.splice(index, 1);
    setIADs(newIADs);
  };

  const addIadToTable = () => {
    if (errorIAD || !manualIAD) {
      return;
    }
    const newIADs = [...IADs];
    if (!newIADs.includes(manualIAD)) {
      newIADs.push(manualIAD);
      setIADs(newIADs);
      return;
    }
    setErrorIAD("warning");
  };

  const validationIAD = () => {
    const regexIAD = /TG_ENT\d{7}GRP\d{2}-IAD\d{2}/;
    if (!manualIAD || regexIAD.test(manualIAD)) {
      return;
    }
    setErrorIAD("error");
  };

  const closeRebootWindow = () => {
    setShowRebootWindow(false);
  };

  return (
    <React.Fragment>
      <FormGroup controlId="errorIAD" validationState={errorIAD}>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              <ControlLabel>
                <FormattedMessage id="iad" defaultMessage="IAD" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                placeholder={"TG_ENTxxxxxxxGRPyy-IADzz"}
                type="text"
                value={manualIAD}
                onChange={e => {
                  setManualIAD(e.target.value);
                  setErrorIAD(null);
                }}
                onBlur={() => validationIAD()}
              />
            </div>
            <Button
              className="btn-primary"
              onClick={addIadToTable}
              //disabled={!manualIAD}
            >
              <FormattedMessage id="add" defaultMessage="Add" />
            </Button>
          </Col>
        </Row>
        {errorIAD && (
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}></div>
              <div className={"margin-right-1 flex-basis-66"}>
                <HelpBlock>
                  <FormattedMessage
                    id="errorIAD"
                    defaultMessage={
                      errorIAD === "error"
                        ? "IAD must be in format TG_ENTxxxxxxxGRPyy-IADzz"
                        : "IAD already includes in the list"
                    }
                  />
                </HelpBlock>
              </div>
            </Col>
          </Row>
        )}
      </FormGroup>
      {IADs.length ? (
        <React.Fragment>
          <Row className="margin-top-1">
            <Col md={12}>
              <Table>
                <thead>
                  <tr>
                    <th className={"no-wrap"}>
                      <FormattedMessage id="iad" defaultMessage="IAD" />
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {IADs.map(iad => (
                    <TableOfTransferedIADs
                      key={iad}
                      iad={iad}
                      removeSingleIAD={removeSingleIAD}
                    />
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="button-row">
                <div className="pull-right">
                  <Button
                    onClick={handleClearIads}
                    className="btn-primary margin-right-1"
                  >
                    <FormattedMessage id="clear" defaultMessage="Clear" />
                  </Button>
                  <Button
                    className="btn-primary"
                    onClick={() => setShowRebootWindow(true)}
                  >
                    <FormattedMessage id="reboot" defaultMessage="Reboot" />
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Row className={"margin-top-1"}>
            <Col md={12}>
              <FormattedMessage
                id="noTransferIADs"
                defaultMessage="At first you must transfer or manual add IADs"
              />
            </Col>
          </Row>
        </React.Fragment>
      )}
      <RebootWindow
        show={showRebootWindow}
        iads={IADs}
        onClose={closeRebootWindow}
      />
    </React.Fragment>
  );
};

export default withRouter(RightColumn);
