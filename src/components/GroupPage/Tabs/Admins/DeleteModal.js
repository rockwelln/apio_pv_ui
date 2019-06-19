import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchDeleteGroupAdmin } from "../../../../store/actions";

import Modal from "react-bootstrap/lib/Modal";
import Alert from "react-bootstrap/lib/Alert";
import Button from "react-bootstrap/lib/Button";

import { FormattedMessage } from "react-intl";

class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(tenantId, groupId, adminId) {
    const { onClose } = this.props;
    this.setState({ deleting: true });
    this.props
      .fetchDeleteGroupAdmin(tenantId, groupId, adminId)
      .then(() => {
        this.props.notifications.notifications.addNotification({
          message: (
            <FormattedMessage
              id="delete-tenant-ok"
              defaultMessage="Admin deleted"
            />
          ),
          level: "success"
        });
        this.setState({ deleting: false });
        onClose && onClose(true);
      })
      .catch(error => {
        this.setState({ deleting: false });
        this.props.notifications.notifications.addNotification({
          title: (
            <FormattedMessage
              id="delete-tenant-fail"
              defaultMessage="Fail delete admin"
            />
          ),
          level: "error"
        });
      });
  }

  render() {
    const { tenantId, groupId, adminId, show, onClose } = this.props;
    const { deleting } = this.state;
    console.log(this.props);
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
              defaultMessage={`You are about to delete the admin ${adminId}!`}
            />
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => this.onDelete(tenantId, groupId, adminId)}
            bsStyle="danger"
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

const mapDispatchToProps = {
  fetchDeleteGroupAdmin
};

export default connect(
  null,
  mapDispatchToProps
)(DeleteModal);
