import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Table from "react-bootstrap/lib/Table";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";

import { FormattedMessage } from "react-intl";

import { fetchGetEnterpriseTrunksByGroup } from "../../../../store/actions";
import Trunk from "./Trunk";

export class RoutingNumber extends Component {
  componentDidMount() {
    this.props.fetchGetEnterpriseTrunksByGroup(
      this.props.match.params.tenantId,
      this.props.match.params.groupId
    );
  }
  render() {
    return (
      <React.Fragment>
        <Row className={"margin-top-1"}>
          <Col mdOffset={1} md={10}>
            <Table hover>
              <thead>
                <tr>
                  <th>
                    <FormattedMessage id="name" defaultMessage="Name" />
                  </th>
                  <th>
                    <FormattedMessage
                      id="routingMode"
                      defaultMessage="Routing Mode"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.props.enterpriseTrunks.map((trunk, i) => (
                  <Trunk key={i} trunk={trunk} />
                ))}
                {/* {paginationPhoneNumbers[page].map((number, i) => (
                      <PhoneNumber
                        index={i}
                        key={i}
                        number={number}
                        showWithStatus={this.state.showWithStatus}
                        handleSingleCheckboxClick={
                          this.handleSingleCheckboxClick
                        }
                        handleSingleCheckboxClickActive={
                          this.handleSingleCheckboxClickActive
                        }
                        handleSingleCheckboxClickPreActive={
                          this.handleSingleCheckboxClickPreActive
                        }
                        onReload={() =>
                          this.props.fetchGetPhoneNumbersByGroupId(
                            this.props.tenantId,
                            this.props.groupId
                          )
                        }
                      />
                    ))} */}
              </tbody>
            </Table>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ enterpriseTrunks: state.enterpriseTrunks });

const mapDispatchToProps = { fetchGetEnterpriseTrunksByGroup };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RoutingNumber)
);
