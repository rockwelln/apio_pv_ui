import React, { Component } from "react";
//import { Link } from "react-router-dom";

//import Breadcrumb from "react-bootstrap/lib/Breadcrumb";
import Table from "react-bootstrap/lib/Table";
import Modal from "react-bootstrap/lib/Modal";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Alert from "react-bootstrap/lib/Alert";

import { FormattedMessage } from "react-intl";

import { API_URL_PROXY_PREFIX, fetch_delete, fetch_get } from "../utils";

class Numbers extends Component {
  constructor(props) {
    super(props);
    this.cancelLoad = false;
    this.state = {
      users: [],
      deleting: false,
      loading: false
    };
    this._fetchUsers = this._fetchUsers.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillUnmount() {
    this.cancelLoad = true;
  }

  _fetchUsers() {
    this.setState({ loading: true });
    fetch_get(
      `${API_URL_PROXY_PREFIX}/api/v1/tenants/${this.props.tenantId}/groups/${
        this.props.siteId
      }/users/`,
      this.props.auth_token
    )
      .then(
        data =>
          !this.cancelLoad &&
          this.setState({ users: data.users, loading: false })
      )
      .catch(error => {
        console.error(error);
        !this.cancelLoad && this.setState({ loading: false });
      });
  }

  componentDidMount() {
    this._fetchUsers();
  }

  onDelete(userId) {
    this.setState({ deleting: true });
    fetch_delete(
      `${API_URL_PROXY_PREFIX}/api/v1/tenants/${this.props.tenantId}/groups/${
        this.props.siteId
      }/users/${userId}/`,
      this.props.auth_token
    )
      .then(() => {
        if (this.cancelLoad) return;
        this.props.notifications.addNotification({
          message: (
            <FormattedMessage
              id="delete-user-ok"
              defaultMessage="User deleted"
            />
          ),
          level: "success"
        });
        this.setState({ confirmDelete: undefined, deleting: false });
        this._fetchNumbers();
      })
      .catch(error => {
        this.setState({ deleting: false });
        this.props.notifications.addNotification({
          title: (
            <FormattedMessage
              id="delete-number-fail"
              defaultMessage="Fail User number"
            />
          ),
          //message: error.message,
          level: "error"
        });
      });
  }

  render() {
    const { users, confirmDelete, deleting, loading } = this.state;
    const closeDelete = () => this.setState({ confirmDelete: undefined });

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
              <th style={{ width: "2%" }} />
              <th style={{ width: "20%" }}>
                <FormattedMessage id="username" defaultMessage="Username" />
              </th>
              <th style={{ width: "20%" }}>
                <FormattedMessage id="firstname" defaultMessage="Firstname" />
              </th>
              <th style={{ width: "20%" }}>
                <FormattedMessage id="lastname" defaultMessage="Lastname" />
              </th>
              <th style={{ width: "20%" }}>
                <FormattedMessage
                  id="phonenumber"
                  defaultMessage="Phone number"
                />
              </th>
              <th style={{ width: "18%" }} />
            </tr>
          </thead>
          <tbody>
            {users.map(n => (
              <tr key={n.userId}>
                <td>{n.userId}</td>
                <td>{n.username}</td>
                <td>{n.firstName}</td>
                <td>{n.lastName}</td>
                <td>
                  {n.phoneNumber} {n.extension && `(${n.extension})`}
                </td>
                <td>
                  <ButtonToolbar>
                    {/*
                                        <Button onClick={() => this.setState({show: true})} bsStyle="primary">
                                            <Glyphicon glyph="pencil"/>
                                        </Button>
                                        */}
                    <Button
                      onClick={() => this.setState({ confirmDelete: n.userId })}
                      bsStyle="danger"
                    >
                      <Glyphicon glyph="remove-sign" />
                    </Button>
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal
          show={confirmDelete !== undefined}
          onHide={closeDelete}
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
                defaultMessage={`You are about to delete the user ${confirmDelete}!`}
              />
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => this.onDelete(confirmDelete)}
              bsStyle="danger"
              disabled={deleting}
            >
              <FormattedMessage id="delete" defaultMessage="Delete" />
            </Button>
            <Button onClick={closeDelete} disabled={deleting}>
              <FormattedMessage id="cancel" defaultMessage="Cancel" />
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export const NumbersManagement = ({ match, ...props }) => (
  <div>
    {/* <Breadcrumb>
            <Breadcrumb.Item active><FormattedMessage id="data" defaultMessage="Data"/></Breadcrumb.Item>
            <Breadcrumb.Item as="div" active>
                <FormattedMessage id="tenants" defaultMessage="Tenants">
                    { message => <Link to='/apio/tenants'>{message}</Link> }
                </FormattedMessage>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{match.params.tenantId}</Breadcrumb.Item>
            <Breadcrumb.Item as="div" active>
                <FormattedMessage id="groups" defaultMessage="Groups">
                    { message => <Link to={`/apio/tenants/${match.params.tenantId}/groups`}>{message}</Link> }
                </FormattedMessage>
            </Breadcrumb.Item>
            <Breadcrumb.Item href='#'>{match.params.siteId}</Breadcrumb.Item>
            <Breadcrumb.Item active><FormattedMessage id="numbers" defaultMessage="Numbers"/></Breadcrumb.Item>
        </Breadcrumb> */}

    <Numbers
      tenantId={match.params.tenantId}
      siteId={match.params.siteId}
      {...props}
    />
  </div>
);
