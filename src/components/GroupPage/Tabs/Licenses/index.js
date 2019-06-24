import React, { Component } from "react";
import { connect } from "react-redux";

import Panel from "react-bootstrap/lib/Panel";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import { FormattedMessage } from "react-intl";
import Loading from "../../../../common/Loading";

import {
  fetchGetLicensesByGroupId,
  fetchGetTrunkByGroupID
} from "../../../../store/actions";

const INFINITY = 8734;

export class Licenses extends Component {
  state = {
    isLoadingLicenses: true,
    isLoadingTrunk: true,
    showMore: false,
    trunkGroups: {}
  };

  componentDidMount() {
    this.props
      .fetchGetLicensesByGroupId(this.props.tenantId, this.props.groupId)
      .then(data => {
        this.setState({ isLoadingLicenses: data ? false : true });
      });
    this.props
      .fetchGetTrunkByGroupID(this.props.tenantId, this.props.groupId)
      .then(() => {
        this.setState({
          trunkGroups: this.props.trunkGroups,
          isLoadingTrunk: false
        });
      });
  }

  render() {
    const { isLoadingTrunk, isLoadingLicenses, trunkGroups } = this.state;
    const { group, servicePacks, groupServices } = this.props;

    if (isLoadingLicenses || isLoadingTrunk) {
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
            {Object.keys(trunkGroups).length ? (
              <Panel.Body>
                <Row>
                  <Col md={8} className={"text-left"}>
                    <FormattedMessage
                      id="trunking_licenses"
                      defaultMessage={`Trunking licenses:`}
                    />
                  </Col>
                  <Col md={4} className={"text-right"}>{`${
                    trunkGroups.maxActiveCalls
                  }`}</Col>
                </Row>
                <Row>
                  <Col md={8} className={"text-left"}>
                    <FormattedMessage
                      id="max_bursting"
                      defaultMessage={`Max bursting:`}
                    />
                  </Col>
                  <Col md={4} className={"text-right"}>{`${
                    trunkGroups.burstingMaxActiveCalls.unlimited
                      ? String.fromCharCode(INFINITY)
                      : trunkGroups.burstingMaxActiveCalls.maximum
                  }`}</Col>
                </Row>
              </Panel.Body>
            ) : (
              <Panel.Body>
                <FormattedMessage
                  id="no_trunk_groups"
                  defaultMessage="No info"
                />
              </Panel.Body>
            )}
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
              {groupServices.groups.length ? (
                <Panel.Body>
                  <Row>
                    <Col
                      mdOffset={6}
                      md={3}
                      className={"text-center font-weight-bold"}
                    >
                      in use
                    </Col>
                    <Col md={3} className={"text-center font-weight-bold"}>
                      limited to
                    </Col>
                  </Row>
                  {groupServices.groups.map((pack, i) =>
                    !this.state.showMore ? (
                      i <= groupServices.countShown - 1 ? (
                        <Row key={i}>
                          <Col md={6} className={"text-left"}>
                            <FormattedMessage
                              id="service_packs"
                              defaultMessage={`${pack.name}:`}
                            />
                          </Col>
                          <Col md={3} className={"text-center"}>{`${
                            pack.inUse ? pack.inUse : 0
                          }`}</Col>
                          <Col md={3} className={"text-center"}>{`${
                            pack.allocated.unlimited
                              ? String.fromCharCode(INFINITY)
                              : pack.allocated.maximum
                          }`}</Col>
                        </Row>
                      ) : null
                    ) : (
                      <Row key={i}>
                        <Col md={6} className={"text-left"}>
                          <FormattedMessage
                            id="service_packs"
                            defaultMessage={`${pack.name}:`}
                          />
                        </Col>
                        <Col md={3} className={"text-center"}>{`${
                          pack.inUse ? pack.inUse : 0
                        }`}</Col>
                        <Col md={3} className={"text-center"}>{`${
                          pack.allocated.unlimited
                            ? String.fromCharCode(INFINITY)
                            : pack.allocated.maximum
                        }`}</Col>
                      </Row>
                    )
                  )}
                  <Row>
                    <Col
                      md={8}
                      className={"cursor-pointer"}
                      componentClass="a"
                      onClick={this.handleClickShowMore}
                    >
                      <FormattedMessage
                        id="shown_more"
                        defaultMessage={`${
                          !this.state.showMore ? "Show more" : "Hide"
                        }`}
                      />
                    </Col>
                  </Row>
                </Panel.Body>
              ) : (
                <Panel.Body>
                  <FormattedMessage
                    id="No_group_services"
                    defaultMessage="No group services were found"
                  />
                </Panel.Body>
              )}
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
                  <Col
                    mdOffset={6}
                    md={3}
                    className={"text-center font-weight-bold"}
                  >
                    in use
                  </Col>
                  <Col md={3} className={"text-center font-weight-bold"}>
                    limited to
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className={"text-left"}>
                    <FormattedMessage
                      id="service_packs"
                      defaultMessage="User limit:"
                    />
                  </Col>
                  <Col md={3} className={"text-center"}>{`${
                    group.userCount
                  }`}</Col>
                  <Col md={3} className={"text-center"}>{`${
                    group.userLimit
                  }`}</Col>
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
                <Row>
                  <Col
                    mdOffset={6}
                    md={3}
                    className={"text-center font-weight-bold"}
                  >
                    in use
                  </Col>
                  <Col md={3} className={"text-center font-weight-bold"}>
                    limited to
                  </Col>
                </Row>
                {servicePacks.map((pack, i) => (
                  <Row key={i}>
                    <Col md={6} className={"text-left"}>
                      <FormattedMessage
                        id="service_packs"
                        defaultMessage={`${pack.name}:`}
                      />
                    </Col>
                    <Col md={3} className={"text-center"}>{`${
                      pack.inUse ? pack.inUse : 0
                    }`}</Col>
                    <Col md={3} className={"text-center"}>{`${
                      pack.allocated.unlimited
                        ? String.fromCharCode(INFINITY)
                        : pack.allocated.maximum
                    }`}</Col>
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
  handleClickShowMore = () => {
    this.setState({ showMore: !this.state.showMore });
  };
}

const mapStateToProps = state => ({
  group: state.group,
  servicePacks: state.servicePacks,
  groupServices: state.groupServices,
  trunkGroups: state.trunkGroups
});

const mapDispatchToProps = {
  fetchGetLicensesByGroupId,
  fetchGetTrunkByGroupID
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Licenses);
