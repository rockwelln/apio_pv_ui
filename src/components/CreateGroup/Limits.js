import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import Panel from "react-bootstrap/lib/Panel";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import Checkbox from "react-bootstrap/lib/Checkbox";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import Button from "react-bootstrap/lib/Button";

import { FormattedMessage } from "react-intl";
import Loading from "../../common/Loading";
import EditLicenses from "../../common/EditLicenses";

import {
  fetchGetLicensesByGroupId,
  fetchGetTrunkByGroupID,
  fetchPutUpdateGroupDetails,
  fetchPutUpdateTrunkByGroupId,
  clearErrorMassage,
  fetchPutUpdateServicePacksByGroupId,
  fetchPutUpdateGroupServicesByGroupId,
  changeStepOfCreateGroup,
  refuseCreateTenant,
  fetchPostAddGroupServicesToGroup
} from "../../store/actions";

const INFINITY = 8734;

export class Licenses extends Component {
  state = {
    isLoadingLicenses: true,
    isLoadingTrunk: true,
    showMore: false,
    trunkGroups: {},
    servicePacks: [],
    newUserLimit: null,
    editTrunkCapacity: false,
    editServicePacks: false,
    editGroupServices: false
  };

  fetchData = () => {
    this.props
      .fetchGetLicensesByGroupId(
        this.props.match.params.tenantId,
        this.props.createdGroup.groupId
      )
      .then(data => {
        this.setState({
          groupServices: this.props.groupServices.groups,
          servicePacks: this.props.servicePacks,
          isLoadingLicenses: data ? false : true
        });
      });
    this.props
      .fetchGetTrunkByGroupID(
        this.props.match.params.tenantId,
        this.props.createdGroup.groupId
      )
      .then(() => {
        this.setState({
          trunkGroups: this.props.trunkGroups,
          isLoadingTrunk: false
        });
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const {
      isLoadingTrunk,
      isLoadingLicenses,
      trunkGroups,
      editTrunkCapacity,
      editServicePacks,
      editGroupServices
    } = this.state;
    const { servicePacks, groupServices } = this.props;

    if (isLoadingLicenses || isLoadingTrunk) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        {/* PANEL HEADER */}
        <div className={"panel-heading"}>
          <Row>
            <Col md={12}>
              <div className={"header"}>
                ADD GROUP: usage limits{" "}
                <Link
                  to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}`}
                >
                  <Button
                    className={"margin-left-1 btn-danger"}
                    onClick={() => this.props.refuseCreateTenant()}
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
        <div className={"panel-body"}>
          {/* EXPLANATION */}
          <Row>
            <Col md={12}>
              <p>
                Set user limits on service packs and group services. This is
                typically used to limit the volime of licensable items that can
                be consumed by a customer.
              </p>
            </Col>
          </Row>
          {/*TRUNKING CAPACITY*/}
          <Row className={"margin-top-2"}>
            <Col md={4}>
              <Panel>
                <Panel.Heading>
                  <FormattedMessage
                    id="trunling_capacity"
                    defaultMessage="TRUNKING CAPACITY"
                  />
                  {!editTrunkCapacity ? (
                    !!Object.keys(trunkGroups).length &&
                    !!trunkGroups.maxAvailableActiveCalls.maximum && (
                      <Glyphicon
                        className={"margin-checbox"}
                        glyph="glyphicon glyphicon-pencil"
                        onClick={() => {
                          this.props.clearErrorMassage();
                          this.setState({ editTrunkCapacity: true });
                        }}
                      />
                    )
                  ) : (
                    <React.Fragment>
                      <Glyphicon
                        className={"margin-checbox"}
                        glyph="glyphicon glyphicon glyphicon-ban-circle"
                        onClick={() => {
                          this.props.clearErrorMassage();
                          this.setState({
                            editTrunkCapacity: false,
                            trunkGroups: this.props.trunkGroups
                          });
                        }}
                      />
                      <Glyphicon
                        className={"margin-checbox"}
                        glyph="glyphicon glyphicon glyphicon-ok-circle"
                        onClick={this.updateTrunkCapacity}
                      />
                    </React.Fragment>
                  )}
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
                      {!editTrunkCapacity ? (
                        <Col
                          md={4}
                          className={"text-right"}
                        >{`${this.props.trunkGroups.maxActiveCalls}`}</Col>
                      ) : (
                        <Col md={4} className={"text-right"}>
                          <FormControl
                            type="number"
                            defaultValue={this.props.trunkGroups.maxActiveCalls}
                            onChange={e => {
                              this.props.clearErrorMassage();
                              let target = e.currentTarget;
                              this.setState(prevState => ({
                                trunkGroups: {
                                  ...prevState.trunkGroups,
                                  maxActiveCalls: parseInt(target.value, 10)
                                }
                              }));
                            }}
                          />
                        </Col>
                      )}
                    </Row>
                    <Row>
                      <Col md={8} className={"text-left"}>
                        <FormattedMessage
                          id="max_bursting"
                          defaultMessage={`Max bursting:`}
                        />
                      </Col>
                      {!editTrunkCapacity ? (
                        <Col md={4} className={"text-right"}>{`${
                          this.props.trunkGroups.burstingMaxActiveCalls
                            .unlimited
                            ? String.fromCharCode(INFINITY)
                            : this.props.trunkGroups.burstingMaxActiveCalls
                                .maximum
                        }`}</Col>
                      ) : (
                        <Col md={4} className={"text-right"}>
                          <Checkbox
                            defaultChecked={
                              this.props.trunkGroups.burstingMaxActiveCalls
                                .unlimited
                            }
                            onChange={() => {
                              this.props.clearErrorMassage();
                              this.setState(prevState => ({
                                trunkGroups: {
                                  ...prevState.trunkGroups,
                                  burstingMaxActiveCalls: {
                                    ...prevState.trunkGroups
                                      .burstingMaxActiveCalls,
                                    unlimited: !prevState.trunkGroups
                                      .burstingMaxActiveCalls.unlimited
                                  }
                                }
                              }));
                            }}
                          >
                            {String.fromCharCode(INFINITY)}
                          </Checkbox>
                          {!trunkGroups.burstingMaxActiveCalls.unlimited && (
                            <FormControl
                              type="number"
                              defaultValue={
                                this.props.trunkGroups.burstingMaxActiveCalls
                                  .maximum
                              }
                              onChange={e => {
                                this.props.clearErrorMassage();
                                let target = e.currentTarget;
                                this.setState(prevState => ({
                                  trunkGroups: {
                                    ...prevState.trunkGroups,
                                    burstingMaxActiveCalls: {
                                      ...prevState.trunkGroups
                                        .burstingMaxActiveCalls,
                                      maximum: parseInt(target.value, 10)
                                    }
                                  }
                                }));
                              }}
                            />
                          )}
                        </Col>
                      )}
                    </Row>
                    <Row>
                      <Col md={12}>
                        {this.props.groupTrunkErrorMassage && (
                          <HelpBlock bsClass="color-error">
                            {this.props.groupTrunkErrorMassage}
                          </HelpBlock>
                        )}
                      </Col>
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
            {/*GROUP SERVICES*/}
            <Col md={4}>
              <Row>
                <Panel>
                  <Panel.Heading>
                    <FormattedMessage
                      id="group_services"
                      defaultMessage="GROUP SERVICES"
                    />
                    {!editGroupServices ? (
                      <Glyphicon
                        className={"margin-checbox"}
                        glyph="glyphicon glyphicon-pencil"
                        onClick={() => {
                          this.setState({ editGroupServices: true });
                        }}
                      />
                    ) : (
                      <React.Fragment>
                        <Glyphicon
                          className={"margin-checbox"}
                          glyph="glyphicon glyphicon glyphicon-ban-circle"
                          onClick={() => {
                            this.setState({
                              editGroupServices: false
                            });
                          }}
                        />
                        <Glyphicon
                          className={"margin-checbox"}
                          glyph="glyphicon glyphicon glyphicon-ok-circle"
                          onClick={this.updateGroupServices}
                        />
                      </React.Fragment>
                    )}
                  </Panel.Heading>
                  {groupServices.groups.length ? (
                    <Panel.Body>
                      <Row>
                        <Col
                          mdOffset={5}
                          md={3}
                          className={"text-center font-weight-bold"}
                        >
                          in use
                        </Col>
                        <Col md={3} className={"text-center font-weight-bold"}>
                          limited to
                        </Col>
                      </Row>
                      {this.state.groupServices.map((pack, i) =>
                        !this.state.showMore && !editGroupServices ? (
                          i <= groupServices.countShown - 1 ? (
                            <Row key={i}>
                              <Col md={5} className={"text-left"}>
                                <FormattedMessage
                                  id="service_packs"
                                  defaultMessage={`${pack.name}:`}
                                />
                              </Col>
                              {!pack.allocated.unlimited &&
                              pack.allocated.maximum === 0 ? (
                                <Col md={6}>not authorised</Col>
                              ) : (
                                <React.Fragment>
                                  <Col md={3} className={"text-center"}>{`${
                                    pack.inUse ? pack.inUse : 0
                                  }`}</Col>
                                  <Col md={3} className={"text-center"}>{`${
                                    pack.allocated.unlimited
                                      ? String.fromCharCode(INFINITY)
                                      : pack.allocated.maximum
                                  }`}</Col>
                                </React.Fragment>
                              )}
                            </Row>
                          ) : null
                        ) : !editGroupServices ? (
                          <Row key={i}>
                            <Col md={5} className={"text-left"}>
                              <FormattedMessage
                                id="service_packs"
                                defaultMessage={`${pack.name}:`}
                              />
                            </Col>
                            {!pack.allocated.unlimited &&
                            pack.allocated.maximum === 0 ? (
                              <Col md={6}>not authorised</Col>
                            ) : (
                              <React.Fragment>
                                <Col md={3} className={"text-center"}>{`${
                                  pack.inUse ? pack.inUse : 0
                                }`}</Col>
                                <Col md={3} className={"text-center"}>{`${
                                  pack.allocated.unlimited
                                    ? String.fromCharCode(INFINITY)
                                    : pack.allocated.maximum
                                }`}</Col>
                              </React.Fragment>
                            )}
                          </Row>
                        ) : (
                          <Row key={i}>
                            <Col md={5} className={"text-left"}>
                              <FormattedMessage
                                id="service_packs"
                                defaultMessage={`${pack.name}:`}
                              />
                            </Col>
                            <Col md={3} className={"text-center"}>{`${
                              pack.inUse ? pack.inUse : 0
                            }`}</Col>
                            <Col md={3} className={"text-center"}>
                              <EditLicenses
                                defaultChecked={pack.allocated.unlimited}
                                index={i}
                                defaultMaximum={pack.allocated.maximum}
                                changePacksUnlimeted={
                                  this.changeGroupServicesUnlimeted
                                }
                                changePacksMaximum={
                                  this.changeGroupServicesMaximum
                                }
                              />
                            </Col>
                          </Row>
                        )
                      )}
                      {!editGroupServices && (
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
                      )}
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
            </Col>
            {/*SERVICE PACKS*/}
            <Col md={4}>
              <Panel>
                <Panel.Heading>
                  <FormattedMessage
                    id="service_packs"
                    defaultMessage="SERVICE PACKS"
                  />
                  {!!servicePacks.length &&
                    (!editServicePacks ? (
                      <Glyphicon
                        className={"margin-checbox"}
                        glyph="glyphicon glyphicon-pencil"
                        onClick={() =>
                          this.setState({ editServicePacks: true })
                        }
                      />
                    ) : (
                      <React.Fragment>
                        <Glyphicon
                          className={"margin-checbox"}
                          glyph="glyphicon glyphicon glyphicon-ban-circle"
                          onClick={() =>
                            this.setState({
                              servicePacks: this.props.servicePacks,
                              editServicePacks: false
                            })
                          }
                        />
                        <Glyphicon
                          className={"margin-checbox"}
                          glyph="glyphicon glyphicon glyphicon-ok-circle"
                          onClick={this.updateServicePacks}
                        />
                      </React.Fragment>
                    ))}
                </Panel.Heading>
                {servicePacks.length ? (
                  <Panel.Body>
                    <Row>
                      <Col
                        mdOffset={5}
                        md={3}
                        className={"text-center font-weight-bold"}
                      >
                        in use
                      </Col>
                      <Col md={3} className={"text-center font-weight-bold"}>
                        limited to
                      </Col>
                    </Row>
                    {this.state.servicePacks.map((pack, i) => (
                      <Row key={i}>
                        <Col md={5} className={"text-left"}>
                          <FormattedMessage
                            id="service_packs"
                            defaultMessage={`${pack.name}:`}
                          />
                        </Col>
                        {!pack.allocated.unlimited &&
                          pack.allocated.maximum === 0 && (
                            <Col md={6} className={"text-center"}>
                              not authorised
                            </Col>
                          )}

                        {pack.allocated.maximum !== 0 && (
                          <Col md={3} className={"text-center"}>{`${
                            pack.inUse ? pack.inUse : 0
                          }`}</Col>
                        )}
                        {!editServicePacks ? (
                          pack.allocated.maximum !== 0 ? (
                            <Col md={3} className={"text-center"}>{`${
                              pack.allocated.unlimited
                                ? String.fromCharCode(INFINITY)
                                : pack.allocated.maximum
                            }`}</Col>
                          ) : null
                        ) : (
                          <Col md={3} className={"text-center"}>
                            <EditLicenses
                              defaultChecked={pack.allocated.unlimited}
                              index={i}
                              defaultMaximum={pack.allocated.maximum}
                              changePacksUnlimeted={
                                this.changeServicePacksUnlimeted
                              }
                              changePacksMaximum={
                                this.changeServicePacksMaximum
                              }
                            />
                          </Col>
                        )}
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
          <Row className={"margin-1"}>
            <div className="button-row">
              <div className="pull-right">
                <Button onClick={this.nextStep} className={"btn-primary"}>
                  <Glyphicon glyph="glyphicon glyphicon-ok" />
                  &nbsp; Next
                </Button>
              </div>
            </div>
          </Row>
        </div>
      </React.Fragment>
    );
  }

  nextStep = () => {
    this.props.changeStepOfCreateGroup("Admin");
  };

  updateServicePacks = () => {
    const data = {
      servicePacks: this.state.servicePacks
    };

    this.props
      .fetchPutUpdateServicePacksByGroupId(
        this.props.match.params.tenantId,
        this.props.createdGroup.groupId,
        data
      )
      .then(() => this.fetchData())
      .then(() => this.setState({ editServicePacks: false }));
  };

  changeServicePacksUnlimeted = (i, checked) => {
    this.setState(prevState => ({
      servicePacks: [
        ...prevState.servicePacks.slice(0, i),
        {
          ...prevState.servicePacks[i],
          allocated: {
            ...prevState.servicePacks[i].allocated,
            unlimited: checked
          }
        },
        ...prevState.servicePacks.slice(i + 1)
      ]
    }));
  };

  changeServicePacksMaximum = (i, max) => {
    this.setState(prevState => ({
      servicePacks: [
        ...prevState.servicePacks.slice(0, i),
        {
          ...prevState.servicePacks[i],
          allocated: {
            ...prevState.servicePacks[i].allocated,
            maximum: max
          }
        },
        ...prevState.servicePacks.slice(i + 1)
      ]
    }));
  };

  updateGroupServices = () => {
    const data = {
      groupServices: this.state.groupServices
    };

    const authorisedServices = {
      services: this.state.groupServices.reduce((prev, service) => {
        if (
          !(!service.allocated.unlimited && service.allocated.maximum === 0)
        ) {
          prev.push({ name: service.name });
          return prev;
        }
        return prev;
      }, [])
    };

    this.props
      .fetchPutUpdateGroupServicesByGroupId(
        this.props.match.params.tenantId,
        this.props.createdGroup.groupId,
        data
      )
      .then(() =>
        this.props.fetchPostAddGroupServicesToGroup(
          this.props.match.params.tenantId,
          this.props.createdGroup.groupId,
          authorisedServices
        )
      )
      .then(() => this.fetchData())
      .then(() => this.setState({ editGroupServices: false }));
  };

  changeGroupServicesUnlimeted = (i, checked) => {
    this.setState(prevState => ({
      groupServices: [
        ...prevState.groupServices.slice(0, i),
        {
          ...prevState.groupServices[i],
          allocated: {
            ...prevState.groupServices[i].allocated,
            unlimited: checked
          }
        },
        ...prevState.groupServices.slice(i + 1)
      ]
    }));
  };

  changeGroupServicesMaximum = (i, max) => {
    this.setState(prevState => ({
      groupServices: [
        ...prevState.groupServices.slice(0, i),
        {
          ...prevState.groupServices[i],
          allocated: {
            ...prevState.groupServices[i].allocated,
            maximum: max
          }
        },
        ...prevState.groupServices.slice(i + 1)
      ]
    }));
  };

  handleClickShowMore = () => {
    this.setState({ showMore: !this.state.showMore });
  };

  updateTrunkCapacity = () => {
    const data = {
      maxActiveCalls: this.state.trunkGroups.maxActiveCalls,
      burstingMaxActiveCalls: this.state.trunkGroups.burstingMaxActiveCalls
    };

    this.props
      .fetchPutUpdateTrunkByGroupId(
        this.props.match.params.tenantId,
        this.props.createdGroup.groupId,
        data
      )
      .then(this.setState({ editTrunkCapacity: false }));
  };
}

const mapStateToProps = state => ({
  group: state.group,
  servicePacks: state.servicePacks,
  groupServices: state.groupServices,
  trunkGroups: state.trunkGroups,
  groupTrunkErrorMassage: state.groupTrunkErrorMassage,
  createdGroup: state.createdGroup
});

const mapDispatchToProps = {
  fetchGetLicensesByGroupId,
  fetchGetTrunkByGroupID,
  fetchPutUpdateGroupDetails,
  fetchPutUpdateTrunkByGroupId,
  clearErrorMassage,
  fetchPutUpdateServicePacksByGroupId,
  fetchPutUpdateGroupServicesByGroupId,
  changeStepOfCreateGroup,
  refuseCreateTenant,
  fetchPostAddGroupServicesToGroup
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Licenses)
);
