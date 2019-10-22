import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class Trunk extends Component {
  state = { showDelete: false };

  render() {
    const { trunk } = this.props;
    return (
      <tr>
        <td>
          <Link
            to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}/enterprisetrunk/${trunk.name}`}
          >
            {trunk.name}
          </Link>
        </td>

        <td>{trunk.routingMode}</td>
      </tr>
    );
  }
}

export default withRouter(Trunk);
