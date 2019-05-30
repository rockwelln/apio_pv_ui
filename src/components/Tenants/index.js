import React, { Component } from "react";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Grid from "react-bootstrap/lib/Grid";
import { FormattedMessage } from "react-intl";

import { fetch_get, API_URL_PROXY_PREFIX, API_BASE_URL } from "../../utils";
import Tenant from "./Tenant";

const TENANTS = [
  {
    tenantId: "bc_ent_001",
    name: "Coelmont NV",
    type: "Enterprise"
  },
  {
    tenantId: "ApioTenantPasswordTest",
    name: "",
    type: "ServiceProvider"
  },
  {
    tenantId: "Amazon",
    name: "",
    type: "Enterprise"
  },
  {
    tenantId: "02321052",
    name: "Belga news agency",
    type: "Enterprise"
  },
  {
    tenantId: "0123345",
    name: "JohnDoe",
    type: "Enterprise"
  },
  {
    tenantId: "10440",
    name: "KMPG",
    type: "Enterprise"
  },
  {
    tenantId: "Telenet",
    name: "Telenet",
    type: "ServiceProvider"
  },
  {
    tenantId: "nvision",
    name: "nvision_demo",
    type: "Enterprise"
  },
  {
    tenantId: "ten_dev_1",
    name: "ten_dev_1",
    type: "Enterprise"
  },
  {
    tenantId: "DemoTrunk",
    name: "",
    type: "Enterprise"
  },
  {
    tenantId: "18284848",
    name: "Mibit",
    type: "Enterprise"
  },
  {
    tenantId: "Enterprise1",
    name: "",
    type: "Enterprise"
  },
  {
    tenantId: "TestPGW",
    name: "",
    type: "ServiceProvider"
  },
  {
    tenantId: "Pie",
    name: "Pie-Dev",
    type: "ServiceProvider"
  },
  {
    tenantId: "testPRA",
    name: "testPRA",
    type: "Enterprise"
  },
  {
    tenantId: "Tango2",
    name: "",
    type: "ServiceProvider"
  },
  {
    tenantId: "Pie-Demo",
    name: "Pie-Demo",
    type: "ServiceProvider"
  },
  {
    tenantId: "Netaxis",
    name: "",
    type: "ServiceProvider"
  },
  {
    tenantId: "focant",
    name: "",
    type: "Enterprise"
  },
  {
    tenantId: "ApioSpTest",
    name: "",
    type: "ServiceProvider"
  },
  {
    tenantId: "ApioSpSrvTest",
    name: "",
    type: "ServiceProvider"
  },
  {
    tenantId: "ApioEntTest",
    name: "",
    type: "Enterprise"
  },
  {
    tenantId: "Tango3",
    name: "",
    type: "ServiceProvider"
  },
  {
    tenantId: "ENT000001",
    name: "Test PRA Enterprise",
    type: "Enterprise"
  },
  {
    tenantId: "RBEN",
    name: "",
    type: "ServiceProvider"
  },
  {
    tenantId: "023590531",
    name: "nden-Belga - site 1",
    type: "Enterprise"
  }
];

class Tenants extends Component {
  constructor(props) {
    super(props);
    this.cancelLoad = false;
    this.state = {
      tenants: [],
      loading: false,
      searchValue: ""
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
      //`${API_URL_PROXY_PREFIX}/api/v1/orange/tenants/`,
      `${API_BASE_URL}/tenants/`,
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
        this.setState({
          tenants: TENANTS,
          allTenants: TENANTS,
          loading: false
        });
      });
  }

  componentDidMount() {
    //this._fetchTenants();
    this.setState({ tenants: TENANTS, allTenants: TENANTS, loading: false });
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
      <Grid>
        <Row>
          <Col className={"text-right "} md={1}>
            <Glyphicon
              className={"x-large"}
              glyph="glyphicon glyphicon-search"
              onClick={this.handleSearchClick}
            />
          </Col>
          <Col md={10}>
            <FormattedMessage
              id="search_placeholder"
              defaultMessage="Tenant ID or Name or Type or Resellers"
            >
              {placeholder => (
                <FormControl
                  className={"margin-1"}
                  type="text"
                  value={this.state.searchValue}
                  placeholder={placeholder}
                  onChange={e =>
                    this.setState({
                      searchValue: e.target.value
                    })
                  }
                />
              )}
            </FormattedMessage>
          </Col>
          <Col md={1}>
            <Glyphicon
              className={"x-large"}
              glyph="glyphicon glyphicon-plus-sign"
            />
          </Col>
        </Row>
        <Row>
          <Col mdOffset={1} md={10}>
            <Table>
              <thead>
                <tr>
                  <th style={{ width: "24%" }}>
                    <FormattedMessage id="tenant-id" defaultMessage="ID" />
                    <Glyphicon glyph="glyphicon glyphicon-transfer" />
                  </th>
                  <th style={{ width: "24%" }}>
                    <FormattedMessage id="name" defaultMessage="Name" />
                    <Glyphicon glyph="glyphicon glyphicon-transfer" />
                  </th>
                  <th style={{ width: "24%" }}>
                    <FormattedMessage id="type" defaultMessage="Type" />
                    <Glyphicon glyph="glyphicon glyphicon-transfer" />
                  </th>
                  <th style={{ width: "24%" }}>
                    <FormattedMessage id="reseller" defaultMessage="Reseller" />
                    <Glyphicon glyph="glyphicon glyphicon-transfer" />
                  </th>
                  <th style={{ width: "4%" }} />
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
          </Col>
        </Row>
      </Grid>
    );
  }

  handleSearchClick = () => {
    // if (!this.state.searchValue) {
    //   this.setState({ tenants: this.state.allTenants });
    //   return;
    // }
    const re = new RegExp(this.state.searchValue);
    const SearchArray = this.state.allTenants
      .filter(
        tenant =>
          tenant.tenantId.search(re) !== -1 ||
          tenant.name.search(re) !== -1 ||
          tenant.type.search(re) !== -1
      )
      .map(tenant => tenant);
    this.setState({ tenants: SearchArray });
    console.log(SearchArray);
  };
}

export default Tenants;
