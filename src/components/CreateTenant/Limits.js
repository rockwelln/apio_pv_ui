import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Link } from "react-router-dom";

import {
  fetchGetTenantLicenses,
  fetchGetTrunkByTenantID,
  fetchPutUpdateTrunkByTenantId,
  fetchPutUpdateGroupServicesByTenantId,
  fetchPutUpdateTenantServicePacks,
  showHideAdditionalServicesTenant,
  changeStepOfCreateTenant,
  refuseCreateTenant
} from "../../store/actions";

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

import { removeEmpty } from "../remuveEmptyInObject";

const INFINITY = 8734;

export class Limits extends Component {
  state = {
    isLoading: true,
    isLoadingTrunk: true,
    groupServices: [],
    trunkGroups: {},
    servicePacks: [],
    newUserLimit: null,
    editGroupServices: false,
    showModal: false,
    editTrunkLicenses: false,
    editMaxBursting: false,
    editServicePacks: false,
    indexOfService: 0,
    showMore: true
  };

  fetchData() {
    this.props
      .fetchGetTenantLicenses(this.props.createdTenant.tenantId)
      .then(() =>
        this.setState(
          {
            isLoading: false,
            groupServices: this.props.tenantLicenses.groups,
            servicePacks: this.props.tenantServicePacks
          },
          () => this.props.showHideAdditionalServicesTenant(this.state.showMore)
        )
      );
    this.props
      .fetchGetTrunkByTenantID(this.props.createdTenant.tenantId)
      .then(() => {
        this.setState({
          trunkGroups: this.props.tenantTrunkGroups,
          isLoadingTrunk: false
        });
      });
  }
  componentDidMount() {
    this.fetchData();
  }
  render() {
    const {
      isLoadingTrunk,
      trunkGroups,
      editTrunkLicenses,
      editMaxBursting,
      editServicePacks,
      editGroupServices,
      indexOfService
    } = this.state;

    if (this.state.isLoading || isLoadingTrunk) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <Row>
            <Col md={12}>
              <div className={"header"}>Assign tenant licenses</div>
            </Col>
          </Row>
        </div>

        <div class="panel-body">
          <Row>
            <Col md={12}>
              <p>
                Set limits on how many service packs and group services a Tenant
                can consum. This is typically used to limit the volume of
                licensable items that can be consumed by a customer.
              </p>
              <div>
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
                        {this.props.isAuthorisedTrunkTenant ? (
                          Object.keys(trunkGroups).length ? (
                            <Panel.Body>
                              <Table responsive>
                                <tbody>
                                  <tr>
                                    <td
                                      className={"licenses-td vertical-middle"}
                                    >
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
                                      {
                                        this.props.tenantTrunkGroups
                                          .maxActiveCalls.maximum
                                      }
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
                                    <td
                                      className={"licenses-td vertical-middle"}
                                    >
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
                                      {this.props.tenantTrunkGroups
                                        .burstingMaxActiveCalls.unlimited
                                        ? String.fromCharCode(INFINITY)
                                        : this.props.tenantTrunkGroups
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
                                          this.setState({
                                            editMaxBursting: true
                                          })
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
                                    this.setState(
                                      { editTrunkLicenses: false },
                                      () => this.fetchData()
                                    )
                                  }
                                  value={
                                    this.state.trunkGroups.maxActiveCalls
                                      .maximum
                                  }
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
                                    this.setState(
                                      { editMaxBursting: false },
                                      () => this.fetchData()
                                    )
                                  }
                                  isEditMaxBursting
                                  value={
                                    this.state.trunkGroups
                                      .burstingMaxActiveCalls.maximum
                                  }
                                  infinity={
                                    this.state.trunkGroups
                                      .burstingMaxActiveCalls.unlimited
                                  }
                                  onChangeInfinity={
                                    this.changeMaxBurstingInfinity
                                  }
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
                            id="service_packs"
                            defaultMessage="SERVICE PACKS"
                          />
                        </Panel.Heading>
                        <Panel.Body>
                          {this.props.tenantServicePacks.length ? (
                            <LicensesPanel
                              licenses={this.props.tenantServicePacks}
                              showEdit={this.showEditSericePacks}
                            />
                          ) : (
                            <FormattedMessage
                              id="No_service_packs"
                              defaultMessage="No service packs were found"
                            />
                          )}
                          {editServicePacks && (
                            <SingleEdit
                              isEditPacks
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
                                this.state.servicePacks[indexOfService]
                                  .currentlyAllocated
                              }
                              value={
                                this.state.servicePacks[indexOfService]
                                  .allocated.maximum
                              }
                              infinity={
                                this.state.servicePacks[indexOfService]
                                  .allocated.unlimited
                              }
                              onChangeInfinity={
                                this.changeServicePacksUnlimeted
                              }
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
                          id="edit_end_user_service_authorisation"
                          defaultMessage="Edit end user service authorisation"
                        />
                      </Button>
                      <ServicePackAuthorisation
                        level={"tenant"}
                        tenantId={this.props.createdTenant.tenantId}
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
                        {this.props.tenantLicenses.groups &&
                        this.props.tenantLicenses.groups.length ? (
                          <LicensesPanel
                            licenses={this.props.tenantLicenses.groups}
                            showHide={this.showHideAdditionalServices}
                            showEdit={this.showEditGroupServices}
                            withShowMore
                          />
                        ) : (
                          <FormattedMessage
                            id="No_service_found"
                            defaultMessage="No services were found"
                          />
                        )}
                        {editGroupServices && (
                          <SingleEdit
                            isEditPacks
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
                            allocated={
                              this.state.groupServices[indexOfService]
                                .currentlyAllocated
                            }
                            value={
                              this.state.groupServices[indexOfService].allocated
                                .maximum
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
              </div>
            </Col>
          </Row>
          <Row>
            <div class="button-row">
              <div class="pull-right">
                <Button
                  onClick={() => this.props.changeStepOfCreateTenant("Admin")}
                  className={"btn-primary"}
                >
                  <Glyphicon glyph="glyphicon glyphicon-forward" />
                  &nbsp; Next
                </Button>
              </div>
              <div className="pull-right link-button">
                <Link
                  to={`/provisioning/${this.props.match.params.gwName}/tenants`}
                >
                  <div onClick={() => this.props.refuseCreateTenant()}>
                    Quit wizard
                  </div>
                </Link>
              </div>
            </div>
          </Row>
        </div>
      </React.Fragment>
    );
  }

  showEditSericePacks = index => {
    this.setState({ indexOfService: index }, () =>
      this.setState({ editServicePacks: true })
    );
  };

  showEditGroupServices = index => {
    this.setState({ indexOfService: index }, () =>
      this.setState({ editGroupServices: true })
    );
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

  showHideAdditionalServices = status => {
    this.setState({ showMore: status });
    this.props.showHideAdditionalServicesTenant(status);
  };

  changeTrunkingLicenses = value => {
    this.setState(prevState => ({
      trunkGroups: {
        ...prevState.trunkGroups,
        maxActiveCalls: {
          ...prevState.trunkGroups.maxActiveCalls,
          maximum: Number(value)
        }
      }
    }));
  };

  handleHide = () => {
    this.setState({ showModal: false });
    this.fetchData();
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

  updateTrunkCapacity = () => {
    const data = {
      maxActiveCalls: this.state.trunkGroups.maxActiveCalls,
      burstingMaxActiveCalls: this.state.trunkGroups.burstingMaxActiveCalls
    };
    this.props
      .fetchPutUpdateTrunkByTenantId(this.props.createdTenant.tenantId, data)
      .then(
        this.setState({ editTrunkLicenses: false, editMaxBursting: false })
      );
  };

  updateGroupServices = () => {
    const data = {
      groupServices: this.state.groupServices
    };

    // const authorisedServices = {
    //   services: this.state.groupServices.reduce((prev, service) => {
    //     if (
    //       !(!service.allocated.unlimited && service.allocated.maximum === 0)
    //     ) {
    //       prev.push({ name: service.name });
    //       return prev;
    //     }
    //     return prev;
    //   }, [])
    // };

    this.props
      .fetchPutUpdateGroupServicesByTenantId(
        this.props.createdTenant.tenantId,
        data
      )
      .then(() => this.fetchData())
      .then(() => this.setState({ editGroupServices: false }));
  };

  updateServicePacks = () => {
    const packs = [...this.state.servicePacks];
    const arrayOfPromise = [];
    packs.forEach(pack => {
      const clearPack = removeEmpty(pack);
      arrayOfPromise.push(
        this.props.fetchPutUpdateTenantServicePacks(
          this.props.createdTenant.tenantId,
          clearPack.name,
          clearPack
        )
      );
    });
    Promise.all(arrayOfPromise)
      .then(() => this.fetchData())
      .then(() => this.setState({ editServicePacks: false }));
  };
}

const mapStateToProps = state => ({
  createdTenant: state.createdTenant,
  tenantLicenses: state.tenantLicenses,
  tenantTrunkGroups: state.tenantTrunkGroups,
  tenantServicePacks: state.tenantServicePacks,
  userServices: state.userServicesTenant,
  isAuthorisedTrunkTenant: state.isAuthorisedTrunkTenant
});

const mapDispatchToProps = {
  fetchGetTenantLicenses,
  fetchGetTrunkByTenantID,
  fetchPutUpdateTrunkByTenantId,
  fetchPutUpdateGroupServicesByTenantId,
  fetchPutUpdateTenantServicePacks,
  showHideAdditionalServicesTenant,
  changeStepOfCreateTenant,
  refuseCreateTenant
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Limits)
);
