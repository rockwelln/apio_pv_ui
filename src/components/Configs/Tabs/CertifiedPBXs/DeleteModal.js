import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { useDispatch } from "react-redux";

import { fetchDeleteCertifiedPBX } from "../../../../store/actions";

import Modal from "react-bootstrap/lib/Modal";
import Alert from "react-bootstrap/lib/Alert";
import Button from "react-bootstrap/lib/Button";

import { FormattedMessage } from "react-intl";

const DeleteModal = (props) => {
  const { show, onClose, pbxBrand, pbxVersion } = props;

  const [deleting, setDeleting] = useState(false);
  const dispatch = useDispatch();
  //   const propsCertifiedPBX = useSelector((state) => state.certifiedPBX);

  //   useEffect(() => {
  //     dispatch(fetchGetCertifiedPBX());
  //   }, []);

  const onDelete = () => {
    setDeleting(true);

    const callback = () => {
      setDeleting(false);
      onClose();
    };

    const catchCallback = () => {
      setDeleting(false);
    };

    dispatch(
      fetchDeleteCertifiedPBX(pbxBrand, pbxVersion, callback, catchCallback)
    );
  };

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
            defaultMessage={`You are about to delete the pbx ${pbxBrand} ${pbxVersion}!`}
          />
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onDelete} bsStyle="danger" disabled={deleting}>
          <FormattedMessage id="delete" defaultMessage="Delete" />
        </Button>
        <Button onClick={() => onClose && onClose(false)} disabled={deleting}>
          <FormattedMessage id="cancel" defaultMessage="Cancel" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default withRouter(DeleteModal);
