import React, { Component } from "react";

import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import DeleteModal from "./DeleteModal";

export default class Device extends Component {
  state = { showDelete: false };
  render() {
    const { device, onReload } = this.props;
    const { showDelete } = this.state;
    return (
      <tr key={device.deviceName}>
        <td>{device.deviceName}</td>
        <td>{device.deviceType}</td>
        <td>{device.macAddress}</td>
        <td>{device.freePorts}</td>
        <td>{device.status}</td>
        <td>
          <ButtonToolbar>
            <Glyphicon
              glyph="glyphicon glyphicon-remove"
              onClick={() => this.setState({ showDelete: true })}
            />
          </ButtonToolbar>
          <DeleteModal
            deviceName={device.deviceName}
            show={showDelete}
            tenantId={this.props.tenantId}
            groupId={this.props.groupId}
            notifications={this.props.notifications}
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
