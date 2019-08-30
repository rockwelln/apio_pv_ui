import React, { Component } from "react";
import { connect } from "react-redux";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Radio from "react-bootstrap/lib/Radio";
import FormGroup from "react-bootstrap/lib/FormGroup";
import FormControl from "react-bootstrap/lib/FormControl";
import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Checkbox from "react-bootstrap/lib/Checkbox";
import Button from "react-bootstrap/lib/Button";

import { MODEREDUNDANCY } from "../../../../constants";

export class Edit extends Component {
  state = {
    mode: "Overflow",
    groupSelection: [
      { name: "group 1", checked: false },
      { name: "group 2", checked: false },
      { name: "group 3", checked: false },
      { name: "group 4", checked: false },
      { name: "group 5", checked: false },
      { name: "group 6", checked: false },
      { name: "group 7", checked: false },
      { name: "group 8", checked: false },
      { name: "group 9", checked: false },
      { name: "group 10", checked: false },
      { name: "group 11", checked: false }
    ],
    selectedGroups: [
      { name: "group 12", checked: true },
      { name: "group 13", checked: true },
      { name: "group 14", checked: true }
    ]
  };
  render() {
    return (
      <React.Fragment>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>Mode</div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormGroup className={"margin-0 flex"}>
                {MODEREDUNDANCY.map((type, i) => (
                  <Radio
                    className={"margin-0 flex margin-right-2"}
                    key={i + ""}
                    name="modeRedundancy"
                    disabled={type.disabled}
                    value={type.value}
                    checked={type.value === this.state.mode}
                    onChange={e =>
                      this.setState({
                        mode: e.target.value
                      })
                    }
                  >
                    <div className="font-weight-bold flex">{type.name}</div>
                  </Radio>
                ))}
              </FormGroup>
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={6}>Groups Selected</Col>
          <Col md={6}>Priority</Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col mdOffset={1} md={4}>
            <Table striped bordered hover className={"text-center"}>
              <tbody>
                {this.state.groupSelection.map((group, i) => (
                  <tr key={i}>
                    <td style={{ width: "5%" }}>
                      <Checkbox
                        checked={group.checked}
                        className={"table-checkbox margin-left-08"}
                        onChange={e => {
                          const val = e.target.checked;
                          this.setState(curState => {
                            const groupSelection = [...curState.groupSelection];
                            groupSelection[i] = {
                              ...groupSelection[i],
                              checked: val
                            };
                            return { groupSelection };
                          });
                        }}
                      />
                    </td>
                    <td>{group.name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col mdOffset={2} md={4}>
            <Table striped bordered hover className={"text-center"}>
              <tbody>
                {this.state.selectedGroups.map((group, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td className={"flex space-between align-items-center"}>
                      {group.name}
                      <div className={"flex flex-direction-column"}>
                        <Glyphicon
                          glyph={`glyphicon glyphicon-menu-up ${i === 0 &&
                            "grey50-color"}`}
                          className={"font-size-10"}
                          onClick={() => {
                            i !== 0 && this.raisePriority(i);
                          }}
                        />
                        <Glyphicon
                          glyph={`glyphicon glyphicon-menu-down ${this.state
                            .selectedGroups.length ===
                            i + 1 && "grey50-color"}`}
                          className={"font-size-10"}
                          onClick={() => this.lowerPriority(i)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col mdOffset={2} md={10} className={"flex align-items-center"}>
            <Button
              className={"margin-right-1"}
              onClick={this.addGroupToPriority}
            >
              <Glyphicon glyph={"glyphicon glyphicon-ok"} /> Select
            </Button>
            <div>
              once selected, you will be able to choose the calling priority
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Forward to Phone Number
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl type="text" defaultValue={"xxxxxxxxxxx"} />
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  raisePriority = i => {
    const selectedGroups = [...this.state.selectedGroups];
    const elArrToUp = selectedGroups.splice(i, 1);
    selectedGroups.splice(i - 1, 0, elArrToUp[0]);
    this.setState({ selectedGroups });
  };

  lowerPriority = i => {
    const selectedGroups = [...this.state.selectedGroups];
    const elArrToUp = selectedGroups.splice(i, 1);
    selectedGroups.splice(i + 1, 0, elArrToUp[0]);
    this.setState({ selectedGroups });
  };

  addGroupToPriority = () => {
    const selectedGroups = [...this.state.selectedGroups];
    const groupSelection = [...this.state.groupSelection];
    const selected = groupSelection.filter(group => group.checked);
    const notSelected = groupSelection.filter(group => !group.checked);
    selectedGroups.push(...[...selected]);
    this.setState({ selectedGroups, groupSelection: notSelected });
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
