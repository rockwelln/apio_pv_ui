import React, { Component } from "react";
import { Link } from "react-router-dom";

import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import DeleteModal from "./DeleteModal";

export default class Admin extends Component {
  state = { showDelete: false };
  render() {
    const { admin, onReload } = this.props;
    const { showDelete } = this.state;
    return (
      <tr key={admin.userId}>
        <td>
          <Link
            to={`/provisioning/broadsoft_xsp1_as1/tenants/${
              this.props.tenantId
            }/groups/${this.props.groupId}/admins/${admin.userId}`}
          >
            {admin.userId}
          </Link>
        </td>
        <td>{admin.firstName}</td>
        <td>{admin.lastName}</td>
        <td>{admin.language}</td>
        <td>
          <ButtonToolbar>
            <Glyphicon
              glyph="glyphicon glyphicon-remove"
              onClick={() => this.setState({ showDelete: true })}
            />
          </ButtonToolbar>
          <DeleteModal
            notifications={this.props.notifications}
            adminId={admin.userId}
            tenantId={this.props.tenantId}
            groupId={this.props.groupId}
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
