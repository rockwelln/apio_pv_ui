import React, { Component } from "react";
import { connect } from "react-redux";

import Modal from "react-bootstrap/lib/Modal";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Pagination from "react-bootstrap/lib/Pagination";
import Table from "react-bootstrap/lib/Table";
import Button from "react-bootstrap/lib/Button";

import { FormattedMessage } from "react-intl";

import ServicePack from "./ServicePack";

export class ServicePackAuthorisation extends Component {
  state = {
    countPerPage: 25,
    userServices: [],
    page: 0,
    paginationServices: []
  };
  componentDidMount() {
    this.setState({ userServices: this.props.userServices }, () =>
      this.pagination()
    );
  }
  render() {
    return (
      <Modal show={this.props.isOpen} onHide={this.props.handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage
              id="endUserServiceAuthorisation"
              defaultMessage="End user service authorisation"
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Table hover>
                <thead>
                  <tr>
                    <th>
                      <FormattedMessage id="name" defaultMessage="Name" />
                    </th>
                    <th>
                      <FormattedMessage
                        id="allocated"
                        defaultMessage="Allocated"
                      />
                    </th>
                    <th>
                      <FormattedMessage
                        id="authorised"
                        defaultMessage="Authorised"
                      />
                    </th>
                  </tr>
                </thead>
                {this.state.paginationServices.length && (
                  <tbody>
                    {this.state.paginationServices[this.state.page].map(
                      (el, i) => (
                        <ServicePack key={i + ""} userService={el} />
                      )
                    )}
                  </tbody>
                )}
              </Table>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="flex flex-row flex-end-center">
                <Pagination className={"indent-top-bottom-1"}>
                  <Pagination.Prev onClick={this.decrementPage} />
                  <Pagination.Item>{this.state.page + 1}</Pagination.Item>
                  <Pagination.Next onClick={this.incrementPage} />
                </Pagination>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} className={"padding-0"}>
              <div className="button-row">
                <div className="pull-right">
                  <Button
                    //onClick={this.addDevice}
                    type="submit"
                    className="btn-primary"
                  >
                    <FormattedMessage id="update" defaultMessage="Update" />
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
  incrementPage = () => {
    if (this.state.page >= this.state.countPages - 1) {
      return;
    }
    this.setState({ page: this.state.page + 1 });
  };

  decrementPage = () => {
    if (this.state.page === 0) {
      return;
    }
    this.setState({ page: this.state.page - 1 });
  };

  pagination = () => {
    const { countPerPage, userServices } = this.state;
    const countPages = Math.ceil(userServices.length / countPerPage);

    let paginationItems = [];
    let counter = 0;

    for (let i = 0; i < countPages; i++) {
      if (i === 0) {
        const item = userServices.slice(0, countPerPage);
        paginationItems.push(item);
      } else {
        const item = userServices.slice(counter, counter + countPerPage);
        paginationItems.push(item);
      }
      counter = counter + countPerPage;
    }

    this.setState({
      paginationServices: paginationItems,
      pagination: false,
      countPages,
      page: this.state.page
    });
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicePackAuthorisation);
