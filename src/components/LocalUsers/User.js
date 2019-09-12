import React, { Component } from "react";
import { withRouter } from "react-router";

import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import { Link } from "react-router-dom";

import DeleteModal from "./DeleteModal";

class User extends Component {
  state = { showDelete: false };
  render() {
    const { user, onReload } = this.props;
    const { showDelete } = this.state;
    return (
      <tr>
        <td>
          <Link
            to={`/provisioning/${this.props.match.params.gwName}/localusers/user/${user.username}`}
          >
            {user.username}
          </Link>
        </td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.userType}</td>
        <td>
          <ButtonToolbar>
            <Glyphicon
              glyph="glyphicon glyphicon-remove"
              onClick={() => this.setState({ showDelete: true })}
            />
          </ButtonToolbar>
          <DeleteModal
            username={user.username}
            show={showDelete}
            onClose={e => {
              onReload && onReload();
              this.setState({ showDelete: false });
            }}
          />
        </td>
      </tr>
    );
  }
}

export default withRouter(User);
