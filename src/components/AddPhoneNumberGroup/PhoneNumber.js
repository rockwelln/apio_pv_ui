import React, { Component } from "react";

import Checkbox from "react-bootstrap/lib/Checkbox";

export default class PhoneNumber extends Component {
  render() {
    const { number, index } = this.props;
    return (
      <tr key={number.groupId}>
        <td>
          <Checkbox
            checked={number.phoneChecked}
            className={"table-checkbox"}
            onChange={() => {
              this.props.handleSingleCheckboxClick(index);
            }}
          />
        </td>
        <td>{number.rangeStart}</td>
        <td>{number.rangeEnd}</td>
      </tr>
    );
  }
}
