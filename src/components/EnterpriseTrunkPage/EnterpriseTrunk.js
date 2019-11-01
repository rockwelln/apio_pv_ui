import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Table from "react-bootstrap/lib/Table";
import Checkbox from "react-bootstrap/lib/Checkbox";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Button from "react-bootstrap/lib/Button";
import ControlLabel from "react-bootstrap/lib/ControlLabel";

import { removeEmpty } from "../remuveEmptyInObject";

import {
  fetchGetIADsByTrunk,
  fetchPutUpdateEnterpriseTrunk
} from "../../store/actions";

import { FormattedMessage } from "react-intl";
import Loading from "../../common/Loading";

export class EnterpriseTrunk extends Component {
  state = {
    isLoading: false,
    iadFromSite: [],
    iadNotFromSite: []
  };
  componentDidMount() {
    this.props
      .fetchGetIADsByTrunk(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        this.props.match.params.entTrunkId
      )
      .then(() =>
        this.setState({
          isLoading: false,
          iadFromSite: this.props.iadsByTrunk
            ? this.props.iadsByTrunk.iadFromSite
            : [],
          iadNotFromSite: this.props.iadsByTrunk
            ? this.props.iadsByTrunk.iadNotFromSite
            : []
        })
      );
  }
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <div className={"panel-body"}>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <ControlLabel>
                <FormattedMessage id="name" defaultMessage="Name" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                placeholder={"Name"}
                disabled
                value={this.props.match.params.entTrunkId}
              />
            </div>
          </Col>
        </Row>
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
                type="text"
                placeholder={"Name"}
                disabled
                value={this.props.iadsByTrunk.routingMode}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={5}>
            <ControlLabel>
              <FormattedMessage
                id="iadsFromSite"
                defaultMessage="IADs from Site"
              />
            </ControlLabel>
            <Table striped hover className={"text-center"}>
              <tbody>
                {this.state.iadFromSite.map((iad, i) => (
                  <tr key={i}>
                    <td>
                      <Checkbox
                        className={"table-checkbox margin-left-08"}
                        checked={iad.checked}
                        disabled
                      />
                    </td>
                    <td className={"flex space-between align-items-center"}>
                      {iad.name}
                      <div className={"flex flex-direction-column"}>
                        {i !== 0 && (
                          <Glyphicon
                            glyph={`glyphicon glyphicon-menu-up`}
                            className={"font-size-10"}
                            onClick={() => this.raisePriorityFromSite(i)}
                          />
                        )}
                        {this.state.iadFromSite.length !== i + 1 && (
                          <Glyphicon
                            glyph={`glyphicon glyphicon-menu-down`}
                            className={"font-size-10"}
                            onClick={() => this.lowerPriorityFromSite(i)}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col mdOffset={2} md={5}>
            <ControlLabel>
              <FormattedMessage
                id="iadsFromOtherSite"
                defaultMessage="IADs from other Sites"
              />
            </ControlLabel>
            <Table striped hover className={"text-center"}>
              <tbody>
                {this.state.iadNotFromSite.map((iad, i) => (
                  <tr key={i}>
                    <td>
                      <Checkbox
                        className={"table-checkbox margin-left-08"}
                        checked={iad.checked}
                        onChange={e => this.changeStatusOfIadNotFromSite(e, i)}
                      />
                    </td>
                    <td className={"flex space-between align-items-center"}>
                      {iad.name}
                      <div className={"flex flex-direction-column"}>
                        {i !== 0 && (
                          <Glyphicon
                            glyph={`glyphicon glyphicon-menu-up`}
                            className={"font-size-10"}
                            onClick={() => this.raisePriorityNotFromSite(i)}
                          />
                        )}
                        {this.state.iadNotFromSite.length !== i + 1 && (
                          <Glyphicon
                            glyph={`glyphicon glyphicon-menu-down`}
                            className={"font-size-10"}
                            onClick={() => this.lowerPriorityNotFromSite(i)}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="button-row">
              <div className="pull-right">
                <Button
                  onClick={this.updateEnterpriseTrunkGroup}
                  type="submit"
                  className="btn-primary"
                >
                  <Glyphicon glyph="glyphicon glyphicon-ok" />
                  <FormattedMessage id="update" defaultMessage="Update" />
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  updateEnterpriseTrunkGroup = () => {
    const { iadNotFromSite } = this.state;
    const checkedIadNotFromSite = iadNotFromSite.filter(el => el.checked);
    console.log(checkedIadNotFromSite);
    const data = {
      iads_from_other_sites: checkedIadNotFromSite,
      routeExhaustionAction: this.props.iadsByTrunk.routeExhaustionAction,
      routeExhaustionDestination:
        this.props.iadsByTrunk.routeExhaustionAction === "Forward"
          ? this.props.iadsByTrunk.routeExhaustionDestination
          : null
    };
    const clearData = removeEmpty(data);
    this.props.fetchPutUpdateEnterpriseTrunk(
      this.props.match.params.tenantId,
      this.props.match.params.groupId,
      this.props.match.params.entTrunkId,
      clearData
    );
  };

  changeStatusOfIadNotFromSite = (e, i) => {
    const iadNotFromSite = [...this.state.iadNotFromSite];
    const elArr = iadNotFromSite.splice(i, 1);
    const updatedElArr = { ...elArr[0], checked: e.target.checked };
    iadNotFromSite.splice(i, 0, updatedElArr);
    this.setState({ iadNotFromSite });
  };

  raisePriorityFromSite = i => {
    const iadFromSite = [...this.state.iadFromSite];
    const elArrToUp = iadFromSite.splice(i, 1);
    iadFromSite.splice(i - 1, 0, elArrToUp[0]);
    this.setState({ iadFromSite });
  };

  lowerPriorityFromSite = i => {
    const iadFromSite = [...this.state.iadFromSite];
    const elArrToUp = iadFromSite.splice(i, 1);
    iadFromSite.splice(i + 1, 0, elArrToUp[0]);
    this.setState({ iadFromSite });
  };

  raisePriorityNotFromSite = i => {
    const iadNotFromSite = [...this.state.iadNotFromSite];
    const elArrToUp = iadNotFromSite.splice(i, 1);
    iadNotFromSite.splice(i - 1, 0, elArrToUp[0]);
    this.setState({ iadNotFromSite });
  };

  lowerPriorityNotFromSite = i => {
    const iadNotFromSite = [...this.state.iadNotFromSite];
    const elArrToUp = iadNotFromSite.splice(i, 1);
    iadNotFromSite.splice(i + 1, 0, elArrToUp[0]);
    this.setState({ iadNotFromSite });
  };
}

const mapStateToProps = state => ({
  iadsByTrunk: state.iadsByTrunk
});

const mapDispatchToProps = {
  fetchGetIADsByTrunk,
  fetchPutUpdateEnterpriseTrunk
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EnterpriseTrunk)
);
