import React, { useState } from "react";
import { withRouter } from "react-router";
import { useDispatch } from "react-redux";

import { fetchDeleteTrunkGroupFromTenant } from "../../../../store/actions";

import Modal from "react-bootstrap/lib/Modal";
import Alert from "react-bootstrap/lib/Alert";
import Button from "react-bootstrap/lib/Button";

import { FormattedMessage } from "react-intl";

const DeleteModal = props => {
  const [deleting, setDeleting] = useState(false);

  const dispatch = useDispatch();

  const onDelete = () => {
    setDeleting(true);
    dispatch(
      fetchDeleteTrunkGroupFromTenant(
        props.match.params.tenantId,
        props.trunkName
      )
    ).then(() => {
      setDeleting(false);
      props.onClose();
    });
  };
  return (
    <Modal show={props.show} onHide={() => props.onClose()} backdrop={false}>
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
            defaultMessage={`You are about to delete the trunk group ${props.trunkName}!`}
          />
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onDelete()} bsStyle="danger">
          <FormattedMessage id="delete" defaultMessage="Delete" />
        </Button>
        <Button onClick={() => props.onClose()} disabled={deleting}>
          <FormattedMessage id="cancel" defaultMessage="Cancel" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default withRouter(DeleteModal);
