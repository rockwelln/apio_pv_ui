import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

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
        <div className={"panel-heading"}>
          <Row>
            <Col md={12}>
              <div className={"header"}>
                Add tenant: select template
                <Link
                  to={`/provisioning/${this.props.match.params.gwName}/tenants`}
                >
                    <Button
                      disabled={this.state.creating}
                      className={"margin-left-1 btn-danger"}
                      onClick={() => this.props.refuseCreateTenant()}
                    >
                      Cancel
                    </Button>
                  </Link>
              </div>
            </Col>
          </Row>
          </div>
          <div class="panel-body">
            <Row>
            <Col md={12}>
              <p>
                Please select a Tenant template. This template will influence the
                way your tenant will be configured. A template determines the service pack definition,
                service (pack) authorisation, feature access code definition, etc.
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
            <div class="button-row">
              <div class="pull-left">
                <Button
                  onClick={this.backButtonClick}
                  disabled={this.state.creating}
                  className={"btn-primary"}
                >
                <Glyphicon
                    glyph="glyphicon glyphicon-backward"
                  >
                  </Glyphicon>
                  &nbsp; Back
                </Button>
              </div>
              <div class="pull-right">
                <Button
                  disabled={this.state.creating}
                  onClick={this.createButtonClick}
                  className={"btn-primary"}
                >               
                <Glyphicon
                  glyph="glyphicon glyphicon-ok"
                >
                </Glyphicon>
                  {this.state.creating ? this.state.creating : " Create"}
                </Button>
              </div>
            </div>
          </Row>
        </div>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Template)
);
