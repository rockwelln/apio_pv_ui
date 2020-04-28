import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import { Form } from "react-bootstrap";

import Loading from "../../../../common/Loading";
import {
  fetchGetGroupById,
  fetchPutUpdateGroupDetails
} from "../../../../store/actions";

import { get } from "../../../get";

class Details extends Component {
  state = {
    group: [],
    isLoading: true,
    updateMassage: ""
  };

  componentDidMount() {
    this.props
      .fetchGetGroupById(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() =>
        this.setState({
          group: this.props.group,
          isLoading: false
        })
      );
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { isLoading, group, updateMassage } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <Col md={8}>
        <Form horizontal className={"margin-1"}>
          <FormGroup controlId="Details">
            <ControlLabel className={"margin-1"}>DETAILS</ControlLabel>
            <FormGroup controlId="groupID">
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                ID
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="Group ID"
                  disabled
                  defaultValue={this.props.match.params.groupId}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="groupName">
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                Name
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="Group name"
                  value={get(group, "groupName") ? group.groupName : ""}
                  onChange={e => {
                    this.setState({
                      group: { ...this.state.group, groupName: e.target.value }
                    });
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="tentantStreet">
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                Address
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="Street"
                  value={`${
                    get(group, "addressInformation.addressLine1")
                      ? group.addressInformation.addressLine1
                      : ""
                  }`}
                  onChange={e => {
                    this.setState({
                      group: {
                        ...this.state.group,
                        addressInformation: {
                          ...this.state.group.addressInformation,
                          addressLine1: e.target.value
                        }
                      }
                    });
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="tentantZipCity">
              <Col mdOffset={3} md={3}>
                <FormControl
                  type="text"
                  placeholder="ZIP"
                  value={
                    get(group, "addressInformation.postalCode")
                      ? group.addressInformation.postalCode
                      : ""
                  }
                  onChange={e => {
                    this.setState({
                      group: {
                        ...this.state.group,
                        addressInformation: {
                          ...this.state.group.addressInformation,
                          postalCode: e.target.value
                        }
                      }
                    });
                  }}
                />
              </Col>
              <Col md={3}>
                <FormControl
                  type="text"
                  placeholder="City"
                  value={
                    get(group, "addressInformation.city")
                      ? group.addressInformation.city
                      : ""
                  }
                  onChange={e => {
                    this.setState({
                      group: {
                        ...this.state.group,
                        addressInformation: {
                          ...this.state.group.addressInformation,
                          city: e.target.value
                        }
                      }
                    });
                  }}
                />
              </Col>
              <Col md={3}>
                <FormControl
                  type="text"
                  placeholder="Country"
                  value={
                    get(group, "addressInformation.country")
                      ? group.addressInformation.country
                      : ""
                  }
                  onChange={e => {
                    this.setState({
                      group: {
                        ...this.state.group,
                        addressInformation: {
                          ...this.state.group.addressInformation,
                          country: e.target.value
                        }
                      }
                    });
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="defaultDomain">
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                Default Domain
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="Default Domain"
                  value={get(group, "defaultDomain") ? group.defaultDomain : ""}
                  onChange={e => {
                    this.setState({
                      group: {
                        ...this.state.group,
                        defaultDomain: e.target.value
                      }
                    });
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="cliPhoneNumber">
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                Calling Line Number
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="Calling Line Id Name"
                  defaultValue={
                    get(group, "cliPhoneNumber") ? group.cliPhoneNumber : ""
                  }
                  onChange={e => {
                    this.setState({
                      group: {
                        ...this.state.group,
                        cliPhoneNumber: e.target.value
                      }
                    });
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="cliName">
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                Calling Line Name
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="Calling Line Id Name"
                  defaultValue={get(group, "cliName") ? group.cliName : ""}
                  onChange={e => {
                    this.setState({
                      group: {
                        ...this.state.group,
                        cliName: e.target.value
                      }
                    });
                  }}
                />
              </Col>
            </FormGroup>
            <Col mdOffset={3} md={9}>
              {updateMassage && (
                <HelpBlock
                  bsClass={`${
                    updateMassage === "Loading..."
                      ? "color-info"
                      : "color-success"
                  }`}
                >
                  {updateMassage}
                </HelpBlock>
              )}
            </Col>
          </FormGroup>
          <Row>
            <Col mdPush={10} md={1}>
              <Button onClick={this.updateGroupDetails}>
                <Glyphicon glyph="glyphicon glyphicon-ok" /> UPDATE
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    );
  }

  updateGroupDetails = () => {
    const { group } = this.state;
    const data = {
      ...group
    };
    this.setState({ updateMassage: "Loading..." }, () =>
      this.props
        .fetchPutUpdateGroupDetails(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          data
        )
        .then(() =>
          this.setState(
            { updateMassage: "Group details is updated" },
            () =>
              (this.timer = setTimeout(
                () => this.setState({ updateMassage: "" }),
                3000
              ))
          )
        )
    );
  };
}

const mapDispatchToProps = {
  fetchGetGroupById,
  fetchPutUpdateGroupDetails
};

const mapStateToProps = state => ({
  group: state.group
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Details)
);
