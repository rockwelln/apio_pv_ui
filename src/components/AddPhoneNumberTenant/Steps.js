import React, { Component } from "react";
import { connect } from "react-redux";

import Basic from "./Basic";
import Validated from "./Validated";
import Info from "./Info";
import InfoGroup from "./InfoGroup";

export class Steps extends Component {
  render() {
    switch (this.props.addPhoneTenantStep) {
      case "Basic": {
        return <Basic isGroupPage={this.props.isGroupPage} />;
      }
      case "Validated": {
        return <Validated isGroupPage={this.props.isGroupPage} />;
      }
      case "Info": {
        return <Info isGroupPage={this.props.isGroupPage} />;
      }
      case "InfoGroup": {
        return <InfoGroup isGroupPage={this.props.isGroupPage} />;
      }
      default:
        return <Basic isGroupPage={this.props.isGroupPage} />;
    }
  }
}

const mapStateToProps = state => ({
  addPhoneTenantStep: state.addPhoneTenantStep
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Steps);
