import React, { Component } from "react";
import { connect } from "react-redux";

export class SecondStep extends Component {
  render() {
    return <div>second</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondStep);
