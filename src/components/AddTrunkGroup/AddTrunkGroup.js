import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
  fetchGetPhoneTypes,
  fetchPostCreateTrunkGroup
} from "../../store/actions";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import FormGroup from "react-bootstrap/lib/FormGroup";

import Loading from "../../common/Loading";

import { removeEmpty } from "../remuveEmptyInObject";

export class AddTrunkGroup extends Component {
  state = {
    name: "",
    deviceName: "",
    deviceType: "",
    isLoading: true,
    nameError: null,
    isDisabled: false
  };

  componentDidMount() {
    this.props
      .fetchGetPhoneTypes()
      .then(() =>
        this.setState({ isLoading: false, phoneTypes: this.props.phoneTypes })
      );
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <div className={"header"}>{`Add a new local user`}</div>
        </div>
        <div className={"panel-body"}>
          <FormGroup controlId="name" validationState={this.state.nameError}>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  Name{"\u002a"}
                </div>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.name}
                    onChange={e =>
                      this.setState({ name: e.target.value, nameError: null })
                    }
                  />
                </div>
              </Col>
            </Row>
            {this.state.nameError && (
              <Row className={"margin-0 margin-top-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-16"} />
                  <HelpBlock className={"margin-0 flex flex-basis-33"}>
                    Field is required
                  </HelpBlock>
                </Col>
              </Row>
            )}
          </FormGroup>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                Device Name
              </div>
              <div className={"margin-right-1 flex flex-basis-33"}>
                <FormControl
                  type="text"
                  value={this.state.deviceName}
                  onChange={e => this.setState({ deviceName: e.target.value })}
                />
              </div>
            </Col>
          </Row>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                Device Type
              </div>
              <div className={"margin-right-1 flex flex-basis-33"}>
                <FormControl
                  componentClass="select"
                  value={this.state.deviceType}
                  onChange={e => this.setState({ deviceType: e.target.value })}
                >
                  <option key={"none"} value={""}>
                    {"none"}
                  </option>
                  {this.state.phoneTypes.map(type => (
                    <option key={type.technicalName} value={type.technicalName}>
                      {type.displayName}
                    </option>
                  ))}
                </FormControl>
              </div>
            </Col>
          </Row>
          <Row className={"margin-top-1"}>
            <Col md={12}>
              <div className="button-row">
                <div className="pull-right">
                  <Button
                    className={"btn-primary"}
                    onClick={this.createTrunk}
                    disabled={this.state.isDisabled}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }

  createTrunk = () => {
    const { name, deviceName, deviceType } = this.state;
    if (!name) {
      this.setState({ nameError: "error" });
      return;
    }
    const data = removeEmpty({
      name: name,
      accessDeviceInfo: {
        deviceName,
        deviceType
      }
    });
    this.setState({ isDisabled: true }, () =>
      this.props
        .fetchPostCreateTrunkGroup(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          data
        )
        .then(res => {
          res === "success"
            ? this.props.history.push(
                `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}/trunkgroup/${this.props.createdTrunkGroup.name}`
              )
            : this.setState({ isDisabled: false });
        })
    );
  };
}

const mapStateToProps = state => ({
  phoneTypes: state.phoneTypes,
  createdTrunkGroup: state.createdTrunkGroup
});

const mapDispatchToProps = { fetchGetPhoneTypes, fetchPostCreateTrunkGroup };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddTrunkGroup)
);
