import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";

import TenantTemplate from "../../common/TenantTemplate";
import Loading from "../../common/Loading";

import {
  fetchGetTamplatesOfTenant,
  changeTemplateOfTenant,
  changeStepOfCreateTenant,
  refuseCreateTenant,
  fetchPostCreateTenant
} from "../../store/actions";

export class Template extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.props
      .fetchGetTamplatesOfTenant()
      .then(() => this.setState({ isLoading: false }));
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.createTenant.templateName &&
      this.props.createTenant.templateName
    ) {
      this.props
        .fetchPostCreateTenant(this.props.createTenant)
        .then(res =>
          res
            ? this.props.changeStepOfCreateTenant("Limits")
            : this.props.changeStepOfCreateTenant("Template")
        );
    }
  }
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <Row>
          <Col md={12}>
            <p className={"header"}>
              ADD TENANT: template
              <Link to={`/provisioning/broadsoft_xsp1_as1/tenants`}>
                <Glyphicon
                  className={"margin-1 smaller"}
                  glyph="glyphicon glyphicon-remove"
                  onClick={() => this.props.refuseCreateTenant()}
                />
              </Link>
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className={"smaller"}>
              Withc template do you wish to use? A template determines which
              service packs and group services will be assigned to the tenant.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12} className={"flex-row"}>
            {this.props.templatesOfTenant.map((template, i) => (
              <TenantTemplate
                key={i + ""}
                name={template.name}
                description={template.description}
                onClick={() => this.selectTemplate(template.name)}
              />
            ))}
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Button onClick={this.backButtonClick}>
              <Glyphicon glyph="glyphicon glyphicon-backward"> BACK</Glyphicon>
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  selectTemplate = name => {
    this.props.changeTemplateOfTenant(name);
  };

  backButtonClick = () => {
    this.props.changeStepOfCreateTenant("Basic");
  };
}

const mapStateToProps = state => ({
  templatesOfTenant: state.templatesOfTenant,
  createTenant: state.createTenant
});

const mapDispatchToProps = {
  fetchGetTamplatesOfTenant,
  changeTemplateOfTenant,
  changeStepOfCreateTenant,
  refuseCreateTenant,
  fetchPostCreateTenant
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Template);
