import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import Panel from "react-bootstrap/lib/Panel";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Button from "react-bootstrap/lib/Button";
import Table from "react-bootstrap/lib/Table";

import { FormattedMessage } from "react-intl";
import Loading from "../../common/Loading";
import ServicePackAuthorisation from "../ServicePackAuthorisation";
import LicensesPanel from "../../common/License";
import SingleEdit from "../../common/License/SingleEdit";

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
  fetchPostAddGroupServicesToGroup,
  fetchGetTenantServicePack,
  showHideAdditionalServiceGroup,
  fetchGetTenantGroupService
} from "../../store/actions";

const INFINITY = 8734;

export class Licenses extends Component {
  state = {
    isLoading: true,
    isLoadingTrunk: true,
    groupServices: [],
    trunkGroups: {},
    servicePacks: [],
    newUserLimit: 0,
    editGroupServices: false,
    showModal: false,
    editTrunkLicenses: false,
    editMaxBursting: false,
    editServicePacks: false,
    editGroupServices: false,
    indexOfService: 0,
    showMore: true,
    editUserLimit: false
  };

  fetchData = () => {
    this.props
      .fetchGetLicensesByGroupId(
        this.props.match.params.tenantId,
        this.props.createdGroup.groupId
      )
      .then(data => {
        this.setState(
          {
            groupServices: this.props.groupServices.groups,
            servicePacks: this.props.servicePacks,
            newUserLimit: this.props.group.userLimit,
            isLoading: data ? false : true
          },
          () => this.props.showHideAdditionalServiceGroup(this.state.showMore)
        );
      });
    this.props
      .fetchGetTrunkByGroupID(
        this.props.match.params.tenantId,
        this.props.createdGroup.groupId
      )
      .then(() => {
        this.setState({
          trunkGroups: this.props.trunkGroups,
          newUserLimit: this.props.group.userLimit,
          isLoadingTrunk: false
        });
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const {
      isLoading,
      isLoadingTrunk,
      trunkGroups,
      editTrunkLicenses,
      editMaxBursting,
      editServicePacks,
      editGroupServices,
      indexOfService,
      editUserLimit
    } = this.state;

    if (isLoading || isLoadingTrunk) {
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
          <Row className={"margin-top-2 margin-left-8"}>
            <Col md={5}>
              <div>
                <Panel>
                  <Panel.Heading>
                    <FormattedMessage
                      id="trunling_capacity"
                      defaultMessage="TRUNKING CAPACITY"
                    />
                  </Panel.Heading>
                  {this.props.fetchTrunksGroupsFail ? (
                    Object.keys(trunkGroups).length ? (
                      <Panel.Body>
                        <Table responsive>
                          <tbody>
                            <tr>
                              <td className={"licenses-td vertical-middle"}>
                                <FormattedMessage
                                  id="trunking_licenses"
                                  defaultMessage={`Trunking licenses:`}
                                />
                              </td>
                              <td
                                className={
                                  "text-right licenses-td vertical-middle"
                                }
                              >
                                {this.props.trunkGroups.maxActiveCalls}
                              </td>
                              <td
                                className={
                                  "text-right licenses-td vertical-middle"
                                }
                              >
                                <Glyphicon
                                  glyph="glyphicon glyphicon-pencil"
                                  className={"edit-pencil"}
                                  onClick={() =>
                                    this.setState({
                                      editTrunkLicenses: true
                                    })
                                  }
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className={"licenses-td vertical-middle"}>
                                <FormattedMessage
                                  id="max_bursting"
                                  defaultMessage={`Max bursting:`}
                                />
                              </td>
                              <td
                                className={
                                  "text-right licenses-td vertical-middle"
                                }
                              >
                                {this.props.trunkGroups.burstingMaxActiveCalls
                                  .unlimited
                                  ? String.fromCharCode(INFINITY)
                                  : this.props.trunkGroups
                                      .burstingMaxActiveCalls.maximum}
                              </td>
                              <td
                                className={
                                  "text-right licenses-td vertical-middle"
                                }
                              >
                                <Glyphicon
                                  glyph="glyphicon glyphicon-pencil"
                                  className={"edit-pencil"}
                                  onClick={() =>
                                    this.setState({ editMaxBursting: true })
                                  }
                                />
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                        {editTrunkLicenses && (
                          <SingleEdit
                            isEditTunkLicenses
                            show={editTrunkLicenses}
                            title={
                              <FormattedMessage
                                id="trunling_capacity"
                                defaultMessage="TRUNKING CAPACITY"
                              />
                            }
                            onClose={() =>
                              this.setState({ editTrunkLicenses: false }, () =>
                                this.fetchData()
                              )
                            }
                            value={this.state.trunkGroups.maxActiveCalls}
                            onChange={this.changeTrunkingLicenses}
                            onSave={this.updateTrunkCapacity}
                            licenseTitle={
                              <FormattedMessage
                                id="trunking_licenses"
                                defaultMessage={`Trunking licenses:`}
                              />
                            }
                          />
                        )}
                        {editMaxBursting && (
                          <SingleEdit
                            show={editMaxBursting}
                            title={
                              <FormattedMessage
                                id="trunling_capacity"
                                defaultMessage="TRUNKING CAPACITY"
                              />
                            }
                            onClose={() =>
                              this.setState({ editMaxBursting: false }, () =>
                                this.fetchData()
                              )
                            }
                            isEditMaxBursting
                            value={
                              this.state.trunkGroups.burstingMaxActiveCalls
                                .maximum
                            }
                            infinity={
                              this.state.trunkGroups.burstingMaxActiveCalls
                                .unlimited
                            }
                            onChangeInfinity={this.changeMaxBurstingInfinity}
                            onChange={this.changeMaxBurstingValue}
                            onSave={this.updateTrunkCapacity}
                            licenseTitle={
                              <FormattedMessage
                                id="max_bursting"
                                defaultMessage={`Max bursting:`}
                              />
                            }
                          />
                        )}
                      </Panel.Body>
                    ) : (
                      <Panel.Body>
                        <FormattedMessage
                          id="no_trunk_groups"
                          defaultMessage="No info"
                        />
                      </Panel.Body>
                    )
                  ) : (
                    <Panel.Body>
                      <FormattedMessage
                        id="trunking_not_authorised"
                        defaultMessage="Trunking not authorised"
                      />
                    </Panel.Body>
                  )}
                </Panel>
                <Panel>
                  <Panel.Heading>
                    <FormattedMessage
                      id="number_of_users"
                      defaultMessage="Number of users"
                    />
                  </Panel.Heading>
                  <Panel.Body>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th className={"licenses-th"}></th>
                          <th
                            className={
                              "text-right vertical-middle licenses-th nowrap"
                            }
                          >
                            <FormattedMessage
                              id="in_use"
                              defaultMessage="in use"
                            />
                          </th>
                          <th
                            className={"text-right vertical-middle licenses-th"}
                          >
                            <FormattedMessage
                              id="limited"
                              defaultMessage="limited"
                            />
                          </th>
                          <th className={"licenses-th"}></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className={"licenses-td vertical-middle"}>
                            <FormattedMessage
                              id="service_packs"
                              defaultMessage="User limit:"
                            />
                          </td>
                          <td
                            className={"text-right licenses-td vertical-middle"}
                          >
                            {this.props.group.userCount}
                          </td>
                          <td
                            className={"text-right licenses-td vertical-middle"}
                          >
                            {this.props.group.userLimit}
                          </td>
                          <td
                            className={"text-right licenses-td vertical-middle"}
                          >
                            <Glyphicon
                              glyph="glyphicon glyphicon-pencil"
                              className={"edit-pencil"}
                              onClick={() =>
                                this.setState({
                                  editUserLimit: true
                                })
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    {editUserLimit && (
                      <SingleEdit
                        isEditGroup
                        isEditUserLimit
                        show={editUserLimit}
                        title={
                          <FormattedMessage
                            id="number_of_users"
                            defaultMessage="Number of users"
                          />
                        }
                        onClose={() =>
                          this.setState({ editUserLimit: false }, () =>
                            this.fetchData()
                          )
                        }
                        allocated={this.props.group.userCount}
                        value={this.state.newUserLimit}
                        onChange={value =>
                          this.setState({ newUserLimit: value })
                        }
                        onSave={this.updateUserLimit}
                        licenseTitle={
                          <FormattedMessage
                            id="service_packs"
                            defaultMessage="User limit:"
                          />
                        }
                      />
                    )}
                  </Panel.Body>
                </Panel>
                <Panel>
                  <Panel.Heading>
                    <FormattedMessage
                      id="service_packs"
                      defaultMessage="SERVICE PACKS"
                    />
                  </Panel.Heading>
                  <Panel.Body>
                    {this.props.servicePacks.length ? (
                      <LicensesPanel
                        licenses={this.props.servicePacks}
                        showEdit={this.showEditSericePacks}
                        isEditGroup
                      />
                    ) : (
                      <FormattedMessage
                        id="No_service_packs"
                        defaultMessage="No service packs were found"
                      />
                    )}
                    {editServicePacks && (
                      <SingleEdit
                        tenantId={this.props.match.params.tenantId}
                        isEditGroup
                        isEditPacks
                        apiRequest={this.props.fetchGetTenantServicePack}
                        pack={this.props.tenantServicePack}
                        show={editServicePacks}
                        title={
                          <FormattedMessage
                            id="service_packs"
                            defaultMessage="SERVICE PACKS"
                          />
                        }
                        onClose={() =>
                          this.setState({ editServicePacks: false }, () =>
                            this.fetchData()
                          )
                        }
                        licenseTitle={
                          this.state.servicePacks[indexOfService].name
                        }
                        allocated={
                          this.state.servicePacks[indexOfService].inUse || 0
                        }
                        value={
                          this.state.servicePacks[indexOfService].allocated
                            .maximum || 0
                        }
                        infinity={
                          this.state.servicePacks[indexOfService].allocated
                            .unlimited
                        }
                        onChangeInfinity={this.changeServicePacksUnlimeted}
                        onChange={this.changeServicePacksMaximum}
                        onSave={this.updateServicePacks}
                      />
                    )}
                  </Panel.Body>
                </Panel>
                <Button
                  className={"width-100p"}
                  bsStyle="link"
                  onClick={() => this.setState({ showModal: true })}
                >
                  <FormattedMessage
                    id="edit_service_pack_authorisation"
                    defaultMessage="Edit service pack authorisation"
                  />
                </Button>
                <ServicePackAuthorisation
                  level={"group"}
                  groupId={this.props.createdGroup.groupId}
                  isOpen={this.state.showModal}
                  handleHide={this.handleHide}
                  userServices={this.props.userServices}
                />
              </div>
            </Col>
            <Col md={7}>
              <Panel>
                <Panel.Heading>
                  <FormattedMessage
                    id="group_services"
                    defaultMessage="GROUP SERVICES"
                  />
                </Panel.Heading>
                <Panel.Body>
                  {this.props.groupServices.groups &&
                  this.props.groupServices.groups.length ? (
                    <LicensesPanel
                      licenses={this.props.groupServices.groups}
                      showHide={this.showHideAdditionalServices}
                      showEdit={this.showEditGroupServices}
                      isEditGroup
                      withShowMore
                    />
                  ) : (
                    <FormattedMessage
                      id="No_service_packs"
                      defaultMessage="No service packs were found"
                    />
                  )}
                  {editGroupServices && (
                    <SingleEdit
                      tenantId={this.props.match.params.tenantId}
                      isEditGroup
                      isEditPacks
                      apiRequest={this.props.fetchGetTenantGroupService}
                      pack={this.props.tenantGroupService}
                      show={editGroupServices}
                      title={
                        <FormattedMessage
                          id="group_services"
                          defaultMessage="GROUP SERVICES"
                        />
                      }
                      onClose={() =>
                        this.setState({ editGroupServices: false }, () =>
                          this.fetchData()
                        )
                      }
                      licenseTitle={
                        this.state.groupServices[indexOfService].name
                      }
                      allocated={this.state.groupServices[indexOfService].inUse}
                      value={
                        this.state.groupServices[indexOfService].allocated
                          .maximum || 0
                      }
                      infinity={
                        this.state.groupServices[indexOfService].allocated
                          .unlimited
                      }
                      onChangeInfinity={this.changeGroupServicesUnlimeted}
                      onChange={this.changeGroupServicesMaximum}
                      onSave={this.updateGroupServices}
                    />
                  )}
                </Panel.Body>
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

  showEditGroupServices = index => {
    this.setState({ indexOfService: index }, () =>
      this.setState({ editGroupServices: true })
    );
  };

  showEditSericePacks = index => {
    this.setState({ indexOfService: index }, () =>
      this.setState({ editServicePacks: true })
    );
  };

  changeMaxBurstingValue = value => {
    this.setState(prevState => ({
      trunkGroups: {
        ...prevState.trunkGroups,
        burstingMaxActiveCalls: {
          ...prevState.trunkGroups.burstingMaxActiveCalls,
          maximum: Number(value)
        }
      }
    }));
  };

  changeMaxBurstingInfinity = () => {
    this.setState(prevState => ({
      trunkGroups: {
        ...prevState.trunkGroups,
        burstingMaxActiveCalls: {
          ...prevState.trunkGroups.burstingMaxActiveCalls,
          unlimited: !prevState.trunkGroups.burstingMaxActiveCalls.unlimited
        }
      }
    }));
  };

  changeTrunkingLicenses = value => {
    this.setState(prevState => ({
      trunkGroups: {
        ...prevState.trunkGroups,
        maxActiveCalls: Number(value)
      }
    }));
  };

  showHideAdditionalServices = status => {
    this.setState({ showMore: status });
    this.props.showHideAdditionalServiceGroup(status);
  };

  handleHide = () => {
    this.setState({ showModal: false }, () => this.fetchData());
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

  changeServicePacksUnlimeted = checked => {
    this.setState(prevState => ({
      servicePacks: [
        ...prevState.servicePacks.slice(0, this.state.indexOfService),
        {
          ...prevState.servicePacks[this.state.indexOfService],
          allocated: {
            ...prevState.servicePacks[this.state.indexOfService].allocated,
            unlimited: checked
          }
        },
        ...prevState.servicePacks.slice(this.state.indexOfService + 1)
      ]
    }));
  };

  changeServicePacksMaximum = max => {
    this.setState(prevState => ({
      servicePacks: [
        ...prevState.servicePacks.slice(0, this.state.indexOfService),
        {
          ...prevState.servicePacks[this.state.indexOfService],
          allocated: {
            ...prevState.servicePacks[this.state.indexOfService].allocated,
            maximum: Number(max)
          }
        },
        ...prevState.servicePacks.slice(this.state.indexOfService + 1)
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

  changeGroupServicesUnlimeted = checked => {
    this.setState(prevState => ({
      groupServices: [
        ...prevState.groupServices.slice(0, this.state.indexOfService),
        {
          ...prevState.groupServices[this.state.indexOfService],
          allocated: {
            ...prevState.groupServices[this.state.indexOfService].allocated,
            unlimited: checked
          }
        },
        ...prevState.groupServices.slice(this.state.indexOfService + 1)
      ]
    }));
  };

  changeGroupServicesMaximum = max => {
    this.setState(prevState => ({
      groupServices: [
        ...prevState.groupServices.slice(0, this.state.indexOfService),
        {
          ...prevState.groupServices[this.state.indexOfService],
          allocated: {
            ...prevState.groupServices[this.state.indexOfService].allocated,
            maximum: Number(max)
          }
        },
        ...prevState.groupServices.slice(this.state.indexOfService + 1)
      ]
    }));
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
        this.props.createdGroup.groupId,
        data
      )
      .then(() =>
        this.setState({ editNumberOfUsers: false, editUserLimit: false })
      );
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
      .then(
        this.setState({ editTrunkLicenses: false, editMaxBursting: false })
      );
  };
}

const mapStateToProps = state => ({
  group: state.group,
  servicePacks: state.servicePacks,
  groupServices: state.groupServices,
  trunkGroups: state.trunkGroups,
  groupTrunkErrorMassage: state.groupTrunkErrorMassage,
  userServices: state.userServicesGroup,
  createdGroup: state.createdGroup,
  tenantServicePack: state.tenantServicePack,
  tenantGroupService: state.tenantGroupService
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
  fetchPostAddGroupServicesToGroup,
  fetchGetTenantServicePack,
  showHideAdditionalServiceGroup,
  fetchGetTenantGroupService
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Licenses)
);
