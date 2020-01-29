import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Panel from "react-bootstrap/lib/Panel";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Table from "react-bootstrap/lib/Table";
import Checkbox from "react-bootstrap/lib/Checkbox";

import { FormattedMessage } from "react-intl";

import { removeEmpty } from "../remuveEmptyInObject";
import { validateInputPhoneNumber } from "../validateInputPhoneNumber";

import {
  fetchGetListOfIads,
  fetchPostCreateEnterpriseTrunk,
  fetchGetConfig
} from "../../store/actions";
import Loading from "../../common/Loading";

export class AddEntrepriseTrunk extends Component {
  state = {
    routeExhaustionAction: "None",
    routeExhaustionDestination: "",
    routingMode: "ordered",
    mainIadsAvalible: [],
    otherIadsAvalible: [],
    disabledButton: false,
    isLoading: true
  };

  componentDidMount() {
    this.props.fetchGetConfig().then(() => this.setState({ isLoading: false }));
    this.props
      .fetchGetListOfIads(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() => {
        const mainIadsAvalible = this.props.listOfIads.main_iads_available.map(
          el => ({
            ...el,
            checked: false
          })
        );
        const otherIadsAvalible = this.props.listOfIads.other_iads_available.map(
          el => ({
            ...el,
            checked: false
          })
        );
        this.setState({
          mainIadsAvalible,
          otherIadsAvalible
        });
      });
  }
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Panel className={"margin-0"}>
          <Panel.Heading>
            <div className={"header"}>
              <FormattedMessage
                id="addEnterprises"
                defaultMessage="ADD ENTERPRISES TRUNK"
              />

              <Button
                className={"margin-left-1 btn-danger"}
                onClick={this.cancelClick}
              >
                <FormattedMessage id="cancel" defaultMessage="Cancel" />
              </Button>
            </div>
            <div>
              {/* <FormattedMessage
                id="addEnterprisesInfo"
                defaultMessage="Enter your enterprise name and customer ID. Your enterprise ID will be auto-generated"
              /> */}
            </div>
          </Panel.Heading>
          <Panel.Body>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="routingMode"
                      defaultMessage="Routing Mode"
                    />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.routingMode}
                    onChange={e =>
                      this.setState({ routingMode: e.target.value })
                    }
                  >
                    <option value={"ordered"}>Ordered</option>
                    <option value={"weighted"}>Weighted</option>
                  </FormControl>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="routeExhaustionAction"
                      defaultMessage="Route Exhaustion Action"
                    />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.routeExhaustionAction}
                    onChange={e =>
                      this.setState({ routeExhaustionAction: e.target.value })
                    }
                  >
                    <option value={"Forward"}>Forward</option>
                    <option value={"None"}>None</option>
                  </FormControl>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="routeExhaustionDestination"
                      defaultMessage="Route Exhaustion Destination"
                    />
                    {this.state.routeExhaustionAction === "Forward" && "\u002a"}
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    placeholder={"Phone Number"}
                    value={this.state.routeExhaustionDestination}
                    onKeyDown={validateInputPhoneNumber}
                    onChange={e =>
                      this.setState({
                        routeExhaustionDestination: e.target.value
                      })
                    }
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={5}>
                <ControlLabel>
                  <FormattedMessage
                    id="iadsFromSite"
                    defaultMessage="IAD's from main site"
                  />
                </ControlLabel>
                <Table striped hover className={"text-center"}>
                  <tbody>
                    {this.state.mainIadsAvalible.length
                      ? this.state.mainIadsAvalible.map((iad, i) => (
                          <tr key={i}>
                            <td></td>
                            <td
                              className={
                                "flex space-between align-items-center"
                              }
                            >
                              {iad.name}
                              <div className={"flex flex-direction-column"}>
                                {i !== 0 && (
                                  <Glyphicon
                                    glyph={`glyphicon glyphicon-menu-up`}
                                    className={"font-size-10"}
                                    onClick={() =>
                                      this.raisePriorityMainIadsAvalible(i)
                                    }
                                  />
                                )}
                                {this.state.mainIadsAvalible.length !==
                                  i + 1 && (
                                  <Glyphicon
                                    glyph={`glyphicon glyphicon-menu-down`}
                                    className={"font-size-10"}
                                    onClick={() =>
                                      this.lowerPriorityMainIadsAvalible(i)
                                    }
                                  />
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      : "Does not exist"}
                  </tbody>
                </Table>
              </Col>
              <Col mdOffset={2} md={5}>
                <ControlLabel>
                  <FormattedMessage
                    id="iadsFromOtherSite"
                    defaultMessage="IADs from other sites"
                  />
                </ControlLabel>
                <Table striped hover className={"text-center"}>
                  <tbody>
                    {this.state.otherIadsAvalible.length
                      ? this.state.otherIadsAvalible.map((iad, i) => (
                          <tr key={i}>
                            <td>
                              <Checkbox
                                className={"table-checkbox margin-left-08"}
                                checked={iad.checked}
                                onChange={e =>
                                  this.changeStatusOfOtherIadsAvalible(e, i)
                                }
                              />
                            </td>
                            <td
                              className={
                                "flex space-between align-items-center"
                              }
                            >
                              {iad.name}
                              <div className={"flex flex-direction-column"}>
                                {i !== 0 && (
                                  <Glyphicon
                                    glyph={`glyphicon glyphicon-menu-up`}
                                    className={"font-size-10"}
                                    onClick={() =>
                                      this.raisePriorityOtherIadsAvalible(i)
                                    }
                                  />
                                )}
                                {this.state.otherIadsAvalible.length !==
                                  i + 1 && (
                                  <Glyphicon
                                    glyph={`glyphicon glyphicon-menu-down`}
                                    className={"font-size-10"}
                                    onClick={() =>
                                      this.lowerPriorityOtherIadsAvalible(i)
                                    }
                                  />
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      : "Does not exist"}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="button-row">
                  <div className="pull-right">
                    <Button
                      onClick={this.createEnterpriseTrunkGroup}
                      type="submit"
                      className="btn-primary"
                      disabled={
                        (this.state.routeExhaustionAction === "Forward" &&
                          !this.state.routeExhaustionDestination) ||
                        this.state.disabledButton
                      }
                    >
                      <Glyphicon glyph="glyphicon glyphicon-ok" />
                      <FormattedMessage id="create" defaultMessage="Create" />
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

  createEnterpriseTrunkGroup = () => {
    const {
      otherIadsAvalible,
      mainIadsAvalible,
      routeExhaustionAction,
      routeExhaustionDestination,
      routingMode
    } = this.state;
    const checkedOtherIadsAvalible = otherIadsAvalible.filter(el => el.checked);
    const checkedMainIadsAvalible = mainIadsAvalible.filter(el => el.checked);
    const data = {
      iads_from_other_sites: checkedOtherIadsAvalible,
      main_iads_available: checkedMainIadsAvalible,
      routeExhaustionAction,
      routeExhaustionDestination,
      channelHunting: routingMode === "weighted" ? "Loadbalanced" : ""
    };
    const clearData = removeEmpty(data);
    this.setState({ disabledButton: true }, () =>
      this.props
        .fetchPostCreateEnterpriseTrunk(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          clearData
        )
        .then(res =>
          res === "created"
            ? this.props.history.push(
                `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}`,
                { defaultTab: 6 }
              )
            : this.setPraByIad()
        )
    );
  };

  changeStatusOfMainIadsAvalible = (e, i) => {
    const mainIadsAvalible = [...this.state.mainIadsAvalible];
    const elArr = mainIadsAvalible.splice(i, 1);
    const updatedElArr = { ...elArr[0], checked: e.target.checked };
    mainIadsAvalible.splice(i, 0, updatedElArr);
    this.setState({ mainIadsAvalible });
  };

  changeStatusOfOtherIadsAvalible = (e, i) => {
    const otherIadsAvalible = [...this.state.otherIadsAvalible];
    const elArr = otherIadsAvalible.splice(i, 1);
    const updatedElArr = { ...elArr[0], checked: e.target.checked };
    otherIadsAvalible.splice(i, 0, updatedElArr);
    this.setState({ otherIadsAvalible });
  };

  raisePriorityMainIadsAvalible = i => {
    const mainIadsAvalible = [...this.state.mainIadsAvalible];
    const elArrToUp = mainIadsAvalible.splice(i, 1);
    mainIadsAvalible.splice(i - 1, 0, elArrToUp[0]);
    this.setState({ mainIadsAvalible });
  };

  lowerPriorityMainIadsAvalible = i => {
    const mainIadsAvalible = [...this.state.mainIadsAvalible];
    const elArrToUp = mainIadsAvalible.splice(i, 1);
    mainIadsAvalible.splice(i + 1, 0, elArrToUp[0]);
    this.setState({ mainIadsAvalible });
  };

  raisePriorityOtherIadsAvalible = i => {
    const otherIadsAvalible = [...this.state.otherIadsAvalible];
    const elArrToUp = otherIadsAvalible.splice(i, 1);
    otherIadsAvalible.splice(i - 1, 0, elArrToUp[0]);
    this.setState({ otherIadsAvalible });
  };

  lowerPriorityOtherIadsAvalible = i => {
    const otherIadsAvalible = [...this.state.otherIadsAvalible];
    const elArrToUp = otherIadsAvalible.splice(i, 1);
    otherIadsAvalible.splice(i + 1, 0, elArrToUp[0]);
    this.setState({ otherIadsAvalible });
  };

  cancelClick = () => {
    this.props.history.push(
      `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}`
    );
  };
}

const mapStateToProps = state => ({
  listOfIads: state.listOfIads,
  config: state.config
});

const mapDispatchToProps = {
  fetchGetListOfIads,
  fetchPostCreateEnterpriseTrunk,
  fetchGetConfig
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddEntrepriseTrunk)
);
