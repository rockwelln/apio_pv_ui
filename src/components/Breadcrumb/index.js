import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

export class index extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    console.log(this.props);
    return <div />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(index)
);
