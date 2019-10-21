import React, { Component } from "react";

import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Checkbox from "react-bootstrap/lib/Checkbox";

export default class Trunk extends Component {
  state = { showDelete: false };

  render() {
    const { trunk } = this.props;
    return (
      <tr>
        <td>{trunk.name}</td>
        <td>{trunk.routingMode}</td>
      </tr>
    );
  }
}
