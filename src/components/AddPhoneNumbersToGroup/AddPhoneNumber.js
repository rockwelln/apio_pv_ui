import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Panel from "react-bootstrap/lib/Panel";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Radio from "react-bootstrap/lib/Radio";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Checkbox from "react-bootstrap/lib/Checkbox";

import { STATENUMBERS } from "../../constants";

import { fetchPostAssignPhoneNumbersToGroup } from "../../store/actions";

import { removeEmpty } from "../remuveEmptyInObject";

export class AddPhoneNumber extends Component {
  state = {
    arrayFrom: "",
    arrayTo: "",
    buttonName: "Add",
    status: "",
    numbers: [{ phoneNumber: "" }]
  };
  render() {
    return (
      <React.Fragment>
        <Panel className={"margin-0"}>
          <Panel.Heading>
            <div className={"header"}>
              {this.props.location.pathname.includes("modifyphone")
                ? "MODIFY NUMBERS"
                : "ADD NUMBERS"}
              <Button
                className={"margin-left-1 btn-danger"}
                onClick={this.cancelClick}
              >
                Cancel
              </Button>
            </div>
            <div>
              Enter a list of numbers or an array of numbers and select their
              state
            </div>
          </Panel.Heading>
          <Panel.Body>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"flex flex-basis-33"}>Status</div>
                <div className={"margin-right-1 flex flex-basis-66"}>
                  <FormGroup className={"margin-0 flex"}>
                    {STATENUMBERS.map((state, i) => (
                      <Radio
                        className={"margin-0 flex margin-right-2"}
                        key={i + ""}
                        name="transportMode"
                        value={state.value}
                        checked={state.value === this.state.status}
                        onChange={e =>
                          this.setState({
                            status: e.target.value
                          })
                        }
                      >
                        <div className="font-weight-bold flex">
                          {state.name}
                        </div>
                      </Radio>
                    ))}
                  </FormGroup>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  Array of numbers
                </div>
                <div className={"margin-right-1"}>From</div>
                <div className={"margin-right-1 flex flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.arrayFrom}
                    placeholder={"From"}
                    onChange={e => this.setState({ arrayFrom: e.target.value })}
                  />
                </div>
              </Col>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1"}>To</div>
                <div className={"margin-right-1 flex flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.arrayTo}
                    placeholder={"To"}
                    onChange={e => this.setState({ arrayTo: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex"}>
                <div className={"flex flex-basis-16"}>Individual number(s)</div>
                <div className={"margin-right-1 flex-column flex-basis-66 "}>
                  {this.state.numbers.map((number, i) => (
                    <div
                      key={i}
                      className={"flex align-items-center margin-bottom-1"}
                    >
                      <FormControl
                        type="text"
                        value={number.phoneNumber}
                        placeholder={"Phonenumber"}
                        onChange={e => {
                          const val = e.target.value;
                          this.setState(curState => {
                            const numbers = [...curState.numbers];
                            numbers[i] = {
                              ...numbers[i],
                              phoneNumber: val
                            };
                            return { numbers };
                          });
                        }}
                        className={"flex flex-basis-33 margin-right-1"}
                      />
                      {this.state.numbers.length > 1 && (
                        <Glyphicon
                          className={"margin-0 margin-right-1 font-18"}
                          glyph="glyphicon glyphicon-remove"
                          onClick={() => this.removeNumberFromArray(i)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"flex flex-basis-16"}></div>
                <div
                  className={"margin-right-1 flex cursor-pointer"}
                  onClick={this.addPhoneToArray}
                >
                  <Glyphicon
                    className={"margin-0 margin-right-1 font-18"}
                    glyph="glyphicon glyphicon-plus-sign"
                  />
                  <div className={"flex"}>Add a number</div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="button-row">
                  <div className="pull-right">
                    <Button
                      onClick={this.addAID}
                      type="submit"
                      className="btn-primary"
                    >
                      <Glyphicon glyph="glyphicon glyphicon-ok" />{" "}
                      {this.state.buttonName}
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Panel.Body>
        </Panel>
      </React.Fragment>
    );
  }

  addPhoneToArray = () => {
    const numbers = this.state.numbers;
    numbers.push({ phoneNumber: "" });
    this.setState({ numbers });
  };

  removeNumberFromArray = i => {
    const numbers = this.state.numbers;
    numbers.splice(i, 1);
    this.setState({ numbers });
  };

  cancelClick = () => {
    this.props.history.push(
      `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}`
    );
  };

  addAID = () => {
    const { numbers, arrayFrom, arrayTo, status } = this.state;
    const data = {
      numbers,
      status,
      range: { minPhoneNumber: arrayFrom, maxPhoneNumber: arrayTo }
    };
    const clearData = removeEmpty(data);
    this.props
      .fetchPostAssignPhoneNumbersToGroup(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        clearData
      )
      .then(
        res =>
          res === "success" &&
          this.props.history.push(
            `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}`
          )
      );
  };
}

const mapDispatchToProps = { fetchPostAssignPhoneNumbersToGroup };

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(AddPhoneNumber)
);
