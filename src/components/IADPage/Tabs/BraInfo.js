import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { NotificationsManager } from "../../../utils";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Checkbox from "react-bootstrap/lib/Checkbox";

import { changeIAD, fetchPutUpdateIAD } from "../../../store/actions";
import { removeEmpty } from "../../remuveEmptyInObject";
import RebootWindow from "../RebootWindow";
import { FormattedMessage } from "react-intl";

import { isAllowed, pages } from "../../../utils/user";

const BRA_PORT_MODES = [
  { value: "P2P", label: "P2P" },
  { value: "P2PM", label: "P2PM" },
];

export class BraInfo extends Component {
  state = {
    braByIad: {},
    disabledButton: false,
    arrayOfBraId: [],
    selectedID: [],
    data: {},
    showRebootDialog: false,
  };

  componentDidMount() {
    let braByIad = {};
    let selectedID = [];
    let arrayOfBraId = [{ value: 0, label: "None" }];

    for (let i = 0; i < this.props.iad.bra_available; i++) {
      arrayOfBraId.push({ value: i + 1, label: i + 1 });
    }

    Object.keys(this.props.iad.bra_info).forEach((key) => {
      selectedID.push(Number(key));
      braByIad = {
        ...braByIad,
        [key]: { ...this.props.iad.bra_info[key], braID: key },
      };
    });
    for (let i = 0; i < this.props.iad.bra_needed; i++) {
      if (Object.keys(braByIad).length < this.props.iad.bra_needed) {
        braByIad = {
          ...braByIad,
          [i + 5]: { port_mode: "P2P", enabled: "" },
        };
      }
    }
    this.setState({ braByIad, arrayOfBraId, selectedID });
  }

  render() {
    return (
      <React.Fragment>
        {Object.keys(this.state.braByIad).map((bra, i) => (
          <React.Fragment key={i + ""}>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-18"}>
                  <FormattedMessage
                    id="braNumber"
                    defaultMessage={`BRA ${i + 1}`}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage id="braPort" defaultMessage="BRA Port" />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.braByIad[bra].braID}
                    onChange={(e) => {
                      let selectedID = [...this.state.selectedID];
                      if (Number(e.target.value) !== 0) {
                        selectedID.push(Number(e.target.value));
                        if (this.state.braByIad[bra].braID) {
                          const index = selectedID.indexOf(
                            Number(this.state.braByIad[bra].braID)
                          );
                          if (index !== -1) {
                            selectedID.splice(index, 1);
                          }
                        }
                      } else if (Number(e.target.value) === 0) {
                        const index = selectedID.indexOf(
                          this.state.braByIad[bra].braID
                        );
                        if (index !== -1) {
                          selectedID.splice(index, 1);
                        }
                      }
                      this.setState(
                        {
                          selectedID,
                          braByIad: {
                            ...this.state.braByIad,
                            [bra]: {
                              ...this.state.braByIad[bra],
                              braID: Number(e.target.value),
                              enabled: Number(e.target.value) ? true : false,
                            },
                          },
                        },
                        () => this.storeUpdate()
                      );
                    }}
                    disabled={
                      !isAllowed(
                        localStorage.getItem("userProfile"),
                        pages.edit_iad_pra_info_pra_port
                      ) || this.props.iad.virtual
                    }
                  >
                    {this.state.arrayOfBraId.map((el, i) => (
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
                      id="port_mode"
                      defaultMessage="Port mode"
                    />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.braByIad[bra].port_mode}
                    placeholder={"Port mode"}
                    onChange={(e) =>
                      this.setState(
                        {
                          braByIad: {
                            ...this.state.braByIad,
                            [bra]: {
                              ...this.state.braByIad[bra],
                              port_mode: e.target.value,
                            },
                          },
                        },
                        () => this.storeUpdate()
                      )
                    }
                    disabled={
                      !isAllowed(
                        localStorage.getItem("userProfile"),
                        pages.edit_iad_pra_info_tpid
                      ) ||
                      this.props.iad.virtual ||
                      !this.state.braByIad[bra].braID
                    }
                  />
                </div>
              </Col>
            </Row>
            {/* <Row className={"margin-top-1"}>
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
                    value={this.state.braByIad[bra].circuit_id}
                    placeholder={"Prefix followed by national phone number"}
                    onChange={(e) =>
                      this.setState(
                        {
                          braByIad: {
                            ...this.state.braByIad,
                            [bra]: {
                              ...this.state.braByIad[bra],
                              circuit_id: e.target.value,
                            },
                          },
                        },
                        () => this.storeUpdate()
                      )
                    }
                    disabled={
                      !isAllowed(
                        localStorage.getItem("userProfile"),
                        pages.edit_iad_pra_info_circuit_id
                      ) ||
                      this.props.iad.virtual ||
                      !this.state.braByIad[bra].braID
                    }
                  />
                </div>
              </Col>
            </Row> */}
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
                    checked={this.state.braByIad[bra].enabled}
                    onChange={(e) =>
                      this.setState(
                        {
                          braByIad: {
                            ...this.state.braByIad,
                            [bra]: {
                              ...this.state.braByIad[bra],
                              enabled: e.target.checked,
                            },
                          },
                        },
                        () => this.storeUpdate()
                      )
                    }
                    disabled={
                      !isAllowed(
                        localStorage.getItem("userProfile"),
                        pages.edit_iad_pra_info_enabled
                      ) ||
                      this.props.iad.virtual ||
                      !this.state.braByIad[bra].braID
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
                  disabled={this.state.disabledButton || this.props.iad.virtual}
                >
                  <Glyphicon glyph="glyphicon glyphicon-ok" />
                  {this.state.disabledButton ? (
                    <FormattedMessage
                      id="updating"
                      defaultMessage="Updating..."
                    />
                  ) : (
                    <FormattedMessage id="update" defaultMessage="Update" />
                  )}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  storeUpdate = () => {
    const { braByIad } = this.state;
    let bra_info = {};
    Object.keys(braByIad).forEach((key) => {
      if (braByIad[key].braID === 0) {
        return;
      }
      bra_info = {
        ...bra_info,
        [braByIad[key].braID]: {
          port_mode: braByIad[key].port_mode,
          enabled: braByIad[key].enabled,
        },
      };
    });
    this.props.changeIAD("bra_info", bra_info);
  };

  updateIAD = () => {
    const { braByIad } = this.state;
    let bra_info = {};
    Object.keys(braByIad).forEach((key) => {
      if (braByIad[key].braID === 0) {
        NotificationsManager.error(
          <FormattedMessage
            id="bra-not-updated"
            defaultMessage="BRA not updated"
          />,
          <FormattedMessage
            id="you-need-to-provide-bra-ports"
            defaultMessage="You need to provide bra ports"
          />
        );
        return;
      }
      bra_info = {
        ...bra_info,
        [braByIad[key].braID]: {
          port_mode: braByIad[key].port_mode,
          enabled: braByIad[key].enabled,
        },
      };
    });
    const data = { bra_info };
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

const mapStateToProps = (state) => ({ iad: state.iad });

const mapDispatchToProps = { changeIAD, fetchPutUpdateIAD };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BraInfo)
);
