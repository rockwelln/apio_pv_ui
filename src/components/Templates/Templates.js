import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { fetchGetCategoriesOfTemplate } from "../../store/actions";

import Loading from "../../common/Loading";

export class Templates extends Component {
  state = {
    isLoading: true
  };
  componentDidMount() {
    this.props.fetchGetCategoriesOfTemplate().then(() =>
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
        {/**Header */}
        <div className={"panel-heading"}>
          <div className={"header"}>List of categories</div>
        </div>
        {/**Body */}
        <div className={"panel-body"}>
          <ul>
            {this.props.categoriesOfTemplate.map((category, i) => (
              <li key={i}>
                <Link
                  to={`/provisioning/${
                    this.props.match.params.gwName
                  }/templates/${category.name}`}
                >{`${category.name}`}</Link>
                {`: ${category.description}`}
              </li>
            ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  categoriesOfTemplate: state.categoriesOfTemplate
});

const mapDispatchToProps = { fetchGetCategoriesOfTemplate };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Templates)
);
