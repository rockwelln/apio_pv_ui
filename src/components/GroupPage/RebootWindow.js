import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { fetchPutUpdateGroupDetails } from "../../store/actions";

import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import ControlLabel from "react-bootstrap/lib/ControlLabel";

import { FormattedMessage } from "react-intl";
import { removeEmpty } from "../remuveEmptyInObject";

class RebootWindow extends Component {
  state = { rebootLater: "now", requestedTime: "", disableOkButton: false };

  render() {
    const { show, onClose } = this.props;
    return (
      <Modal
        show={show}
        onHide={() =>
          this.setState({ requestedTime: "", rebootLater: "now" }, () =>
            onClose()
          )
        }
      >
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
                  onChange={e =>
                    this.setState({
                      rebootLater: e.target.value
                    })
                  }
                >
                  <option value={"now"}>Reboot now</option>
                  <option value={"later"}>Reboot later</option>
                  <option value={"notReboot"}>Do not reboot</option>
                </FormControl>
              </div>
            </Col>
          </Row>
          {this.state.rebootLater === "later" && (
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
            disabled={
              this.state.rebootLater === "later" && !this.state.requestedTime
            }
          >
            {this.state.disableOkButton ? (
              this.state.rebootLater === "later" ? (
                <FormattedMessage
                  id="scheduling"
                  defaultMessage="Scheduling..."
                />
              ) : (
                <FormattedMessage
                  id="rebooting"
                  defaultMessage="Rebooting..."
                />
              )
            ) : (
              <FormattedMessage id="ok" defaultMessage="Ok" />
            )}
          </Button>
          <Button
            onClick={() => onClose()}
            disabled={this.state.disableOkButton}
          >
            <FormattedMessage id="cancel" defaultMessage="Cancel" />
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  updateIad = () => {
    const { data, onClose } = this.props;
    const { requestedTime, rebootLater } = this.state;

    const pad = number => {
      if (number < 10) {
        return "0" + number;
      }
      return number;
    };

    const getYearMonthDate = (year, month, date) => {
      const coundDaysInMonths = new Date(year, month, 0).getDate();
      if (date > coundDaysInMonths) {
        if (month === 12) {
          return `${year + 1}-01-01`;
        }
        return `${year}-${pad(month + 1)}-01`;
      }
      return `${year}-${pad(month)}-${pad(date)}`;
    };

    let time = "";
    const dateNow = new Date();

    if (rebootLater === "later") {
      const currentDate = dateNow.getTime();
      const selectedTime = requestedTime.split(":");
      const selectedDate = new Date(
        `${dateNow.getFullYear()}-${pad(dateNow.getMonth() + 1)}-${pad(
          dateNow.getDate()
        )}T${selectedTime[0]}:${selectedTime[1]}`
      ).getTime();
      if (currentDate > selectedDate) {
        time = `${getYearMonthDate(
          dateNow.getFullYear(),
          dateNow.getMonth() + 1,
          dateNow.getDate() + 1
        )}T${selectedTime[0]}:${selectedTime[1]}`;
      } else {
        time = `${dateNow.getFullYear()}-${pad(dateNow.getMonth() + 1)}-${pad(
          dateNow.getDate()
        )}T${selectedTime[0]}:${selectedTime[1]}`;
      }
    } else if (rebootLater === "now") {
      time = `${dateNow.getFullYear()}-${pad(dateNow.getMonth() + 1)}-${pad(
        dateNow.getDate()
      )}T00:00`;
    }

    const dataForUpdate = {
      ...data,
      rebootRequest: {
        requestedTime: time
      }
    };
    const clearData = removeEmpty(dataForUpdate);
    this.setState({ disableOkButton: true }, () =>
      this.props
        .fetchPutUpdateGroupDetails(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          clearData
        )
        .then(res => {
          this.setState({ disableOkButton: false });
          res === "successful" && onClose();
        })
    );
  };
}

const mapDispatchToProps = { fetchPutUpdateGroupDetails };

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(RebootWindow)
);
