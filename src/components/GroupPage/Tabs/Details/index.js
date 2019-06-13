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
import { Form } from "react-bootstrap";

import Loading from "../../../../common/Loading";
import { fetchGetGroupById } from "../../../../store/actions";

class Details extends Component {
  state = {
    group: [],
    groupName: "",
    defaultDomain: "",
    isLoading: true
  };

  componentDidMount() {
    this.props
      .fetchGetGroupById(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() => this.setState({ group: this.props.group, isLoading: false }));
  }

  render() {
    const { isLoading, group } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <Col md={8}>
        <Form horizontal className={"margin-1"}>
          <FormGroup controlId="resellerSelect">
            <ControlLabel className={"margin-1"}>RESELLER</ControlLabel>
            <FormControl componentClass="select" placeholder="select">
              <option value="select">None</option>
            </FormControl>
          </FormGroup>
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
                  defaultValue={group.groupId}
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
                  defaultValue={group.groupName}
                  onChange={e => {
                    this.setState({ tenantName: e.target.value });
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="tentantStreet">
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                Addess
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="Street"
                  defaultValue={
                    group.addressInformation &&
                    `${group.addressInformation.addressLine1} ${
                      group.addressInformation.addressLine2
                    }`
                  }
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="tentantZipCity">
              <Col mdOffset={3} md={3}>
                <FormControl
                  type="text"
                  placeholder="ZIP"
                  defaultValue={
                    group.addressInformation &&
                    group.addressInformation.postalCode
                  }
                />
              </Col>
              <Col md={3}>
                <FormControl
                  type="text"
                  placeholder="City"
                  defaultValue={
                    group.addressInformation && group.addressInformation.city
                  }
                />
              </Col>
              <Col md={3}>
                <FormControl
                  type="text"
                  placeholder="Country"
                  defaultValue={
                    group.addressInformation && group.addressInformation.country
                  }
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
                  defaultValue={group.defaultDomain}
                  onChange={e => {
                    this.setState({ defaultDomain: e.target.value });
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
                  defaultValue={group.cliPhoneNumber}
                  disabled
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
                  defaultValue={group.cliName}
                  disabled
                />
              </Col>
            </FormGroup>
          </FormGroup>
          <Row>
            <Col mdPush={10} md={1}>
              <Button>
                <Glyphicon glyph="glyphicon glyphicon-ok" /> UPDATE
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    );
  }
}

const mapDispatchToProps = {
  fetchGetGroupById
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
