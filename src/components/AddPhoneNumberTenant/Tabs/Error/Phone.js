import React, { Component } from "react";

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

export default Phone;
