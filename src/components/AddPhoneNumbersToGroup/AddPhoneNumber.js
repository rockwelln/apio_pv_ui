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

export class AddPhoneNumber extends Component {
  state = {
    arrayFrom: "",
    arrayTo: "",
    arrayState: "",
    buttonName: "Add",
    numbers: [{ number: "", state: "" }]
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
                <div className={"margin-right-1 flex flex-basis-33"}>
                  Array of numbers
                </div>
                <div className={"margin-right-1"}>From</div>
                <div className={"margin-right-1 flex flex-basis-66"}>
                  <FormControl
                    type="number"
                    value={this.state.arrayFrom}
                    placeholder={"From"}
                    onChange={e => this.setState({ ccli: e.target.value })}
                  />
                </div>
              </Col>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1"}>To</div>
                <div className={"margin-right-1 flex flex-basis-66"}>
                  <FormControl
                    type="number"
                    value={this.state.arrayTo}
                    placeholder={"To"}
                    onChange={e => this.setState({ ccli: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}></div>
                <div className={"margin-right-1"}>State</div>
                <div className={"margin-right-1 flex flex-basis-66"}>
                  <FormGroup className={"margin-0 flex"}>
                    {STATENUMBERS.map((state, i) => (
                      <Radio
                        className={"margin-0 flex margin-right-2"}
                        key={i + ""}
                        name="transportMode"
                        value={state.value}
                        checked={state.value === this.state.arrayState}
                        onChange={e =>
                          this.setState({
                            arrayState: e.target.value
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
              <Col md={12} className={"flex"}>
                <div className={"flex flex-basis-16"}>Individual number(s)</div>
                <div className={"margin-right-1 flex-column flex-basis-66 "}>
                  {this.state.numbers.map((number, i) => (
                    <div
                      key={i}
                      className={"flex align-items-center margin-bottom-1"}
                    >
                      <FormControl
                        type="number"
                        value={number.number}
                        placeholder={"Phonenumber"}
                        onChange={e => {
                          const val = e.target.value;
                          this.setState(curState => {
                            const numbers = [...curState.numbers];
                            numbers[i] = {
                              ...numbers[i],
                              number: val
                            };
                            return { numbers };
                          });
                        }}
                        className={"flex flex-basis-33 margin-right-1"}
                      />
                      <div className={"margin-right-2"}>State</div>
                      <FormGroup className={"margin-0 flex"}>
                        {STATENUMBERS.map((state, index) => (
                          <Radio
                            className={"margin-0 margin-right-2"}
                            key={index + ""}
                            name={i + "stateNumbers"}
                            value={state.value}
                            onChange={e => {
                              const val = e.target.value;
                              this.setState(curState => {
                                const numbers = [...curState.numbers];
                                numbers[i] = {
                                  ...numbers[i],
                                  state: val
                                };
                                return { numbers };
                              });
                            }}
                          >
                            <div className="font-weight-bold flex">
                              {state.name}
                            </div>
                          </Radio>
                        ))}
                      </FormGroup>
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
    numbers.push({ number: "", state: "" });
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
    this.props.history.push(
      `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}`
    );
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddPhoneNumber)
);
