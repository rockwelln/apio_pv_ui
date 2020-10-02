import React, { Component } from "react";

import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Radio from "react-bootstrap/lib/Radio";
import Alert from "react-bootstrap/lib/Alert";
import FormControl from "react-bootstrap/lib/FormControl";

import Select from "react-select";

import { FormattedMessage } from "react-intl";
import { getRange } from "../expandRangeOfPhoneNumber";

class SelectRange extends Component {
  state = {
    typeOfRange: "fullRange",
    minPhoneNumber: {
      value: this.props.number.rangeStart,
      label: this.props.number.rangeStart
    },
    maxPhoneNumber: {
      value: this.props.number.rangeEnd,
      label: this.props.number.rangeEnd
    },
    rangeOptions: [],
    subrangeSize: undefined
  };

  componentDidMount() {
    const range = getRange(
      this.state.minPhoneNumber.value,
      this.state.maxPhoneNumber.value
    );
    const rangeOptions = range.map(phone => ({ value: phone, label: phone }));
    this.setState({
      rangeOptions,
      subrangeSize: rangeOptions.length,
      maxSubrangeSize: rangeOptions.length
    });
  }

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
                {`Selected range from ${this.state.minPhoneNumber.value} to ${this.state.maxPhoneNumber.value}`}
              </Alert>
            </Col>
          </Row>
          {this.state.typeOfRange === "subRange" && (
            <React.Fragment>
              <Row className={"flex"}>
                <Col className={"flex align-items-center"} md={3}>
                  Start at
                </Col>
                <Col md={9}>
                  <Select
                    className={"width-100p"}
                    defaultValue={this.state.minPhoneNumber}
                    onChange={selected => this.selectStartAt(selected)}
                    options={this.state.rangeOptions}
                  />
                </Col>
              </Row>
              <Row className={"flex margin-top-1"}>
                <Col className={"flex align-items-center"} md={3}>
                  Size of subrange
                </Col>
                <Col md={9}>
                  <FormControl
                    type="number"
                    min={1}
                    max={this.state.maxSubrangeSize}
                    value={this.state.subrangeSize}
                    onChange={e => this.setSubrangeSize(e.target.value)}
                  />
                </Col>
              </Row>
            </React.Fragment>
          )}
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

  setSubrangeSize = value => {
    if (value < 1 || value >= this.state.maxSubrangeSize) {
      return;
    }
    const indexOfStart = this.state.rangeOptions.indexOf(
      this.state.minPhoneNumber
    );
    this.setState({
      subrangeSize: Number(value),
      maxPhoneNumber: this.state.rangeOptions[indexOfStart + Number(value)]
    });
  };

  selectStartAt = selected => {
    const indexOfSelected = this.state.rangeOptions.indexOf(selected);
    if (
      this.state.subrangeSize >
      this.state.rangeOptions.length - indexOfSelected
    ) {
      this.setState({
        subrangeSize: this.state.rangeOptions.length - indexOfSelected,
        maxPhoneNumber: this.state.rangeOptions[
          indexOfSelected +
            (this.state.rangeOptions.length - indexOfSelected - 1)
        ]
      });
    }
    this.setState({
      minPhoneNumber: selected,
      maxPhoneNumber: this.state.rangeOptions[
        indexOfSelected + (this.state.rangeOptions.length - indexOfSelected - 1)
      ],
      maxSubrangeSize: this.state.rangeOptions.length - indexOfSelected + 1
    });
  };

  assignPhoneNumbers = () => {
    const numbers = [];
    const range = getRange(
      this.state.minPhoneNumber.value,
      this.state.maxPhoneNumber.value
    );
    range.forEach(phone => numbers.push({ phoneNumber: phone }));
    this.props.assignNumbers({ numbers }).then(() => this.props.onClose());
  };
}

export default SelectRange;
