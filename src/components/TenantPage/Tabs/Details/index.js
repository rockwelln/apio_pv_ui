import React, { Component } from "react";
import { connect } from "react-redux";

import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Checkbox from "react-bootstrap/lib/Checkbox";
import { Form } from "react-bootstrap";

import Loading from "../../../../common/Loading";

import { removeEmpty } from "../../../remuveEmptyInObject";

import {
  fetchPutUpdateTenantDetails,
  fetchGetTenantById
} from "../../../../store/actions";

class Details extends Component {
  state = {
    tenant: {},
    tenantName: "",
    defaultDomain: "",
    useTenantLanguages: "",
    useCustomRoutingProfile: "",
    isLoading: true,
    addressInformation: {}
  };

  componentDidMount() {
    this.props.fetchGetTenantById(this.props.tenantId).then(() =>
      this.setState({
        tenant: this.props.tenant,
        addressInformation: this.props.tenant.addressInformation
          ? this.props.tenant.addressInformation
          : {},
        isLoading: false
      })
    );
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
            <FormGroup controlId="useTenantLanguages">
              <Col mdOffset={3} md={9}>
                <Checkbox
                  defaultChecked={this.state.tenant.useTenantLanguages}
                  onChange={e =>
                    this.setState({ useTenantLanguages: e.target.checked })
                  }
                >
                  Use tenant languages
                </Checkbox>
              </Col>
            </FormGroup>
            <FormGroup controlId="useCustomRoutingProfile">
              <Col mdOffset={3} md={9}>
                <Checkbox
                  defaultChecked={this.state.tenant.useCustomRoutingProfile}
                  onChange={e =>
                    this.setState({ useCustomRoutingProfile: e.target.checked })
                  }
                >
                  Use custom routing profile
                </Checkbox>
              </Col>
            </FormGroup>
            <FormGroup controlId="tentantStreet">
              <Col componentClass={ControlLabel} md={3}>
                Addess
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="Street"
                  value={this.state.addressInformation.addressLine1}
                  onChange={e =>
                    this.setState({
                      addressInformation: {
                        ...this.state.addressInformation,
                        addressLine1: e.target.value
                      }
                    })
                  }
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="tentantZipCity">
              <Col mdOffset={3} md={3}>
                <FormControl
                  type="text"
                  placeholder="ZIP"
                  value={this.state.addressInformation.postalCode}
                  onChange={e =>
                    this.setState({
                      addressInformation: {
                        ...this.state.addressInformation,
                        postalCode: e.target.value
                      }
                    })
                  }
                />
              </Col>
              <Col md={6}>
                <FormControl
                  type="text"
                  placeholder="City"
                  value={this.state.addressInformation.city}
                  onChange={e =>
                    this.setState({
                      addressInformation: {
                        ...this.state.addressInformation,
                        city: e.target.value
                      }
                    })
                  }
                />
              </Col>
            </FormGroup>
          </FormGroup>
          <Col mdPush={10} md={1}>
            <Button onClick={this.updateTenant}>
              <Glyphicon glyph="glyphicon glyphicon-ok" />
              {` UPDATE`}
            </Button>
          </Col>
        </Form>
      </Col>
    );
  }

  updateTenant = () => {
    const {
      tenantName,
      defaultDomain,
      useTenantLanguages,
      useCustomRoutingProfile,
      addressInformation
    } = this.state;

    const data = {
      name: tenantName ? tenantName : this.state.tenant.name,
      defaultDomain: defaultDomain
        ? defaultDomain
        : this.state.tenant.defaultDomain,
      useTenantLanguages: useTenantLanguages
        ? useTenantLanguages
        : this.state.tenant.useTenantLanguages,
      useCustomRoutingProfile: useCustomRoutingProfile
        ? useCustomRoutingProfile
        : this.state.tenant.useCustomRoutingProfile,
      addressInformation
    };
    const clearData = removeEmpty(data);

    this.props.fetchPutUpdateTenantDetails(
      this.state.tenant.tenantId,
      clearData
    );
  };
}

const mapStateToProps = state => ({
  tenant: state.tenant
});

const mapDispatchToProps = {
  fetchGetTenantById,
  fetchPutUpdateTenantDetails
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
