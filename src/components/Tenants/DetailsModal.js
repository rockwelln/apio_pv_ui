import React, { Component } from "react";

import FormGroup from "react-bootstrap/lib/FormGroup";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Modal from "react-bootstrap/lib/Modal";
import Form from "react-bootstrap/lib/Form";
import Button from "react-bootstrap/lib/Button";
import ControlLabel from "react-bootstrap/lib/ControlLabel";

import { FormattedMessage } from "react-intl";

import { fetch_get, API_URL_PROXY_PREFIX, API_BASE_URL } from "../../utils";

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
      //`${API_URL_PROXY_PREFIX}/api/v1/orange/tenants/${tenantId}/`,
      `${API_BASE_URL}/tenants/${this.props.tenantId}`,
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

export default DetailsModal;
