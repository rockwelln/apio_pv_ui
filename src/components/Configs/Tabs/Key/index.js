import React, { Component } from "react";
import { connect } from "react-redux";

import {
  fetchGetApplications,
  fetchGetKeysByApplication,
  fetchGetValueOfKey,
  fetchPutUpdateKey,
  fetchDeleteKey
} from "../../../../store/actions";

import FormControl from "react-bootstrap/lib/FormControl";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import Loading from "../../../../common/Loading";

import AddKeyForm from "./AddKeyForm";
import { timingSafeEqual } from "crypto";

export class KeyTab extends Component {
  state = {
    isLoading: true,
    selectedApplication: "none",
    applications: [],
    applicationKeys: [],
    selectedKey: "none",
    keyValue: null,
    data: ""
  };
  componentDidMount() {
    this.props.fetchGetApplications().then(() =>
      this.setState({
        isLoading: false,
        applications: this.props.applications
      })
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.applicationKeys.length !== this.props.applicationKeys.length
    ) {
      this.props
        .fetchGetKeysByApplication(this.state.selectedApplication)
        .then(() =>
          this.setState({ applicationKeys: this.props.applicationKeys })
        );
    }
    if (prevState.selectedKey !== this.state.selectedKey) {
      this.setState({ keyValue: null });
    }
    if (prevState.selectedApplication !== this.state.selectedApplication) {
      this.setState({ applicationKeys: [] });
    }
  }
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Row className={"margin-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              Application name:
            </div>
            <div>
              <FormControl
                componentClass="select"
                value={this.state.selectedApplication}
                onChange={e =>
                  this.setState(
                    { selectedApplication: e.target.value },
                    () =>
                      this.state.selectedApplication !== "none" &&
                      this.props
                        .fetchGetKeysByApplication(
                          this.state.selectedApplication
                        )
                        .then(() =>
                          this.setState({
                            applicationKeys: this.props.applicationKeys
                          })
                        )
                  )
                }
              >
                <option key={"none"} value={"none"}>
                  {"none"}
                </option>
                {this.state.applications.map(app => (
                  <option key={app.applicationId} value={app.applicationId}>
                    {app.applicationId}
                  </option>
                ))}
              </FormControl>
            </div>
          </Col>
        </Row>
        {this.state.selectedApplication !== "none" &&
          !!this.state.applicationKeys.length && (
            <React.Fragment>
              <Row className={"margin-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-33"}>
                    Key:
                  </div>
                  <div>
                    <FormControl
                      componentClass="select"
                      value={this.state.selectedKey}
                      onChange={e =>
                        this.setState({ selectedKey: e.target.value }, () =>
                          this.props
                            .fetchGetValueOfKey(
                              this.state.selectedApplication,
                              this.state.selectedKey
                            )
                            .then(() =>
                              this.setState({
                                keyValue: this.props.keyValue,
                                data: this.props.keyValue.data
                              })
                            )
                        )
                      }
                    >
                      <option key={"none"} value={"none"}>
                        {"none"}
                      </option>
                      {this.state.applicationKeys.map(key => (
                        <option key={key.key} value={key.key}>
                          {key.key}
                        </option>
                      ))}
                    </FormControl>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div className="button-row">
                    <div className="pull-left">
                      <Button
                        className={"btn-primary"}
                        onClick={() => this.setState({ showModal: true })}
                        disabled={this.state.selectedApplication === "none"}
                      >
                        Add Key
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              {this.state.keyValue && (
                <React.Fragment>
                  <Row className={"margin-1"}>
                    <Col md={12} className={"flex align-items-center"}>
                      <div className={"margin-right-1 flex flex-basis-33"}>
                        Data
                      </div>
                      <div className={"flex flex-basis-66"}>
                        <FormControl
                          componentClass="textarea"
                          className={"height-30"}
                          value={this.state.data}
                          onChange={e => {
                            this.setState({
                              data: e.target.value
                            });
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <div className="button-row">
                        <div className="pull-left">
                          <Button
                            className={"btn-danger"}
                            onClick={() => this.onDelete()}
                          >
                            DELETE
                          </Button>
                        </div>
                        <div className="pull-right">
                          <Button
                            className={"btn-primary"}
                            onClick={() =>
                              this.props.fetchPutUpdateKey(
                                this.state.selectedApplication,
                                this.state.selectedKey,
                                { data: this.state.data }
                              )
                            }
                          >
                            UPDATE
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        <AddKeyForm
          show={this.state.showModal}
          application={this.state.selectedApplication}
          onClose={() => this.setState({ showModal: false })}
          onAdd={() =>
            this.setState({ showModal: false }, () =>
              this.props
                .fetchGetKeysByApplication(this.state.selectedApplication)
                .then(() =>
                  this.setState({
                    applicationKeys: this.props.applicationKeys
                  })
                )
            )
          }
        />
      </React.Fragment>
    );
  }
  onDelete = () => {
    this.props
      .fetchDeleteKey(this.state.selectedApplication, this.state.selectedKey)
      .then(
        res =>
          res === "deleted" &&
          this.setState({ selectedKey: "none", keyValue: null }, () =>
            this.props.fetchGetKeysByApplication(this.state.selectedApplication)
          )
      );
  };
}

const mapStateToProps = state => ({
  applications: state.applications,
  applicationKeys: state.applicationKeys,
  keyValue: state.keyValue
});

const mapDispatchToProps = {
  fetchGetApplications,
  fetchGetKeysByApplication,
  fetchGetValueOfKey,
  fetchPutUpdateKey,
  fetchDeleteKey
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyTab);
