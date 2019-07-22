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
  refuseCreateGroup,
  changeTemplateOfGroup,
  fetchGetTamplatesOfGroup,
  changeStepOfCreateGroup,
  fetchPostCreateGroup
} from "../../store/actions";

export class Template extends Component {
  state = {
    isLoading: true,
    creating: ""
  };

  componentDidMount() {
    this.props
      .fetchGetTamplatesOfGroup()
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
              ADD GROUP: template
              <Link
                to={`/provisioning/${this.props.match.params.gwName}/tenants/${
                  this.props.match.params.tenantId
                }`}
              >
                <Button
                  disabled={this.state.creating}
                  className={"margin-left-1"}
                  onClick={() => this.props.refuseCreateGroup()}
                >
                  Cancel
                </Button>
              </Link>
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p>Please select a template.</p>
          </Col>
        </Row>
        <Row>
          <Col md={12} className={"flex-row"}>
            <FormGroup>
              <Radio
                name="radioGroup"
                checked={this.props.createGroup.templateName ? 0 : 1}
                onClick={() => this.selectTemplate("")}
              >
                <div className="font-weight-bold flex">no template</div>
              </Radio>
              {this.props.templatesOfGroup.map((template, i) => (
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
        .fetchPostCreateGroup(
          this.props.match.params.tenantId,
          this.props.createGroup
        )
        .then(res =>
          res
            ? this.props.changeStepOfCreateGroup("Created")
            : this.setState({ creating: "" })
        );
    });
  };

  selectTemplate = name => {
    this.props.changeTemplateOfGroup(name);
  };

  backButtonClick = () => {
    this.props.changeStepOfCreateGroup("Basic");
  };
}

const mapStateToProps = state => ({
  templatesOfGroup: state.templatesOfGroup,
  createGroup: state.createGroup
});

const mapDispatchToProps = {
  refuseCreateGroup,
  changeTemplateOfGroup,
  fetchGetTamplatesOfGroup,
  changeStepOfCreateGroup,
  fetchPostCreateGroup
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Template)
);
