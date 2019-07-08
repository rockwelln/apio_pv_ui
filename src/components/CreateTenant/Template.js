import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Radio from "react-bootstrap/lib/Radio";

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
    isLoading: true,
    creating: ""
  };

  componentDidMount() {
    this.props
      .fetchGetTamplatesOfTenant()
      .then(() => this.setState({ isLoading: false }));
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
                <Button
                  disabled={this.state.creating}
                  className={"margin-left-1"}
                  onClick={() => this.props.refuseCreateTenant()}
                >
                  Cancel
                </Button>
              </Link>
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className={"smaller"}>
              Please select a Tenant template. This template will influence they
              way your tenant will be configured. (service pack definition,
              service (pack) authorisation, feature access code definition.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12} className={"flex-row"}>
            <FormGroup>
              <Radio
                name="radioGroup"
                checked={this.props.createTenant.templateName ? 0 : 1}
                onClick={() => this.selectTemplate("")}
              >
                <div className="font-weight-bold flex">no template</div>
              </Radio>
              {this.props.templatesOfTenant.map((template, i) => (
                <Radio
                  key={i + ""}
                  name="radioGroup"
                  onClick={() => this.selectTemplate(template.name)}
                >
                  <div className={"flex-row"}>
                    <div className="font-weight-bold">{`${template.name}`}</div>
                    <div>
                      {template.description ? `: ${template.description}` : ""}
                    </div>
                  </div>
                </Radio>
              ))}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={1}>
            <Button
              onClick={this.backButtonClick}
              disabled={this.state.creating}
            >
              <Glyphicon
                glyph="glyphicon glyphicon-backward"
                style={{ display: "flex", lineHeight: "20px" }}
              >
                <div
                  className={"margin-left-1"}
                  style={{
                    fontFamily: `"Helvetica Neue",Helvetica,Arial,sans-serif`
                  }}
                >
                  BACK
                </div>
              </Glyphicon>
            </Button>
          </Col>
          <Col mdOffset={10} md={1}>
            <Button
              disabled={this.state.creating}
              onClick={this.createButtonClick}
            >
              {this.state.creating ? this.state.creating : "CREATE"}
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  createButtonClick = () => {
    this.setState({ creating: "Creating..." }, () => {
      this.props
        .fetchPostCreateTenant(this.props.createTenant)
        .then(res =>
          res
            ? this.props.changeStepOfCreateTenant("Created")
            : this.setState({ creating: "" })
        );
    });
  };

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
