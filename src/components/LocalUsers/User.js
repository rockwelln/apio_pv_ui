import React, { Component } from "react";
import { withRouter } from "react-router";

import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Checkbox from "react-bootstrap/lib/Checkbox";

import { Link } from "react-router-dom";

import DeleteModal from "./DeleteModal";

class User extends Component {
  state = { showDelete: false };
  render() {
    const { user, onReload, tenantId, groupId, index } = this.props;
    const { showDelete } = this.state;
    return (
      <tr key={user.userId}>
        <td>{user.username}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.emailAddress}</td>
        <td>{user.accessType}</td>
        <td>{user.language}</td>
        <td>{user.readOnly ? "yes" : "no"}</td>
        <td>{user.userLevel}</td>
        <td>{user.userProfileType}</td>
        <td>{user.userType}</td>
        <td>
          <ButtonToolbar>
            <Glyphicon
              glyph="glyphicon glyphicon-remove"
              onClick={() => this.setState({ showDelete: true })}
            />
          </ButtonToolbar>
          <DeleteModal
            userId={user.userId}
            show={showDelete}
            onClose={e => {
              onReload && onReload(tenantId, groupId);
              this.setState({ showDelete: false });
            }}
            {...this.props}
          />
        </td>
      </tr>
    );
  }
}

export default withRouter(User);
