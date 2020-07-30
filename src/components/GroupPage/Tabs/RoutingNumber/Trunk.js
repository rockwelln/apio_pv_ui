import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import DeleteModal from "./DeleteModal";

import { isAllowed, pages } from "../../../../utils/user";

class Trunk extends Component {
  state = { showDelete: false };

  render() {
    const { trunk, onReload } = this.props;
    const { showDelete } = this.state;
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
        {isAllowed(
          localStorage.getItem("userProfile"),
          pages.delete_group_routing_number
        ) &&
          (trunk.name.slice(-2) !== "01" ? (
            <td>
              <ButtonToolbar>
                <Glyphicon
                  glyph="glyphicon glyphicon-remove"
                  onClick={() => this.setState({ showDelete: true })}
                />
              </ButtonToolbar>
              <DeleteModal
                trunk={trunk}
                show={showDelete}
                onClose={e => {
                  onReload && onReload();
                  this.setState({ showDelete: false });
                }}
              />
            </td>
          ) : (
            <td />
          ))}
      </tr>
    );
  }
}

export default withRouter(Trunk);
