import React, { Component } from "react";

import { Link } from "react-router-dom";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
//import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import DetailsModal from "./DetailsModal";
import DeleteModal from "./DeleteModal";

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
    const { showDetails, showDelete } = this.state;
    return (
      <tr key={t.tenantId}>
        <td>
          <Link to={`/data/tenants/${t.tenantId}/groups`}>{t.tenantId}</Link>
        </td>
        <td>{t.name}</td>
        <td>{t.type}</td>
        <td>/</td>
        <td>
          <ButtonToolbar>
            {/* <Button
              onClick={() => this.setState({ showDetails: true })}
              bsStyle="primary"
            >
              <Glyphicon glyph="menu-hamburger" />
            </Button> */}
            {/* <Button
              onClick={() => this.setState({ showDelete: true })}
              bsStyle="danger"
            > */}
            <Glyphicon
              glyph="glyphicon glyphicon-remove"
              onClick={() => this.setState({ showDelete: true })}
            />
            {/* </Button>*/}
          </ButtonToolbar>
          <DetailsModal
            tenantId={t.tenantId}
            show={showDetails}
            onClose={() => this.setState({ showDetails: false })}
            {...this.props}
          />
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
      </tr>
    );
  }
}

export default Tenant;
