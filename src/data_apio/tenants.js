import React, { Component } from "react";
import { Link } from "react-router-dom";
//import Breadcrumb from "react-bootstrap/lib/Breadcrumb";
import Table, { thead, tbody } from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Button from "react-bootstrap/lib/Button";
import Modal from "react-bootstrap/lib/Modal";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Alert from "react-bootstrap/lib/Alert";
import Checkbox from "react-bootstrap/lib/Checkbox";
import Form from "react-bootstrap/lib/Form";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import { FormattedMessage } from "react-intl";
import {
  fetch_get,
  fetch_delete,
  API_URL_PROXY_PREFIX,
  API_URL_PREFIX
} from "../utils";

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

const DetailEntry = ({ label, value }) => (
  <FormGroup>
    <Col componentClass={ControlLabel} sm={2} md={3}>
      {label}
    </Col>

    <Col sm={9} md={8}>
      <FormControl.Static>{value}</FormControl.Static>
    </Col>
  </FormGroup>
);

class DetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.show && !this.props.show) {
      this.loadDetails(nextProps.tenantId);
    }
  }

  loadDetails(tenantId) {
    fetch_get(
      `${API_URL_PROXY_PREFIX}/api/v1/orange/tenants/${tenantId}/`,
      this.props.auth_token
    )
      .then(data => this.setState({ data: data.tenant }))
      .catch(error => {
        this.setState({ deleting: false });
        this.props.notifications.addNotification({
          title: (
            <FormattedMessage
              id="fetch-tenant-fail"
              defaultMessage="Fail fetch tenant"
            />
          ),
          level: "error"
        });
      });
  }

  render() {
    const { show, onClose } = this.props;
    const { data } = this.state;
    return (
      <Modal show={show} onHide={() => onClose && onClose()} backdrop={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage id="details" defaultMessage="Details" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data ? (
            <Form horizontal>
              <DetailEntry
                label={<FormattedMessage id="name" defaultMessage="Name" />}
                value={data.name}
              />
              <DetailEntry
                label={
                  <FormattedMessage
                    id="default-domain"
                    defaultMessage="Default domain"
                  />
                }
                value={data.defaultDomain}
              />
              <DetailEntry
                label={
                  <FormattedMessage
                    id="trunk-capacity"
                    defaultMessage="Trunk capacity"
                  />
                }
                value={data.trunkCapacity}
              />
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2} md={3}>
                  <FormattedMessage
                    id="servie-packs"
                    defaultMessage="Service packs"
                  />
                </Col>

                <Col sm={9} md={8}>
                  {data.servicePacks.map(sp => (
                    <FormControl.Static key={sp.name}>
                      {`${sp.name} - ${sp.desc}`}
                    </FormControl.Static>
                  ))}
                </Col>
              </FormGroup>
            </Form>
          ) : (
            <p>
              <FormattedMessage id="loading" defaultMessage="Loading..." />
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => onClose && onClose()}>
            <FormattedMessage id="close" defaultMessage="Close" />
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(tenantId) {
    const { deleteNonEmpty } = this.state;
    const { auth_token, onClose } = this.props;
    this.setState({ deleting: true });

    fetch_delete(
      `${API_URL_PROXY_PREFIX}/api/v1/orange/tenants/${tenantId}?deleteNonEmpty=${
        deleteNonEmpty ? 1 : 0
      }`,
      auth_token
    )
      .then(() => {
        this.props.notifications.addNotification({
          message: (
            <FormattedMessage
              id="delete-tenant-ok"
              defaultMessage="Tenant deleted"
            />
          ),
          level: "success"
        });
        this.setState({ deleting: false });
        onClose && onClose(true);
      })
      .catch(error => {
        this.setState({ deleting: false });
        this.props.notifications.addNotification({
          title: (
            <FormattedMessage
              id="delete-tenant-fail"
              defaultMessage="Fail delete tenant"
            />
          ),
          level: "error"
        });
      });
  }

  render() {
    const { tenantId, show, onClose } = this.props;
    const { deleting, deleteNonEmpty } = this.state;
    return (
      <Modal
        show={show}
        onHide={() => onClose && onClose(false)}
        backdrop={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage
              id="confirm-delete"
              defaultMessage="Are you sure?"
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleting && (
            <Alert bsStyle="info">
              <FormattedMessage id="deleting" defaultMessage="Deleting..." />
            </Alert>
          )}
          <p>
            <FormattedMessage
              id="confirm-delete-warning"
              defaultMessage={`You are about to delete the tenant ${tenantId}!`}
            />
          </p>
          <Checkbox
            checked={deleteNonEmpty}
            onChange={e => this.setState({ deleteNonEmpty: e.target.checked })}
          >
            <FormattedMessage
              id="delete-if-not-empty"
              defaultMessage="Delete even if not empty"
            />
          </Checkbox>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => this.onDelete(tenantId)}
            bsStyle="danger"
            disabled={deleting}
          >
            <FormattedMessage id="delete" defaultMessage="Delete" />
          </Button>
          <Button onClick={() => onClose && onClose(false)} disabled={deleting}>
            <FormattedMessage id="cancel" defaultMessage="Cancel" />
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

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
        <td>
          <ButtonToolbar>
            <Button
              onClick={() => this.setState({ showDetails: true })}
              bsStyle="primary"
            >
              <Glyphicon glyph="menu-hamburger" />
            </Button>
            <Button
              onClick={() => this.setState({ showDelete: true })}
              bsStyle="danger"
            >
              <Glyphicon glyph="remove-sign" />
            </Button>
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
              <th style={{ width: "20%" }}>
                <FormattedMessage id="tenant-id" defaultMessage="Tenant ID" />
              </th>
              <th style={{ width: "30%" }}>
                <FormattedMessage id="name" defaultMessage="Name" />
              </th>
              <th style={{ width: "30%" }}>
                <FormattedMessage id="type" defaultMessage="Type" />
              </th>
              <th style={{ width: "20%" }} />
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

// export const TenantsManagement = props => (
//   <React.Fragment>
//     {/* <Breadcrumb>
//       <Breadcrumb.Item active>
//         <FormattedMessage id="data" defaultMessage="Data" />
//       </Breadcrumb.Item>
//       <Breadcrumb.Item active>
//         <FormattedMessage id="tenants" defaultMessage="Tenants" />
//       </Breadcrumb.Item>
//     </Breadcrumb> */}
//     <Tenants {...props} />
//   </React.Fragment>
// );
