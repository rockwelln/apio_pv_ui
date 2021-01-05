import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Panel from "react-bootstrap/lib/Panel";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import {
  fetchGetAnomaly,
  fetchPutUpdateAnomaly,
  fetchGetConfig,
  fetchGetReconciliationTeams,
  fetchGetTeam
} from "../../store/actions";
import { removeEmpty } from "../remuveEmptyInObject";
import DeleteModal from "./DeleteModal";
import { FormattedMessage } from "react-intl";
import Loading from "../../common/Loading";

import { isAllowed, pages } from "../../utils/user";

export class Anomalies extends Component {
  state = {
    showDelete: false,
    isDisabled: true,
    anomaly: {},
    isLoading: true,
    isLoadingConfig: true,
    disableUpdateButton: false,
    isLoadingRT: true,
    isLoadingTeam: true
  };

  fetchReq = () => {
    this.props
      .fetchGetConfig()
      .then(() => this.setState({ isLoadingConfig: false }));
    this.props.fetchGetAnomaly(this.props.match.params.anomalyHash).then(() => {
      this.setState({ isLoading: false, anomaly: this.props.anomaly });
      if (this.props.anomaly.assigned_team) {
        this.props
          .fetchGetTeam(this.props.anomaly.assigned_team)
          .then(() => this.setState({ isLoadingTeam: false }));
      }
    });
    this.props
      .fetchGetReconciliationTeams()
      .then(this.setState({ isLoadingRT: false }));
  };

  componentDidMount() {
    this.fetchReq();
  }
  render() {
    if (
      this.state.isLoading ||
      this.state.isLoadingConfig ||
      this.state.isLoadingRT ||
      (this.props.anomaly.assigned_team && this.state.isLoadingTeam)
    ) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <Panel className={"margin-0"}>
          <Panel.Heading>
            <div className={"header"}>
              <FormattedMessage id="Anomaly" defaultMessage={`Anomaly`} />
              {this.state.isDisabled && (
                <Glyphicon
                  glyph="glyphicon glyphicon-pencil"
                  className={"margin-right-1 margin-left-1"}
                  onClick={() => this.setState({ isDisabled: false })}
                ></Glyphicon>
              )}
              {isAllowed(
                localStorage.getItem("userProfile"),
                pages.delete_reconciliation_anomaly
              ) && (
                <Glyphicon
                  glyph="glyphicon glyphicon-trash"
                  onClick={() => this.setState({ showDelete: true })}
                />
              )}
              <DeleteModal
                anomalyHash={this.props.match.params.anomalyHash}
                show={this.state.showDelete}
                onClose={() => {
                  this.setState({ showDelete: false });
                }}
              />
            </div>
          </Panel.Heading>
          <Panel.Body>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage
                    id="enterpriseId"
                    defaultMessage="Enterprise ID"
                  />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    disabled
                    value={this.state.anomaly.enterprise_id}
                  />
                </div>
                {this.state.anomaly.enterprise_id ? (
                  <div className={"margin-right-1 flex-basis-33"}>
                    <Link
                      to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.state.anomaly.enterprise_id}`}
                      target="_blank"
                    >
                      <FormattedMessage
                        id="goToEnterprise"
                        defaultMessage="Go to enterprise"
                      />
                    </Link>
                  </div>
                ) : null}
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage id="groupId" defaultMessage="Group ID" />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    disabled
                    value={this.state.anomaly.group_id}
                  />
                </div>
                {this.state.anomaly.group_id ? (
                  <div className={"margin-right-1 flex-basis-33"}>
                    <Link
                      to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.state.anomaly.enterprise_id}/groups/${this.state.anomaly.group_id}`}
                      target="_blank"
                    >
                      <FormattedMessage
                        id="goToGroup"
                        defaultMessage="Go to group"
                      />
                    </Link>
                  </div>
                ) : null}
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage id="iadId" defaultMessage="IAD ID" />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    disabled
                    value={this.state.anomaly.iad_id}
                  />
                </div>
                {this.state.anomaly.iad_id ? (
                  <div className={"margin-right-1 flex-basis-33"}>
                    <Link
                      to={`/provisioning/${
                        this.props.match.params.gwName
                      }/tenants/${this.state.anomaly.enterprise_id}/groups/${
                        this.state.anomaly.group_id
                      }/iad/${
                        this.state.anomaly.iad_id.slice(0, 2) === "DP"
                          ? `TG${this.state.anomaly.iad_id.slice(
                              2,
                              this.state.anomaly.iad_id.length
                            )}`
                          : this.state.anomaly.iad_id
                      }`}
                      target="_blank"
                    >
                      <FormattedMessage
                        id="goToIAD"
                        defaultMessage="Go to IAD"
                      />
                    </Link>
                  </div>
                ) : null}
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage
                    id="anomaly_event"
                    defaultMessage="Anomaly event"
                  />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    defaultValue={this.state.anomaly.anomaly_event}
                    onChange={e =>
                      this.setState({
                        anomaly: {
                          ...this.state.anomaly,
                          anomaly_event: Number(e.target.value)
                        }
                      })
                    }
                    disabled={this.state.isDisabled}
                  >
                    <option value="">none</option>
                    {this.props.config.reconciliation.anomaly.event.map(
                      (type, i) => (
                        <option key={i} value={type.value}>
                          {type.label}
                        </option>
                      )
                    )}
                  </FormControl>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage
                    id="creation_date"
                    defaultMessage="Creation date"
                  />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    disabled
                    value={this.state.anomaly.creation_date}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage id="norm_data" defaultMessage="Norm data" />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="textarea"
                    disabled
                    value={this.state.anomaly.norm_data}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage
                    id="apio_db_data"
                    defaultMessage="APIO DB data"
                  />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="textarea"
                    disabled
                    value={this.state.anomaly.apio_data}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage
                    id="broadsoft_data"
                    defaultMessage="Broadsoft data"
                  />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="textarea"
                    disabled
                    value={this.state.anomaly.broadsoft_data}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage
                    id="additional_description"
                    defaultMessage="Additional Description"
                  />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="textarea"
                    disabled
                    value={this.state.anomaly.additional_description}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage
                    id="anomaly_status"
                    defaultMessage="Anomaly status"
                  />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    defaultValue={this.state.anomaly.anomaly_status}
                    onChange={e =>
                      this.setState({
                        anomaly: {
                          ...this.state.anomaly,
                          anomaly_status: Number(e.target.value)
                        }
                      })
                    }
                    disabled={this.state.isDisabled}
                  >
                    <option value="">none</option>
                    {this.props.config.reconciliation.anomaly.status.map(
                      (type, i) => (
                        <option key={i} value={type.value}>
                          {type.label}
                        </option>
                      )
                    )}
                  </FormControl>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage
                    id="assigned_team"
                    defaultMessage="Assigned team"
                  />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.anomaly.assigned_team}
                    onChange={e => this.changeAssignedTeam(e.target.value)}
                    disabled={this.state.isDisabled}
                  >
                    {this.props.anomaly.assigned_team ? null : (
                      <option value="">none</option>
                    )}
                    {this.props.reconciliationTeams.map((team, i) => (
                      <option key={i} value={team.name}>
                        {team.name}
                      </option>
                    ))}
                  </FormControl>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage
                    id="assigned_user"
                    defaultMessage="Assigned user"
                  />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.anomaly.assigned_user}
                    onChange={e =>
                      this.setState({
                        anomaly: {
                          ...this.state.anomaly,
                          assigned_user: e.target.value
                        }
                      })
                    }
                    disabled={
                      this.state.isDisabled || !this.state.anomaly.assigned_team
                    }
                  >
                    <option value="">none</option>
                    {this.props.team.users.map((user, i) => (
                      <option key={i} value={user.username}>
                        {user.username}
                      </option>
                    ))}
                  </FormControl>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage
                    id="assigned_user_date"
                    defaultMessage="Assigned user date"
                  />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    disabled
                    value={this.state.anomaly.assigned_user_date}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage
                    id="last_update_date"
                    defaultMessage="Last update date"
                  />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    disabled
                    value={this.state.anomaly.last_update_date}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage id="result" defaultMessage="Result" />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.anomaly.result}
                    onChange={e =>
                      this.setState({
                        anomaly: {
                          ...this.state.anomaly,
                          result: e.target.value
                            ? Number(e.target.value)
                            : e.target.value
                        }
                      })
                    }
                    disabled={this.state.isDisabled}
                  >
                    {isNaN(this.props.anomaly.result) && (
                      <option value="">none</option>
                    )}
                    {this.props.config.reconciliation.anomaly.result.map(
                      (type, i) => (
                        <option key={i} value={type.value}>
                          {type.label}
                        </option>
                      )
                    )}
                  </FormControl>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage id="comments" defaultMessage="Comments" />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="textarea"
                    disabled={this.state.isDisabled}
                    value={this.state.anomaly.comments}
                    onChange={e =>
                      this.setState({
                        anomaly: {
                          ...this.state.anomaly,
                          comments: e.target.value
                        }
                      })
                    }
                  />
                </div>
              </Col>
            </Row>
            {!this.state.isDisabled && (
              <Row>
                <Col md={12}>
                  <div className="button-row">
                    <div className="pull-right">
                      <Button
                        onClick={this.anomalyUpdate}
                        type="submit"
                        className="btn-primary"
                        disabled={this.state.disableUpdateButton}
                      >
                        <Glyphicon glyph="glyphicon glyphicon-ok" />
                        {this.state.disableUpdateButton ? (
                          <FormattedMessage
                            id="updating"
                            defaultMessage="Updating..."
                          />
                        ) : (
                          <FormattedMessage
                            id="update"
                            defaultMessage="Update"
                          />
                        )}
                      </Button>
                    </div>
                    <div className="pull-right margin-right-1">
                      <Button
                        onClick={() => {
                          this.setState({ isDisabled: true });
                          this.fetchReq();
                        }}
                        type="submit"
                        className="btn-primary"
                      >
                        <FormattedMessage id="cancel" defaultMessage="Cancel" />
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            )}
          </Panel.Body>
        </Panel>
      </React.Fragment>
    );
  }

  changeAssignedTeam = value => {
    this.setState(
      {
        anomaly: {
          ...this.state.anomaly,
          assigned_team: value,
          assigned_user: ""
        }
      },
      () => {
        if (value) {
          this.props.fetchGetTeam(value);
        }
      }
    );
  };

  anomalyUpdate = () => {
    const {
      anomaly_status,
      assigned_team,
      assigned_user,
      result,
      comments
    } = this.state.anomaly;
    const data = {
      anomaly_status,
      assigned_team,
      assigned_user,
      result,
      comments
    };
    //const clearData = removeEmpty(data);
    const clearData = data;  // comments and assigned_user can be empty.

    this.setState({ disableUpdateButton: true }, () =>
      this.props
        .fetchPutUpdateAnomaly(this.props.match.params.anomalyHash, clearData)
        .then(
          res =>
            res === "success" &&
            this.setState(
              { isDisabled: true, disableUpdateButton: false },
              () => this.fetchReq()
            )
        )
    );
  };
}

const mapStateToProps = state => ({
  anomaly: state.anomaly,
  config: state.config,
  reconciliationTeams: state.reconciliationTeams,
  team: state.team
});

const mapDispatchToProps = {
  fetchGetAnomaly,
  fetchPutUpdateAnomaly,
  fetchGetConfig,
  fetchGetReconciliationTeams,
  fetchGetTeam
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Anomalies)
);
