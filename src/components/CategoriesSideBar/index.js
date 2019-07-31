import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import NavItem from "react-bootstrap/lib/NavItem";
import { LinkContainer } from "react-router-bootstrap";

import { fetchGetCategoriesOfTemplate } from "../../store/actions";

import Loading from "../../common/Loading";

export class CategoriesSideBar extends Component {
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
        {this.props.categoriesOfTemplate.map((category, i) => (
          <LinkContainer
            to={`/provisioning/${this.props.match.params.gwName}/templates/${
              category.name
            }`}
          >
            <NavItem eventKey={i}>{category.name}</NavItem>
          </LinkContainer>
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  categoriesOfTemplate: state.categoriesOfTemplate
});

const mapDispatchToProps = {
  fetchGetCategoriesOfTemplate
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CategoriesSideBar)
);
