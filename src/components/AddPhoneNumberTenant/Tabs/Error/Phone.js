import React, { Component } from "react";
import { connect } from "react-redux";

export class Phone extends Component {
  render() {
    const { phone } = this.props;
    return (
      <tr>
        <td>{phone.line}</td>
        <td>{phone.row}</td>
      </tr>
    );
  }
}

export default connect(
  null,
  null
)(Phone);
