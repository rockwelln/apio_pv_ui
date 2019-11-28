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

import { FormattedMessage } from "react-intl";

import { fetchGetListOfIads } from "../../store/actions";

export class AddEntrepriseTrunk extends Component {
  state = {
    routeExhaustionAction: "None",
    routeExhaustionDestination: "",
    routingMode: ""
  };

  componentDidMount() {
    this.props.fetchGetListOfIads(
      this.props.match.params.tenantId,
      this.props.match.params.groupId
    );
  }
  render() {
    console.log(this.props.listOfIads);
    return (
      <React.Fragment>
        <Panel className={"margin-0"}>
          <Panel.Heading>
            <div className={"header"}>
              <FormattedMessage
                id="addEnterprises"
                defaultMessage="ADD ENTREPRISES"
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
                    onChange={e =>
                      this.setState({
                        routeExhaustionDestination: e.target.value
                      })
                    }
                  />
                </div>
              </Col>
            </Row>
          </Panel.Body>
        </Panel>
      </React.Fragment>
    );
  }

  cancelClick = () => {
    this.props.history.push(
      `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}`
    );
  };
}

const mapStateToProps = state => ({ listOfIads: state.listOfIads });

const mapDispatchToProps = { fetchGetListOfIads };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddEntrepriseTrunk)
);
