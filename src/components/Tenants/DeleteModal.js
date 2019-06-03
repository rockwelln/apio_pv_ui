import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchDeleteTenant, deleteTenant } from "../../store/actions";

import Modal from "react-bootstrap/lib/Modal";
import Alert from "react-bootstrap/lib/Alert";
import Checkbox from "react-bootstrap/lib/Checkbox";
import Button from "react-bootstrap/lib/Button";

import { FormattedMessage } from "react-intl";

import { fetch_delete, API_BASE_URL } from "../../utils";

class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(tenantId) {
    const { onClose } = this.props;
    this.setState({ deleting: true });

    this.props
      .fetchDeleteTenant(tenantId)
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
    // fetch_delete(`${API_BASE_URL}/tenants/${tenantId}`)
    //   .then(() => {
    //     this.props.notifications.addNotification({
    //       message: (
    //         <FormattedMessage
    //           id="delete-tenant-ok"
    //           defaultMessage="Tenant deleted"
    //         />
    //       ),
    //       level: "success"
    //     });
    //     this.setState({ deleting: false });
    //     onClose && onClose(true);
    //   })
    //   .catch(error => {
    //     this.setState({ deleting: false });
    //     this.props.notifications.addNotification({
    //       title: (
    //         <FormattedMessage
    //           id="delete-tenant-fail"
    //           defaultMessage="Fail delete tenant"
    //         />
    //       ),
    //       level: "error"
    //     });
    //   });
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
          {/* <Checkbox
            checked={deleteNonEmpty}
            onChange={e => this.setState({ deleteNonEmpty: e.target.checked })}
          >
            <FormattedMessage
              id="delete-if-not-empty"
              defaultMessage="Delete even if not empty"
            />
          </Checkbox> */}
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

const mapDispatchToProps = {
  fetchDeleteTenant
};

export default connect(
  null,
  mapDispatchToProps
)(DeleteModal);
