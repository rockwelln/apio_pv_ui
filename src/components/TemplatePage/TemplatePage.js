import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { fetchGetTemplateDetails } from "../../store/actions";
import Loading from "../../common/Loading";

export class TemplatePage extends Component {
  state = {
    isLoading: true
  };
  componentDidMount() {
    this.props
      .fetchGetTemplateDetails(
        this.props.match.params.categoryName,
        this.props.match.params.templateName
      )
      .then(() => this.setState({ isLoading: false }));
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <div className={"header"}>{`Template details`}</div>
        </div>
        <div className={"panel-body"}>
          <pre>{JSON.stringify(this.props.templateDetails, null, 2)}</pre>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ templateDetails: state.templateDetails });

const mapDispatchToProps = { fetchGetTemplateDetails };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TemplatePage)
);
