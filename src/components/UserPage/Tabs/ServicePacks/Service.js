import React, { Component } from "react";
import { Link } from "react-router-dom";

import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Checkbox from "react-bootstrap/lib/Checkbox";

import DeleteModal from "./DeleteModal";

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
        <td>
          <ButtonToolbar>
            <Glyphicon
              glyph="glyphicon glyphicon-remove"
              onClick={() => this.setState({ showDelete: true })}
            />
          </ButtonToolbar>
          <DeleteModal
            notifications={this.props.notifications}
            serviceName={service.name}
            // tenantId={this.props.tenantId}
            show={showDelete}
            onClose={e => {
              onReload && onReload();
              this.setState({ showDelete: false });
            }}
            {...this.props}
          />
        </td>
      </tr>
    );
  }
}
