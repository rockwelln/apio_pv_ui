import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Form from "react-bootstrap/lib/Form";
import Modal from "react-bootstrap/lib/Modal";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";

import { FormattedMessage } from "react-intl";

export class DetailsModal extends Component {
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

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(DetailsModal);
