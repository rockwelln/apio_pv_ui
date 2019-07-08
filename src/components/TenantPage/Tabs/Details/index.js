import React, { Component } from "react";

import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import { Form } from "react-bootstrap";

import Loading from "../../../../common/Loading";

class Details extends Component {
  state = {
    tenant: [],
    tenantName: "",
    defaultDomain: "",
    useTenantLanguages: null,
    useCustomRoutingProfile: null
  };

  componentDidMount() {
    this.setState({ tenant: this.props.tenant });
  }

  render() {
    if (this.props.isLoading) {
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
            <FormGroup controlId="tentantID">
              <Col componentClass={ControlLabel} md={3}>
                ID
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="Tenant ID"
                  disabled
                  defaultValue={this.state.tenant.tenantId}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="tentantName">
              <Col componentClass={ControlLabel} md={3}>
                Name
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="Tenant name"
                  defaultValue={this.state.tenant.name}
                  onChange={e => {
                    this.setState({ tenantName: e.target.value });
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="defaultDomain">
              <Col componentClass={ControlLabel} md={3}>
                Domain
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="Tenant name"
                  defaultValue={this.state.tenant.defaultDomain}
                  onChange={e => {
                    this.setState({ defaultDomain: e.target.value });
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="tentantStreet">
              <Col componentClass={ControlLabel} md={3}>
                Addess
              </Col>
              <Col md={9}>
                <FormControl type="text" placeholder="Street" />
              </Col>
            </FormGroup>
            <FormGroup controlId="tentantZipCity">
              <Col mdOffset={3} md={3}>
                <FormControl type="text" placeholder="ZIP" />
              </Col>
              <Col md={6}>
                <FormControl type="text" placeholder="City" />
              </Col>
            </FormGroup>
          </FormGroup>
          <Col mdPush={10} md={1}>
            <Button>
              <Glyphicon glyph="glyphicon glyphicon-ok" /> UPDATE
            </Button>
          </Col>
        </Form>
      </Col>
    );
  }
}

export default Details;
