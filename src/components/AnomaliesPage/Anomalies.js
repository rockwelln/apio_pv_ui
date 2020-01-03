import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Panel from "react-bootstrap/lib/Panel";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import { fetchGetAnomaly, fetchPutUpdateAnomaly } from "../../store/actions";
import { removeEmpty } from "../remuveEmptyInObject";
import DeleteModal from "./DeleteModal";
import { FormattedMessage } from "react-intl";
import Loading from "../../common/Loading";

export class Anomalies extends Component {
  state = { showDelete: false, isDisabled: true, anomaly: {}, isLoading: true };
  componentDidMount() {
    this.props
      .fetchGetAnomaly(this.props.match.params.anomalyHash)
      .then(() =>
        this.setState({ isLoading: false, anomaly: this.props.anomaly })
      );
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
              <FormattedMessage id="Anomaly" defaultMessage={`Anomaly`} />
              {this.state.isDisabled && (
                <Glyphicon
                  glyph="glyphicon glyphicon-pencil"
                  className={"margin-right-1 margin-left-1"}
                  onClick={() => this.setState({ isDisabled: false })}
                ></Glyphicon>
              )}
              <Glyphicon
                glyph="glyphicon glyphicon-trash"
                onClick={() => this.setState({ showDelete: true })}
              />
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
                    type="text"
                    disabled
                    value={this.state.anomaly.anomaly_event}
                  />
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
                    value={this.state.anomaly.apio_db_data}
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
                    id="anomaly_status"
                    defaultMessage="Anomaly status"
                  />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="number"
                    disabled={this.state.isDisabled}
                    value={this.state.anomaly.anomaly_status}
                    onChange={e =>
                      this.setState({
                        anomaly: {
                          ...this.state.anomaly,
                          anomaly_status: Number(e.target.value)
                        }
                      })
                    }
                  />
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
                    type="text"
                    disabled={this.state.isDisabled}
                    value={this.state.anomaly.assigned_team}
                    onChange={e =>
                      this.setState({
                        anomaly: {
                          ...this.state.anomaly,
                          assigned_team: e.target.value
                        }
                      })
                    }
                  />
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
                    type="text"
                    disabled={this.state.isDisabled}
                    value={this.state.anomaly.assigned_user}
                    onChange={e =>
                      this.setState({
                        anomaly: {
                          ...this.state.anomaly,
                          assigned_user: e.target.value
                        }
                      })
                    }
                  />
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
                    type="number"
                    disabled={this.state.isDisabled}
                    value={this.state.anomaly.result}
                    onChange={e =>
                      this.setState({
                        anomaly: {
                          ...this.state.anomaly,
                          result: Number(e.target.value)
                        }
                      })
                    }
                  />
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
                      >
                        <Glyphicon glyph="glyphicon glyphicon-ok" />
                        <FormattedMessage id="update" defaultMessage="Update" />
                      </Button>
                    </div>
                    <div className="pull-right margin-right-1">
                      <Button
                        onClick={() => this.setState({ isDisabled: true })}
                        type="submit"
                        className="btn-primary"
                      >
                        <Glyphicon glyph="glyphicon glyphicon-ok" />
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
    const clearData = removeEmpty(data);
    this.props.fetchPutUpdateAnomaly(
      this.props.match.params.anomalyHash,
      clearData
    );
  };
}

const mapStateToProps = state => ({
  anomaly: state.anomaly
});

const mapDispatchToProps = { fetchGetAnomaly, fetchPutUpdateAnomaly };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Anomalies)
);
