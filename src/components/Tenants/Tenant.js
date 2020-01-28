import React, { Component } from "react";
import { withRouter } from "react-router";

import { Link } from "react-router-dom";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import DeleteModal from "./DeleteModal";

import { isAllowed, pages } from "../../utils/user";

import "./styles.css";

class Tenant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      showDelete: false
    };
  }

  render() {
    const { t, onReload } = this.props;
    const { showDelete } = this.state;
    return (
      <tr key={t.tenantId}>
        <td>
          <Link
            to={`/provisioning/${this.props.match.params.gwName}/tenants/${t.tenantId}`}
          >
            {t.tenantId}
          </Link>
        </td>
        <td>{t.name}</td>
        <td>{t.tina_id}</td>
        {isAllowed(
          localStorage.getItem("userProfile"),
          pages.delete_access
        ) && (
          <td>
            <ButtonToolbar>
              <Glyphicon
                glyph="glyphicon glyphicon-remove"
                onClick={() => this.setState({ showDelete: true })}
              />
            </ButtonToolbar>
            <DeleteModal
              tenantId={t.tenantId}
              show={showDelete}
              onClose={e => {
                e && onReload && onReload();
                this.setState({ showDelete: false });
              }}
              {...this.props}
            />
          </td>
        )}
      </tr>
    );
  }
}

export default withRouter(Tenant);
