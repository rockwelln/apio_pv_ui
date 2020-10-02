import React, { Component } from "react";
import { Link } from "react-router-dom";

//import Breadcrumb from "react-bootstrap/lib/Breadcrumb";
import Table from "react-bootstrap/lib/Table";
import Form from "react-bootstrap/lib/Form";
import Modal from "react-bootstrap/lib/Modal";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Alert from "react-bootstrap/lib/Alert";
import Checkbox from "react-bootstrap/lib/Checkbox";
import FormControl from "react-bootstrap/lib/FormControl";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Col from "react-bootstrap/lib/Col";
import ControlLabel from "react-bootstrap/lib/ControlLabel";

import { FormattedMessage } from "react-intl";

import {
  API_URL_PROXY_PREFIX,
  fetch_delete,
  fetch_get,
  API_BASE_URL
} from "../utils";

class DetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.show && !this.props.show) {
      this.loadDetails(nextProps.tenantId, nextProps.groupId);
    }
  }

  loadDetails(tenantId, groupId) {
    fetch_get(
      `${API_URL_PROXY_PREFIX}/api/v1/orange/tenants/${tenantId}/groups/${groupId}/`,
      this.props.auth_token
    )
      .then(data => this.setState({ data: data.group }))
      .catch(error => {
        this.setState({ deleting: false });
        this.props.notifications.addNotification({
          title: (
            <FormattedMessage
              id="fetch-group-fail"
              defaultMessage="Fail fetch group"
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
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2} md={3}>
                  <FormattedMessage id="name" defaultMessage="Name" />
                </Col>

                <Col sm={9} md={8}>
                  <FormControl.Static>{data.name}</FormControl.Static>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2} md={3}>
                  <FormattedMessage
                    id="trunk-capacity"
                    defaultMessage="Trunk capacity"
                  />
                </Col>

                <Col sm={9} md={8}>
                  <FormControl.Static>{data.trunkCapacity}</FormControl.Static>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2} md={3}>
                  <FormattedMessage id="type" defaultMessage="Type" />
                </Col>

                <Col sm={9} md={8}>
                  <FormControl.Static>{data.type}</FormControl.Static>
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

  onDelete(groupId) {
    const { deleteNonEmpty } = this.state;
    const { tenantId, auth_token, onClose } = this.props;
    this.setState({ deleting: true });

    fetch_delete(
      `${API_URL_PROXY_PREFIX}/api/v1/orange/tenants/${tenantId}/groups/${groupId}?deleteNonEmpty=${
        deleteNonEmpty ? 1 : 0
      }`,
      auth_token
    )
      .then(() => {
        this.props.notifications.addNotification({
          message: (
            <FormattedMessage
              id="delete-group-ok"
              defaultMessage="Group deleted"
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
              id="delete-group-fail"
              defaultMessage="Fail delete group"
            />
          ),
          level: "error"
        });
      });
  }

  render() {
    const { groupId, show, onClose } = this.props;
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
              defaultMessage={`You are about to delete the group ${groupId}!`}
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
            onClick={() => this.onDelete(groupId)}
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

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      showDelete: false
    };
  }

  render() {
    const { g, tenantId, onReload } = this.props;
    const { showDetails, showDelete } = this.state;
    return (
      <tr key={g.groupId}>
        <td>
          <Link to={`/apio/tenants/${tenantId}/groups/${g.groupId}/numbers`}>
            {g.groupId}
          </Link>
        </td>
        <td>{g.groupName}</td>
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
            tenantId={tenantId}
            groupId={g.groupId}
            show={showDetails}
            onClose={() => this.setState({ showDetails: false })}
            {...this.props}
          />
          <DeleteModal
            tenantId={tenantId}
            groupId={g.groupId}
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

class Groups extends Component {
  constructor(props) {
    super(props);
    this.cancelLoad = false;
    this.state = {
      groups: [],
      loading: false
    };
    this._fetchGroups = this._fetchGroups.bind(this);
    this._fetchTenants = this._fetchTenants.bind(this);
  }

  componentWillUnmount() {
    this.cancelLoad = true;
  }

  _fetchGroups() {
    this.setState({ loading: true });
    fetch_get(
      `${API_URL_PROXY_PREFIX}/api/v1/orange/tenants/${
        this.props.tenantId
      }/groups/`,
      // `${API_BASE_URL}/tenants/${this.props.tenantId}`,
      this.props.auth_token
    )
      .then(
        data =>
          !this.cancelLoad &&
          this.setState({ groups: data.groups, loading: false })
      )
      .catch(error => {
        console.error(error);
        !this.cancelLoad && this.setState({ loading: false });
      });
  }

  _fetchTenants() {
    this.setState({ loading: true });
    fetch_get(
      // `${API_URL_PROXY_PREFIX}/api/v1/orange/tenants/${
      //   this.props.tenantId
      // }/groups/`,
      `${API_BASE_URL}/tenants/${this.props.tenantId}`,
      this.props.auth_token
    )
      .then
      //data =>
      //!this.cancelLoad &&
      //this.setState({ groups: data.groups, loading: false })
      ()
      .catch(error => {
        console.error(error);
        !this.cancelLoad && this.setState({ loading: false });
      });
  }

  componentDidMount() {
    this._fetchGroups();
  }

  render() {
    const { groups, loading } = this.state;

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
                <FormattedMessage id="group-id" defaultMessage="Group ID" />
              </th>
              <th style={{ width: "30%" }}>
                <FormattedMessage id="name" defaultMessage="Name" />
              </th>
              <th style={{ width: "20%" }} />
            </tr>
          </thead>
          <tbody>
            {groups
              .sort((a, b) => {
                if (a.groupId < b.groupId) return -1;
                if (a.groupId > b.groupId) return 1;
                return 0;
              })
              .map(g => (
                <Group
                  g={g}
                  key={g.groupId}
                  onReload={this._fetchGroups}
                  tenantId={this.props.tenantId}
                  {...this.props}
                />
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export const GroupsManagement = ({ match, ...props }) => (
  <div>
    {/* <Breadcrumb>
            <Breadcrumb.Item active><FormattedMessage id="data" defaultMessage="Data"/></Breadcrumb.Item>
            <Breadcrumb.Item as="div" active>
                <FormattedMessage id="tenants" defaultMessage="Tenants">
                    { message => <Link to='/apio/tenants'>{message}</Link> }
                </FormattedMessage>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{match.params.tenantId}</Breadcrumb.Item>
            <Breadcrumb.Item active><FormattedMessage id="groups" defaultMessage="Groups"/></Breadcrumb.Item>
        </Breadcrumb> */}

    <Groups tenantId={match.params.tenantId} {...props} />
  </div>
);
