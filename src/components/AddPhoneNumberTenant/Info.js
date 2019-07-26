import React, { Component } from "react";
import { connect } from "react-redux";

export class Info extends Component {
  render() {
    return <div>Hi im Info Page</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);
