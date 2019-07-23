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

import { removeEmpty } from "../remuveEmptyInObject";

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
    creating: false
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
        <div className={"panel-heading"}>
          <Row>
            <Col md={12}>
              <div className={"header"}>
                Add group: select template
                <Link
                  to={`/provisioning/${
                    this.props.match.params.gwName
                  }/tenants/${this.props.match.params.tenantId}`}
                >
                  <Button
                    disabled={this.state.creating}
                    className={"margin-left-1 btn-danger"}
                    onClick={() => this.props.refuseCreateGroup()}
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </div>

        <div className={"panel-body"}>
          <Row>
            <Col md={12}>
              <p>
                Please select a Group template. This template will influence
                they way your tenant will be configured. (service pack
                definition, service (pack) authorisation, feature access code
                definition.
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={12} className={"flex-row"}>
              <FormGroup>
                <Radio
                  name="radioGroup"
                  checked={this.props.createGroup.templateName ? false : true}
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
                      <div className="font-weight-bold">{`${
                        template.name
                      }`}</div>
                      <div>
                        {template.description
                          ? `: ${template.description}`
                          : ""}
                      </div>
                    </div>
                  </Radio>
                ))}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <div className={"button-row"}>
              <div className={"pull-left"}>
                <Button
                  onClick={this.backButtonClick}
                  disabled={this.state.creating}
                  className={"btn-primary"}
                >
                  <Glyphicon glyph="glyphicon glyphicon-backward" />
                  &nbsp; BACK
                </Button>
              </div>
              <div className={"pull-right"}>
                <Button
                  disabled={this.state.creating}
                  onClick={this.createButtonClick}
                  className={"margin-left-1 btn-primary"}
                >
                  {this.state.creating ? this.state.creating : "CREATE"}
                </Button>
              </div>
            </div>
          </Row>
        </div>
      </React.Fragment>
    );
  }

  createButtonClick = () => {
    const filteredDataCreateGroup = removeEmpty(this.props.createGroup);
    this.setState({ creating: "Creating..." }, () => {
      this.props
        .fetchPostCreateGroup(
          this.props.match.params.tenantId,
          filteredDataCreateGroup
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
