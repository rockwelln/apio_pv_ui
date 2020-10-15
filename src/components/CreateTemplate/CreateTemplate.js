import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { fetchPostCreateTemplate } from "../../store/actions";

import Button from "react-bootstrap/lib/Button";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";

export class CreateTemplate extends Component {
  state = {
    templateData: "",
    name: "",
    description: ""
  };

  render() {
    return (
      <React.Fragment>
        <div className={"panel-heading flex space-between"}>
          <div className={"header"}>{`Create template`}</div>
          <div>
            <Button className={"btn-primary"} onClick={this.addTemplate}>
              Add
            </Button>
          </div>
        </div>
        <div className={"panel-body"}>
          <Row className={"indent-top-bottom-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>Name:</div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  type="text"
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </div>
            </Col>
          </Row>
          <Row className={"margin-bottom-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                Description:
              </div>
            </Col>
          </Row>
          <textarea
            className={"width-100p height-10"}
            onChange={e => this.setState({ description: e.target.value })}
            value={this.state.description}
          />
          <Row className={"margin-bottom-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                Template Data:
              </div>
            </Col>
          </Row>
          <textarea
            className={"template-text-area"}
            onChange={e => this.setState({ templateData: e.target.value })}
            value={this.state.templateData}
          />
        </div>
      </React.Fragment>
    );
  }

  addTemplate = () => {
    const { templateData, name, description } = this.state;
    const data = {
      data: JSON.parse(templateData),
      name,
      description
    };
    this.props
      .fetchPostCreateTemplate(this.props.match.params.categoryName, data)
      .then(res => {
        res === "success" &&
          this.props.history.push(
            `/provisioning/${this.props.match.params.gwName}/templates/${this.props.match.params.categoryName}/`
          );
      });
  };
}

const mapDispatchToProps = { fetchPostCreateTemplate };

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(CreateTemplate)
);
