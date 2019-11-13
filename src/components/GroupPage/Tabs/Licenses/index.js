import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Panel from "react-bootstrap/lib/Panel";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import Checkbox from "react-bootstrap/lib/Checkbox";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import Button from "react-bootstrap/lib/Button";

import { FormattedMessage } from "react-intl";
import Loading from "../../../../common/Loading";
import EditLicenses from "../../../../common/EditLicenses";
import ServicePackAuthorisation from "../../../ServicePackAuthorisation";

import {
  fetchGetLicensesByGroupId,
  fetchGetTrunkByGroupID,
  fetchPutUpdateGroupDetails,
  fetchPutUpdateTrunkByGroupId,
  clearErrorMassage,
  fetchPutUpdateServicePacksByGroupId,
  fetchPutUpdateGroupServicesByGroupId,
  fetchPostAddGroupServicesToGroup
} from "../../../../store/actions";

const INFINITY = 8734;

export class Licenses extends Component {
  state = {
    isLoadingLicenses: true,
    isLoadingTrunk: true,
    showMore: false,
    trunkGroups: {},
    servicePacks: [],
    editNumberOfUsers: false,
    newUserLimit: null,
    editTrunkCapacity: false,
    editServicePacks: false,
    editGroupServices: false,
    showModal: false
  };

  fetchData = () => {
    this.props
      .fetchGetLicensesByGroupId(this.props.tenantId, this.props.groupId)
      .then(data => {
        this.setState({
          groupServices: this.props.groupServices.groups,
          servicePacks: this.props.servicePacks,
          isLoadingLicenses: data ? false : true
        });
      });
    this.props
      .fetchGetTrunkByGroupID(this.props.tenantId, this.props.groupId)
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
      editNumberOfUsers,
      editTrunkCapacity,
      editServicePacks,
      editGroupServices
    } = this.state;
    const { group, servicePacks, groupServices } = this.props;

    if (isLoadingLicenses || isLoadingTrunk) {
      return <Loading />;
    }

    return (
      <Row className={"margin-top-2 margin-left-8"}>
        <Col md={4}>
          <Row>
            <Panel>
              <Panel.Heading>
                <FormattedMessage
                  id="trunling_capacity"
                  defaultMessage="TRUNKING CAPACITY"
                />
                {!editTrunkCapacity ? (
                  !!Object.keys(trunkGroups).length &&
                  !!trunkGroups.maxAvailableActiveCalls.maximum && (
                    <Button
                      onClick={() => {
                        this.props.clearErrorMassage();
                        this.setState({ editTrunkCapacity: true });
                      }}
                      className={"btn-primary panel-header-btn"}
                    >
                      <Glyphicon glyph="glyphicon glyphicon-pencil" />
                      &nbsp; Edit
                    </Button>
                  )
                ) : (
                  <React.Fragment>
                    <Button
                      onClick={() => {
                        this.props.clearErrorMassage();
                        this.setState({
                          editTrunkCapacity: false,
                          trunkGroups: this.props.trunkGroups
                        });
                      }}
                      className={"btn-danger panel-header-btn"}
                    >
                      <Glyphicon glyph="glyphicon glyphicon-ban-circle" />
                      &nbsp; Cancel
                    </Button>

                    <Button
                      onClick={this.updateTrunkCapacity}
                      className={"btn-success panel-header-btn"}
                    >
                      <Glyphicon glyph="glyphicon glyphicon-ok-circle" />
                      &nbsp; Save
                    </Button>
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
                          min={0}
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
                        this.props.trunkGroups.burstingMaxActiveCalls.unlimited
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
                            min={0}
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
          </Row>
          <Row>
            <Panel>
              <Panel.Heading>
                <FormattedMessage
                  id="number_of_users"
                  defaultMessage="Number of users"
                />
                {!editNumberOfUsers ? (
                  <Button
                    onClick={() => this.setState({ editNumberOfUsers: true })}
                    className={"btn-primary panel-header-btn"}
                  >
                    <Glyphicon glyph="glyphicon glyphicon-pencil" />
                    &nbsp; Edit
                  </Button>
                ) : (
                  <React.Fragment>
                    <Button
                      onClick={() =>
                        this.setState({
                          editNumberOfUsers: false
                        })
                      }
                      className={"btn-danger panel-header-btn"}
                    >
                      <Glyphicon glyph="glyphicon glyphicon-ban-circle" />
                      &nbsp; Cancel
                    </Button>

                    <Button
                      onClick={this.updateUserLimit}
                      className={"btn-success panel-header-btn"}
                    >
                      <Glyphicon glyph="glyphicon glyphicon-ok-circle" />
                      &nbsp; Save
                    </Button>
                  </React.Fragment>
                )}
              </Panel.Heading>
              <Panel.Body>
                <Row>
                  <Col
                    mdOffset={4}
                    md={4}
                    className={"text-center font-weight-bold"}
                  >
                    in use
                  </Col>
                  <Col md={4} className={"text-center font-weight-bold"}>
                    limited to
                  </Col>
                </Row>
                <Row>
                  <Col md={4} className={"text-left"}>
                    <FormattedMessage
                      id="service_packs"
                      defaultMessage="User limit:"
                    />
                  </Col>
                  <Col
                    md={4}
                    className={"text-center"}
                  >{`${group.userCount}`}</Col>
                  {!editNumberOfUsers ? (
                    <Col
                      md={4}
                      className={"text-center"}
                    >{`${group.userLimit}`}</Col>
                  ) : (
                    <Col md={4} className={"text-center"}>
                      <FormControl
                        type="number"
                        min={0}
                        defaultValue={group.userLimit}
                        onChange={e => {
                          this.setState({ newUserLimit: e.target.value });
                        }}
                      />
                    </Col>
                  )}
                </Row>
              </Panel.Body>
            </Panel>
          </Row>
        </Col>

        <Col md={4}>
          <Panel>
            <Panel.Heading>
              <FormattedMessage
                id="group_services"
                defaultMessage="GROUP SERVICES"
              />
              {!editGroupServices ? (
                <Button
                  onClick={() => {
                    this.setState({ editGroupServices: true });
                  }}
                  className={"btn-primary panel-header-btn"}
                >
                  <Glyphicon glyph="glyphicon glyphicon-pencil" />
                  &nbsp; Edit
                </Button>
              ) : (
                <React.Fragment>
                  <Button
                    onClick={() =>
                      this.setState({
                        editGroupServices: false
                      })
                    }
                    className={"btn-danger panel-header-btn"}
                  >
                    <Glyphicon glyph="glyphicon glyphicon-ban-circle" />
                    &nbsp; Cancel
                  </Button>

                  <Button
                    onClick={this.updateGroupServices}
                    className={"btn-success panel-header-btn"}
                  >
                    <Glyphicon glyph="glyphicon glyphicon-ok-circle" />
                    &nbsp; Save
                  </Button>
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
                        <Col md={6} className={"text-center"}>
                          not authorised
                        </Col>
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
                          changePacksMaximum={this.changeGroupServicesMaximum}
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
        </Col>

        <Col md={4}>
          <Panel>
            <Panel.Heading>
              <FormattedMessage
                id="service_packs"
                defaultMessage="SERVICE PACKS"
              />
              {!!servicePacks.length &&
                (!editServicePacks ? (
                  <Button
                    onClick={() => this.setState({ editServicePacks: true })}
                    className={"btn-primary panel-header-btn"}
                  >
                    <Glyphicon glyph="glyphicon glyphicon-pencil" />
                    &nbsp; Edit
                  </Button>
                ) : (
                  <React.Fragment>
                    <Button
                      onClick={() =>
                        this.setState({
                          servicePacks: this.props.servicePacks,
                          editServicePacks: false
                        })
                      }
                      className={"btn-danger panel-header-btn"}
                    >
                      <Glyphicon glyph="glyphicon glyphicon-ban-circle" />
                      &nbsp; Cancel
                    </Button>

                    <Button
                      onClick={this.updateServicePacks}
                      className={"btn-success panel-header-btn"}
                    >
                      <Glyphicon glyph="glyphicon glyphicon-ok-circle" />
                      &nbsp; Save
                    </Button>
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
                {this.state.servicePacks.map((pack, i) =>
                  !editServicePacks ? (
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
                  ) : !editServicePacks ? (
                    <Row key={i}>
                      <Col md={5} className={"text-left"}>
                        <FormattedMessage
                          id="service_packs"
                          defaultMessage={`${pack.name}:`}
                        />
                      </Col>
                      {!pack.allocated.unlimited &&
                      pack.allocated.maximum === 0 ? (
                        <Col md={6} className={"text-center"}>
                          not authorised
                        </Col>
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
                            this.changeServicePacksUnlimeted
                          }
                          changePacksMaximum={this.changeServicePacksMaximum}
                        />
                      </Col>
                    </Row>
                  )
                )}
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
          <Row className={"flex justify-center"}>
            <Col>
              <Button
                bsStyle="link"
                onClick={() => this.setState({ showModal: true })}
              >
                Edit service pack authorisation
              </Button>
            </Col>
            <ServicePackAuthorisation
              isOpen={this.state.showModal}
              handleHide={this.handleHide}
              userServices={this.props.userServices}
            />
          </Row>
        </Col>
      </Row>
    );
  }

  handleHide = () => {
    this.setState({ showModal: false });
  };

  updateServicePacks = () => {
    const data = {
      servicePacks: this.state.servicePacks
    };

    this.props
      .fetchPutUpdateServicePacksByGroupId(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
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
        this.props.match.params.groupId,
        data
      )
      .then(() =>
        this.props.fetchPostAddGroupServicesToGroup(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
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

  updateUserLimit = () => {
    const data = {
      userLimit: this.state.newUserLimit
        ? parseInt(this.state.newUserLimit, 10)
        : this.props.group.userLimit
    };

    this.props
      .fetchPutUpdateGroupDetails(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        data
      )
      .then(() => this.setState({ editNumberOfUsers: false }));
  };

  updateTrunkCapacity = () => {
    const data = {
      maxActiveCalls: this.state.trunkGroups.maxActiveCalls,
      burstingMaxActiveCalls: this.state.trunkGroups.burstingMaxActiveCalls
    };

    this.props
      .fetchPutUpdateTrunkByGroupId(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
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
  userServices: state.userServices
});

const mapDispatchToProps = {
  fetchGetLicensesByGroupId,
  fetchGetTrunkByGroupID,
  fetchPutUpdateGroupDetails,
  fetchPutUpdateTrunkByGroupId,
  clearErrorMassage,
  fetchPutUpdateServicePacksByGroupId,
  fetchPutUpdateGroupServicesByGroupId,
  fetchPostAddGroupServicesToGroup
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Licenses)
);
