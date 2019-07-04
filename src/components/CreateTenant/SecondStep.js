import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchGetTamplatesOfTenant } from "../../store/actions";

export class SecondStep extends Component {
  componentDidMount() {
    this.props.fetchGetTamplatesOfTenant();
  }
  render() {
    return <div>second</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { fetchGetTamplatesOfTenant };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondStep);
