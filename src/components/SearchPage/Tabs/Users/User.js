import React, { Component } from "react";
import { withRouter } from "react-router";

import { Link } from "react-router-dom";

class User extends Component {
  render() {
    const { user } = this.props;
    return (
      <tr>
        <td>
          <Link
            to={`/provisioning/${this.props.match.params.gwName}/tenants/${
              user.tenantId
            }`}
          >
            {user.tenantId}
          </Link>
        </td>
        <td>
          <Link
            to={`/provisioning/${this.props.match.params.gwName}/tenants/${
              user.tenantId
            }/groups/${user.groupId}`}
          >
            {user.groupId}
          </Link>
        </td>
        <td>
          <Link
            to={`/provisioning/${this.props.match.params.gwName}/tenants/${
              user.tenantId
            }/groups/${user.groupId}/users/${user.userId}`}
          >
            {user.userId}
          </Link>
        </td>
        <td>{user.lastName}</td>
        <td>{user.firstName}</td>
        <td>{user.department}</td>

        <td>{user.phoneNumber}</td>
        <td>{user.emailAddress}</td>
        <td>{user.inTrunkGroup ? "yes" : "no"}</td>
        <td>{user.extension}</td>
      </tr>
    );
  }
}

export default withRouter(User);
