import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { fetchGetCategoryByName } from "../../store/actions";

import Loading from "../../common/Loading";

export class TemplatePage extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.props
      .fetchGetCategoryByName(this.props.match.params.templateName)
      .then(() =>
        this.setState({
          isLoading: false
        })
      );
  }
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <div className={"header"}>{`Name: ${this.props.category.name}`}</div>
          <div>{`Description: ${this.props.category.description}`}</div>
        </div>
        <div className={"panel-body"}>
          <div>Templates:</div>
          <ul>
            {this.props.category.templates.map((template, i) => (
              <li key={i}>{`${template.name}${
                template.description ? `: ${template.description}` : ""
              }`}</li>
            ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  category: state.category
});

const mapDispatchToProps = { fetchGetCategoryByName };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TemplatePage)
);
