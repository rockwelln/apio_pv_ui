import React, { Component } from "react";

import Table from "react-bootstrap/lib/Table";
import { FormattedMessage } from "react-intl";

import { fetch_get, API_URL_PROXY_PREFIX } from "../../utils";
import Tenant from "./Tenant";

class Tenants extends Component {
  constructor(props) {
    super(props);
    this.cancelLoad = false;
    this.state = {
      tenants: [],
      loading: false
    };
    this._fetchTenants = this._fetchTenants.bind(this);
  }

  componentWillUnmount() {
    this.cancelLoad = true;
  }

  _fetchTenants() {
    this.setState({ loading: true });
    fetch_get(
      //`${API_URL_PREFIX}/api/v01/p1/tenants/`,
      `${API_URL_PROXY_PREFIX}/api/v1/orange/tenants/`,
      this.props.auth_token
    )
      .then(
        data =>
          !this.cancelLoad &&
          //this.setState({ tenants: TENANTS, loading: false })
          this.setState({ tenants: data.tenants, loading: false })
      )
      .catch(error => {
        console.error(error);
        !this.cancelLoad && this.setState({ loading: false });
      });
  }

  componentDidMount() {
    this._fetchTenants();
  }

  render() {
    const { tenants, loading } = this.state;

    if (loading) {
      return (
        <div style={{ textAlign: "center" }}>
          <i
            className="fa fa-spinner fa-spin"
            aria-hidden="true"
            style={{ fontSize: "24px" }}
          />
        </div>
      );
    }
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th style={{ width: "24%" }}>
                <FormattedMessage id="tenant-id" defaultMessage="Tenant ID" />
              </th>
              <th style={{ width: "24%" }}>
                <FormattedMessage id="name" defaultMessage="Name" />
              </th>
              <th style={{ width: "24%" }}>
                <FormattedMessage id="type" defaultMessage="Type" />
              </th>
              <th style={{ width: "24%" }}>
                <FormattedMessage id="reseller" defaultMessage="Reseller" />
              </th>
              <th style={{ width: "5%" }} />
            </tr>
          </thead>
          <tbody>
            {tenants
              .sort((a, b) => {
                if (a.tenantId < b.tenantId) return -1;
                if (a.tenantId > b.tenantId) return 1;
                return 0;
              })
              .map(t => (
                <Tenant
                  key={t.tenantId}
                  t={t}
                  onReload={this._fetchTenants}
                  {...this.props}
                />
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Tenants;
