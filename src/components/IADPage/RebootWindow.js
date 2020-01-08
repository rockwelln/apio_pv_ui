import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchPutUpdateIAD } from "../../store/actions";

import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import ControlLabel from "react-bootstrap/lib/ControlLabel";

import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import { removeEmpty } from "../remuveEmptyInObject";

class RebootWindow extends Component {
  state = { rebootLater: false, requestedTime: "" };

  render() {
    const { show, onClose } = this.props;
    return (
      <Modal show={show} onHide={() => onClose()}>
        <Modal.Header closeButton>
          <Modal.Title>
            {/* <FormattedMessage
              id="confirm-delete"
              defaultMessage="Are you sure?"
            /> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <FormattedMessage
              id="confirm-reboot-iad"
              defaultMessage={`To be effective, these changes require a reboot of the IAD`}
            />
          </p>
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
                  value={this.state.rebootLater}
                  onChange={e => this.setState({ rebootLater: e.target.value })}
                >
                  <option value={false}>Reboot now</option>
                  <option value={true}>Reboot later</option>
                </FormControl>
              </div>
            </Col>
          </Row>
          {this.state.rebootLater && (
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
                    //onKeyDown={e => e.preventDefault()}
                    onChange={e =>
                      this.setState({ requestedTime: e.target.value })
                    }
                  ></FormControl>
                </div>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={this.updateIad}
            disabled={this.state.rebootLater && !this.state.requestedTime}
          >
            <FormattedMessage id="ok" defaultMessage="Ok" />
          </Button>
          <Button onClick={() => onClose()}>
            <FormattedMessage id="cancel" defaultMessage="Cancel" />
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  updateIad = () => {
    const { data, onClose } = this.props;
    const { rebootLater, requestedTime } = this.state;
    const dataForUpdate = {
      ...data,
      rebootRequest: {
        scheduled: rebootLater,
        requestedTime
      }
    };
    const clearData = removeEmpty(dataForUpdate);
    this.props
      .fetchPutUpdateIAD(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        this.props.match.params.iadId,
        clearData
      )
      .then(res => res === "successful" && onClose());
  };
}

const mapDispatchToProps = { fetchPutUpdateIAD };

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(RebootWindow)
);
