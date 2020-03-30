import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Radio from "react-bootstrap/lib/Radio";
import Alert from "react-bootstrap/lib/Alert";

import { FormattedMessage } from "react-intl";
import { getRange } from "../expandRangeOfPhoneNumber";

class SelectRange extends Component {
  state = {
    typeOfRange: "fullRange",
    minPhoneNumber: this.props.number.rangeStart,
    maxPhoneNumber: this.props.number.rangeEnd
  };
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onClose}
        backdrop={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id="select_range" defaultMessage="Select range" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className={"margin-top-1"}>
            <Col md={3}>
              <Radio
                className={"margin-top-0"}
                name="rengeType"
                value={"fullRange"}
                onChange={e =>
                  this.setState({
                    typeOfRange: e.target.value
                  })
                }
                checked={this.state.typeOfRange === "fullRange"}
              >
                <b>Add full range</b>
              </Radio>
            </Col>
          </Row>
          <Row className={"margin-top-1"}>
            <Col md={3}>
              <Radio
                className={"margin-top-0"}
                name="rengeType"
                value={"subRange"}
                onChange={e =>
                  this.setState({
                    typeOfRange: e.target.value
                  })
                }
                checked={this.state.typeOfRange === "subRange"}
              >
                <b>Add subrange</b>
              </Radio>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Alert bsStyle="info">
                {`Selected range from ${this.state.minPhoneNumber} to ${this.state.maxPhoneNumber}`}
              </Alert>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={"btn-primary"}
            disabled={!this.state.typeOfRange}
            onClick={this.assignPhoneNumbers}
          >
            <FormattedMessage id="add" defaultMessage="Add" />
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  assignPhoneNumbers = () => {
    const numbers = [];
    const range = getRange(
      this.state.minPhoneNumber,
      this.state.maxPhoneNumber
    );
    range.forEach(phone => numbers.push({ phoneNumber: phone }));
    this.props.assignNumbers({ numbers }).then(() => this.props.onClose());
  };
}

export default SelectRange;
