import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchGetCategoriesOfTemplate } from "../../store/actions";

export class Templates extends Component {
  componentDidMount() {
    this.props.fetchGetCategoriesOfTemplate();
  }
  render() {
    console.log("categoriesOfTemplate", this.props.categoriesOfTemplate);
    return <div>Templates page</div>;
  }
}

const mapStateToProps = state => ({
  categoriesOfTemplate: state.categoriesOfTemplate
});

const mapDispatchToProps = { fetchGetCategoriesOfTemplate };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Templates);
