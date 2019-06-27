import React, { Component } from "react";

import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Checkbox from "react-bootstrap/lib/Checkbox";

export default class Sevice extends Component {
  state = { showDelete: false };
  render() {
    const { service, onReload, index } = this.props;
    const { showDelete } = this.state;
    return (
      <tr key={service.name}>
        <td>{service.name}</td>
        <td className={"text-center"}>
          <Checkbox
            checked={service.serviceChecked}
            className={"table-checkbox"}
            onChange={() => {
              this.props.handleSingleCheckboxClick(index);
            }}
          />
        </td>
      </tr>
    );
  }
}
