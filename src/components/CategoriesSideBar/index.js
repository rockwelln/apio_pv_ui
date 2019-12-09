import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import NavItem from "react-bootstrap/lib/NavItem";
import { LinkContainer } from "react-router-bootstrap";

import Loading from "../../common/Loading";

export class CategoriesSideBar extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.categoriesOfTemplate.map((category, i) => (
          <LinkContainer
            key={i}
            to={`/provisioning/${this.props.match.params.gwName}/templates/${category.name}`}
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

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CategoriesSideBar)
);
