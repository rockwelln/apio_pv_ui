import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import DeleteModal from "./DeleteModal";

class Admin extends Component {
  state = { showDelete: false };
  render() {
    const { onReload, iad } = this.props;
    const { showDelete } = this.state;
    return (
      <tr>
        <td>
          <Link
            to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}/iad/${iad.iadId}`}
          >
            {iad.iadId}
          </Link>
        </td>
        <td>{iad.type}</td>
        <td>{iad.macAddress}</td>
        <td>
          <ButtonToolbar>
            <Glyphicon
              glyph="glyphicon glyphicon-remove"
              onClick={() => this.setState({ showDelete: true })}
            />
          </ButtonToolbar>
          <DeleteModal
            notifications={this.props.notifications}
            iadId={iad.iadId}
            tenantId={this.props.match.params.tenantId}
            groupId={this.props.match.params.groupId}
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

export default withRouter(Admin);
