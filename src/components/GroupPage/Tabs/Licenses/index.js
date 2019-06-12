import React, { Component } from "react";
import { connect } from "react-redux";

import Panel from "react-bootstrap/lib/Panel";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import { FormattedMessage } from "react-intl";
import Loading from "../../../../common/Loading";

import { fetchGetLicensesByGroupId } from "../../../../store/actions";

const INFINITY = 8734;

export class Licenses extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.props
      .fetchGetLicensesByGroupId(this.props.tenantId, this.props.groupId)
      .then(() => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading } = this.state;
    const { group, servicePacks, groupServices } = this.props;

    if (isLoading) {
      return <Loading />;
    }
    return (
      <Row className={"margin-top-2"}>
        <Col md={4}>
          <Panel>
            <Panel.Heading>
              <FormattedMessage
                id="trunling_capacity"
                defaultMessage="TRUNKING CAPACITY"
              />
              <Glyphicon
                className={"margin-checbox"}
                glyph="glyphicon glyphicon-pencil"
              />
            </Panel.Heading>
            <Panel.Body />
          </Panel>
        </Col>
        <Col md={4}>
          <Row>
            <Panel>
              <Panel.Heading>
                <FormattedMessage
                  id="group_services"
                  defaultMessage="GROUP SERVICES"
                />
                <Glyphicon
                  className={"margin-checbox"}
                  glyph="glyphicon glyphicon-pencil"
                />
              </Panel.Heading>
              <Panel.Body>
                {groupServices.map((pack, i) => (
                  <Row key={i}>
                    <Col md={8} className={"text-left"}>
                      <FormattedMessage
                        id="service_packs"
                        defaultMessage={`${pack.name}:`}
                      />
                    </Col>
                    <Col md={4} className={"text-right"}>{`${
                      pack.inUse ? pack.inUse : 0
                    }(${
                      pack.allocated.unlimited
                        ? String.fromCharCode(INFINITY)
                        : pack.allocated.maximum
                    })`}</Col>
                  </Row>
                ))}
              </Panel.Body>
            </Panel>
          </Row>
          <Row>
            <Panel>
              <Panel.Heading>
                <FormattedMessage
                  id="number_of_users"
                  defaultMessage="Number of users"
                />
                <Glyphicon
                  className={"margin-checbox"}
                  glyph="glyphicon glyphicon-pencil"
                />
              </Panel.Heading>
              <Panel.Body>
                <Row>
                  <Col md={8} className={"text-left"}>
                    <FormattedMessage
                      id="service_packs"
                      defaultMessage="User limit:"
                    />
                  </Col>
                  <Col md={4} className={"text-right"}>{`${group.userCount}(${
                    group.userLimit
                  })`}</Col>
                </Row>
              </Panel.Body>
            </Panel>
          </Row>
        </Col>
        <Col md={4}>
          <Panel>
            <Panel.Heading>
              <FormattedMessage
                id="service_packs"
                defaultMessage="SERVICE PACKS"
              />
              <Glyphicon
                className={"margin-checbox"}
                glyph="glyphicon glyphicon-pencil"
              />
            </Panel.Heading>
            {servicePacks.length ? (
              <Panel.Body>
                {servicePacks.map((pack, i) => (
                  <Row key={i}>
                    <Col md={8} className={"text-left"}>
                      <FormattedMessage
                        id="service_packs"
                        defaultMessage={`${pack.name}:`}
                      />
                    </Col>
                    <Col md={4} className={"text-right"}>{`${
                      pack.inUse ? pack.inUse : 0
                    }(${
                      pack.allocated.unlimited
                        ? String.fromCharCode(INFINITY)
                        : pack.allocated.maximum
                    })`}</Col>
                  </Row>
                ))}
              </Panel.Body>
            ) : (
              <Panel.Body>
                <FormattedMessage
                  id="No_service_packs"
                  defaultMessage="No service packs were found"
                />
              </Panel.Body>
            )}
          </Panel>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  group: state.group,
  servicePacks: state.servicePacks,
  groupServices: state.groupServices
});

const mapDispatchToProps = {
  fetchGetLicensesByGroupId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Licenses);
