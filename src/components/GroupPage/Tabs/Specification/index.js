import React, { Component } from "react";
import { connect } from "react-redux";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Button from "react-bootstrap/lib/Button";
import Checkbox from "react-bootstrap/lib/Checkbox";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Radio from "react-bootstrap/lib/Radio";

import {
  ADVICEOFCHARGE,
  DTMF,
  CHANNELHUNTING,
  DIRECTION,
  DESTINATIONNUMBERSPRA,
  NATIONNUMBERSPRA,
  INTERNATIONNUMBERSPRA
} from "../../../../constants";

export class index extends Component {
  state = {
    isDisabled: true,
    clip: true,
    colp: false,
    clir: false,
    colr: true,
    aoc: false,
    dtmf: "RFC2833",
    direction: "Bi",
    additionnalRedundancy: true
  };
  render() {
    return (
      <React.Fragment>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            {this.state.isDisabled ? (
              <React.Fragment>
                <div className={"header margin-right-2"}>EXAMPLE GROUP</div>
                <Glyphicon
                  className={"font-18"}
                  glyph="glyphicon glyphicon-pencil"
                  onClick={() => this.setState({ isDisabled: false })}
                />
              </React.Fragment>
            ) : (
              <FormControl
                type="text"
                placeholder={"GROUP NAME"}
                disabled={this.state.isDisabled}
                className={"header flex-basis-50 margin-right-2"}
              />
            )}
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>ID</div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={"ENTxxxxxxGRPyy"}
                placeholder={"ID"}
                disabled
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>CLI</div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={"xxxxxx"}
                placeholder={"CLI"}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>ZIP code</div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={"xxxxxx"}
                placeholder={"ZIP code"}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex font-24"}>Services data</div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              NCOS value
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={"0"}
                placeholder={"NCOS value"}
                disabled
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>CLIP</div>
            <div className={"margin-right-1 flex-basis-11"}>
              <Checkbox
                checked={this.state.clip}
                className={"table-checkbox"}
                onChange={e => {
                  this.setState({
                    clip: e.target.checked
                  });
                }}
                disabled={this.state.isDisabled}
              >
                Active
              </Checkbox>
            </div>
            <div className={"margin-right-1 flex flex-basis-11"}>COLP</div>
            <div className={"margin-right-1 flex-basis-11"}>
              <Checkbox
                checked={this.state.colp}
                className={"table-checkbox"}
                onChange={e => {
                  this.setState({
                    colp: e.target.checked
                  });
                }}
                disabled={this.state.isDisabled}
              >
                Active
              </Checkbox>
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>CLIR</div>
            <div className={"margin-right-1 flex-basis-11"}>
              <Checkbox
                checked={this.state.clir}
                className={"table-checkbox"}
                onChange={e => {
                  this.setState({
                    clir: e.target.checked
                  });
                }}
                disabled={this.state.isDisabled}
              >
                Active
              </Checkbox>
            </div>
            <div className={"margin-right-1 flex flex-basis-11"}>COLR</div>
            <div className={"margin-right-1 flex-basis-11"}>
              <Checkbox
                checked={this.state.colr}
                className={"table-checkbox"}
                onChange={e => {
                  this.setState({
                    colr: e.target.checked
                  });
                }}
                disabled={this.state.isDisabled}
              >
                Active
              </Checkbox>
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Advice of Charge
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              {this.state.isDisabled ? (
                <FormControl
                  type="text"
                  value={
                    this.state.aoc === false || this.state.aoc === "false"
                      ? "None"
                      : this.state.aoc
                  }
                  disabled={this.state.isDisabled}
                />
              ) : (
                <FormGroup className={"margin-0 flex"}>
                  {ADVICEOFCHARGE.map((type, i) => (
                    <Radio
                      className={"margin-0 flex margin-right-2"}
                      key={i + ""}
                      name="adviceOfCharge"
                      value={type.value}
                      defaultChecked={type.value === this.state.aoc}
                      onChange={e =>
                        this.setState({
                          aoc: e.target.value
                        })
                      }
                    >
                      <div className="font-weight-bold flex">{type.name}</div>
                    </Radio>
                  ))}
                </FormGroup>
              )}
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>DTMF</div>
            <div className={"margin-right-1 flex-basis-33"}>
              {this.state.isDisabled ? (
                <FormControl
                  type="text"
                  value={
                    this.state.dtmf === false || this.state.dtmf === "false"
                      ? "None"
                      : this.state.dtmf
                  }
                  disabled={this.state.isDisabled}
                />
              ) : (
                <FormGroup className={"margin-0 flex"}>
                  {DTMF.map((type, i) => (
                    <Radio
                      className={"margin-0 flex margin-right-2"}
                      key={i + ""}
                      name="dtmf"
                      value={type.value}
                      defaultChecked={type.value === this.state.dtmf}
                      onChange={e =>
                        this.setState({
                          dtmf: e.target.value
                        })
                      }
                    >
                      <div className="font-weight-bold flex">{type.name}</div>
                    </Radio>
                  ))}
                </FormGroup>
              )}
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Channel Hunting
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.channelHunting}
                onChange={e =>
                  this.setState({ channelHunting: e.target.value })
                }
                disabled={this.state.isDisabled}
              >
                {CHANNELHUNTING.map((type, i) => (
                  <option key={i} value={type.value}>
                    {type.name}
                  </option>
                ))}
              </FormControl>
            </div>
          </Col>
        </Row>
        {!this.state.isDisabled && (
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"} />
              <div className={"margin-right-1 flex-basis-33"}>
                {"\u26a0"} Will only work on lowest IAD, not recommended unless
                only 1 IAD on site
              </div>
            </Col>
          </Row>
        )}
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>Direction</div>
            <div className={"margin-right-1 flex-basis-33"}>
              {this.state.isDisabled ? (
                <FormControl
                  type="text"
                  value={
                    this.state.direction === "Bi"
                      ? "Bi-directional"
                      : "Uni-directional"
                  }
                  disabled={this.state.isDisabled}
                />
              ) : (
                <FormGroup className={"margin-0 flex"}>
                  {DIRECTION.map((type, i) => (
                    <Radio
                      className={"margin-0 flex margin-right-2"}
                      key={i + ""}
                      name="direction"
                      value={type.value}
                      defaultChecked={type.value === this.state.direction}
                      onChange={e =>
                        this.setState({
                          direction: e.target.value
                        })
                      }
                    >
                      <div className="font-weight-bold flex">{type.name}</div>
                    </Radio>
                  ))}
                </FormGroup>
              )}
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Nbr channel in{"\u002a"}
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="number"
                value={321}
                placeholder={"Nbr channel in"}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Nbr channel out{"\u002a"}
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="number"
                value={123}
                placeholder={"Nbr channel out"}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"} />
            <div className={"margin-right-1 flex-basis-33"}>
              {"\u002a"} Don't exceed your IADs capacity (avalible: xxxxx)
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex font-24"}>Network data</div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>CCLI</div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={"xxxxxxxx"}
                placeholder={"CCLI"}
                disabled
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Type of IAD
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={"PRA"}
                placeholder={"PRA"}
                disabled
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Type of accesss
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={"FIBER"}
                placeholder={"FIBER"}
                disabled
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Number of channels
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="number"
                value={2}
                placeholder={"Number of channels"}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Service Type
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={"Service redundant type 1"}
                placeholder={"Service Type"}
                disabled
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"} />
            <div className={"margin-right-1 flex-basis-33"}>
              <Checkbox
                checked={this.state.additionnalRedundancy}
                className={"table-checkbox"}
                disabled
              >
                Additionnal redundancy
              </Checkbox>
            </div>
          </Col>
        </Row>
        {!this.state.isDisabled && (
          <React.Fragment>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-24"}>
                  Number formating rules
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  Destination Number Format for PRA
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.dstNumberPra}
                    onChange={e =>
                      this.setState({ dstNumberPra: e.target.value })
                    }
                  >
                    {DESTINATIONNUMBERSPRA.map((type, i) => (
                      <option key={i} value={type.value}>
                        {type.name}
                      </option>
                    ))}
                  </FormControl>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  Nation Source Number Format for PRA
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.ntlNumberPra}
                    onChange={e =>
                      this.setState({ ntlNumberPra: e.target.value })
                    }
                  >
                    {NATIONNUMBERSPRA.map((type, i) => (
                      <option key={i} value={type.value}>
                        {type.name}
                      </option>
                    ))}
                  </FormControl>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  Internation Source Number Format for PRA
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.intlNumberPra}
                    onChange={e =>
                      this.setState({ intlNumberPra: e.target.value })
                    }
                  >
                    {INTERNATIONNUMBERSPRA.map((type, i) => (
                      <option key={i} value={type.value}>
                        {type.name}
                      </option>
                    ))}
                  </FormControl>
                </div>
              </Col>
            </Row>
          </React.Fragment>
        )}
        {!this.state.isDisabled && (
          <Row>
            <Col md={12}>
              <div className="button-row">
                <div className="pull-right">
                  <Button
                    onClick={() => this.setState({ isDisabled: true })}
                    type="submit"
                    className="btn-primary"
                  >
                    <Glyphicon glyph="glyphicon glyphicon-ok" />
                    Update
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);
