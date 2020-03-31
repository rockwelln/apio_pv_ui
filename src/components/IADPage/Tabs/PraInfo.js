import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Checkbox from "react-bootstrap/lib/Checkbox";

import { FormattedMessage } from "react-intl";

import { changeIAD, fetchPutUpdateIAD } from "../../../store/actions";
import { removeEmpty } from "../../remuveEmptyInObject";
import RebootWindow from "../RebootWindow";

import { isAllowed, pages } from "../../../utils/user";

export class PraInfo extends Component {
  state = {
    praByIad: {},
    disabledButton: false,
    arrayOfPraId: [],
    selectedID: [],
    data: {},
    showRebootDialog: false
  };

  componentDidMount() {
    let praByIad = {};
    let selectedID = [];
    let arrayOfPraId = [
      { value: 0, label: "None" },
      { value: 1, label: 1 },
      { value: 2, label: 2 },
      { value: 3, label: 3 },
      { value: 4, label: 4 }
    ];
    Object.keys(this.props.iad.pra_info).forEach(key => {
      selectedID.push(Number(key));
      praByIad = {
        ...praByIad,
        [key]: { ...this.props.iad.pra_info[key], praID: key }
      };
    });
    for (let i = 0; i < this.props.iad.pra_needed; i++) {
      if (Object.keys(praByIad).length < this.props.iad.pra_needed) {
        praByIad = {
          ...praByIad,
          [i + 5]: { tpid: "", circuit_id: "", praID: "", enabled: "" }
        };
      }
    }
    this.setState({ praByIad, arrayOfPraId, selectedID });
  }
  render() {
    return (
      <React.Fragment>
        {Object.keys(this.state.praByIad).map((pra, i) => (
          <React.Fragment key={i + ""}>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-18"}>
                  <FormattedMessage
                    id="praNumber"
                    defaultMessage={`PRA ${i + 1}`}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage id="praPort" defaultMessage="PRA Port" />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.praByIad[pra].praID}
                    onChange={e => {
                      let selectedID = [...this.state.selectedID];
                      if (Number(e.target.value) !== 0) {
                        selectedID.push(Number(e.target.value));
                        if (this.state.praByIad[pra].praID) {
                          const index = selectedID.indexOf(
                            Number(this.state.praByIad[pra].praID)
                          );
                          if (index !== -1) {
                            selectedID.splice(index, 1);
                          }
                        }
                      } else if (Number(e.target.value) === 0) {
                        const index = selectedID.indexOf(
                          this.state.praByIad[pra].praID
                        );
                        if (index !== -1) {
                          selectedID.splice(index, 1);
                        }
                      }
                      this.setState(
                        {
                          selectedID,
                          praByIad: {
                            ...this.state.praByIad,
                            [pra]: {
                              ...this.state.praByIad[pra],
                              praID: Number(e.target.value),
                              enabled: Number(e.target.value) ? true : false
                            }
                          }
                        },
                        () => this.storeUpdate()
                      );
                    }}
                    disabled={
                      !isAllowed(
                        localStorage.getItem("userProfile"),
                        pages.edit_group_iad_pra_info_pra_port
                      )
                    }
                  >
                    {this.state.arrayOfPraId.map((el, i) => (
                      <option
                        key={i}
                        value={el.value}
                        disabled={this.state.selectedID.includes(el.value)}
                      >
                        {el.label}
                      </option>
                    ))}
                  </FormControl>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="tpid"
                      defaultMessage="Tina Product ID"
                    />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.praByIad[pra].tpid}
                    placeholder={"Tina Product ID"}
                    onChange={e =>
                      this.setState(
                        {
                          praByIad: {
                            ...this.state.praByIad,
                            [pra]: {
                              ...this.state.praByIad[pra],
                              tpid: e.target.value
                            }
                          }
                        },
                        () => this.storeUpdate()
                      )
                    }
                    disabled={
                      !isAllowed(
                        localStorage.getItem("userProfile"),
                        pages.edit_group_iad_pra_info_tpid
                      )
                    }
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="circuitID"
                      defaultMessage="Circuit ID"
                    />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.praByIad[pra].circuit_id}
                    placeholder={"Prefix followed by national phone number"}
                    onChange={e =>
                      this.setState(
                        {
                          praByIad: {
                            ...this.state.praByIad,
                            [pra]: {
                              ...this.state.praByIad[pra],
                              circuit_id: e.target.value
                            }
                          }
                        },
                        () => this.storeUpdate()
                      )
                    }
                    disabled={
                      !isAllowed(
                        localStorage.getItem("userProfile"),
                        pages.edit_group_iad_pra_info_circuit_id
                      )
                    }
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage id="enabled" defaultMessage="Enabled" />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <Checkbox
                    className={"table-checkbox"}
                    checked={this.state.praByIad[pra].enabled}
                    onChange={e =>
                      this.setState(
                        {
                          praByIad: {
                            ...this.state.praByIad,
                            [pra]: {
                              ...this.state.praByIad[pra],
                              enabled: e.target.checked
                            }
                          }
                        },
                        () => this.storeUpdate()
                      )
                    }
                    disabled={
                      !isAllowed(
                        localStorage.getItem("userProfile"),
                        pages.edit_group_iad_pra_info_enabled
                      )
                    }
                  />
                </div>
              </Col>
            </Row>
          </React.Fragment>
        ))}
        <RebootWindow
          data={this.state.data}
          show={this.state.showRebootDialog}
          onClose={() => this.setState({ showRebootDialog: false })}
        />
        <Row>
          <Col md={12}>
            <div className="button-row">
              <div className="pull-right">
                <Button
                  onClick={this.updateIAD}
                  type="submit"
                  className="btn-primary"
                  disabled={this.state.disabledButton}
                >
                  <Glyphicon glyph="glyphicon glyphicon-ok" />
                  <FormattedMessage id="update" defaultMessage="Update" />
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  storeUpdate = () => {
    const { praByIad } = this.state;
    let pra_info = {};
    Object.keys(praByIad).forEach(key => {
      if (praByIad[key].praID === 0) {
        return;
      }
      pra_info = {
        ...pra_info,
        [praByIad[key].praID]: {
          tpid: praByIad[key].tpid,
          circuit_id: praByIad[key].circuit_id,
          enabled: praByIad[key].enabled
        }
      };
    });
    this.props.changeIAD("pra_info", pra_info);
  };

  updateIAD = () => {
    const { praByIad } = this.state;
    let pra_info = {};
    Object.keys(praByIad).forEach(key => {
      if (praByIad[key].praID === 0) {
        return;
      }
      pra_info = {
        ...pra_info,
        [praByIad[key].praID]: {
          tpid: praByIad[key].tpid,
          circuit_id: praByIad[key].circuit_id,
          enabled: praByIad[key].enabled
        }
      };
    });
    const data = { pra_info };
    const clearData = removeEmpty(data);

    if (Object.keys(clearData).length) {
      this.setState({ data: clearData, showRebootDialog: true });
      return;
    }

    this.setState({ disabledButton: true }, () =>
      this.setState({ disabledButton: false })
    );

    // if (Object.keys(clearData).length) {
    //   this.setState({ disabledButton: true }, () =>
    //     this.props
    //       .fetchPutUpdateIAD(
    //         this.props.match.params.tenantId,
    //         this.props.match.params.groupId,
    //         this.props.match.params.iadId,
    //         clearData
    //       )
    //       .then(() => this.setState({ disabledButton: false }))
    //   );
    // } else {
    //   this.setState({ disabledButton: true }, () =>
    //     this.setState({ disabledButton: false })
    //   );
    // }
  };
}

const mapStateToProps = state => ({ iad: state.iad });

const mapDispatchToProps = { changeIAD, fetchPutUpdateIAD };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PraInfo)
);
