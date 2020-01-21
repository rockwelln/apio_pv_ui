import React, { useState } from "react";
import { withRouter } from "react-router";
import { useDispatch } from "react-redux";

import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import ControlLabel from "react-bootstrap/lib/ControlLabel";

import { FormattedMessage } from "react-intl";
import { removeEmpty } from "../remuveEmptyInObject";

import { fetchPutMassIADsReboot } from "../../store/actions";

const RebootWindow = props => {
  const [rebootLater, setRebootLater] = useState(false);
  const [requestedTime, setRequestedTime] = useState("");

  const dispatch = useDispatch();

  const rebootIads = () => {
    const iads = [...props.iads];

    const objIads = iads.reduce((objIads, iad) => {
      let iadEntGr = iad.slice(0, 18); // TG_ENTxxxxxxxGRPyy-IADzz
      objIads = {
        ...objIads,
        [iadEntGr]: objIads[iadEntGr] ? [...objIads[iadEntGr], iad] : [iad]
      };
      return objIads;
    }, {});
    Object.values(objIads).forEach(iads => {
      const dataForUpdate = {
        tenantId: iads[0].slice(3, 13),
        groupId: iads[0].slice(3, 18),
        iads,
        rebootRequest: {
          requestedTime
        }
      };
      const clearData = removeEmpty(dataForUpdate);
      dispatch(fetchPutMassIADsReboot(clearData));
    });
  };

  return (
    <Modal show={props.show} onHide={() => props.onClose()}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <p>
            <FormattedMessage
              id="confirm-reboot-iads"
              defaultMessage={`To be effective, these changes require a reboot of the IAD`}
            />
          </p> */}
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <ControlLabel>
                <FormattedMessage id="reboot" defaultMessage="Reboot" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={rebootLater}
                onChange={e => setRebootLater(e.target.value === "true")}
              >
                <option value={false}>Reboot now</option>
                <option value={true}>Reboot later</option>
              </FormControl>
            </div>
          </Col>
        </Row>
        {rebootLater && (
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                <ControlLabel>
                  <FormattedMessage
                    id="requestedTime"
                    defaultMessage="Requested Time"
                  />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex flex-basis-33"}>
                <FormControl
                  type="time"
                  step={1800}
                  onChange={e => setRequestedTime(e.target.value)}
                ></FormControl>
              </div>
            </Col>
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={rebootIads} disabled={rebootLater && !requestedTime}>
          <FormattedMessage id="ok" defaultMessage="Ok" />
        </Button>
        <Button onClick={() => props.onClose()}>
          <FormattedMessage id="cancel" defaultMessage="Cancel" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default withRouter(RebootWindow);
