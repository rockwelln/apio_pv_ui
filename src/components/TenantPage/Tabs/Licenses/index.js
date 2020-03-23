import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
  fetchGetTenantLicenses,
  fetchGetTrunkByTenantID,
  clearErrorMassage,
  fetchPutUpdateTrunkByTenantId,
  fetchPutUpdateGroupServicesByTenantId,
  fetchPutUpdateTenantServicePacks
} from "../../../../store/actions";

import Panel from "react-bootstrap/lib/Panel";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import Checkbox from "react-bootstrap/lib/Checkbox";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import Button from "react-bootstrap/lib/Button";
import Table from "react-bootstrap/lib/Table";

import { FormattedMessage } from "react-intl";
import Loading from "../../../../common/Loading";
import EditLicenses from "../../../../common/EditLicenses";
import ServicePackAuthorisation from "../../../ServicePackAuthorisation";
import LicensesPanel from "../../../../common/License";
import SingleEdit from "../../../../common/License/SingleEdit";

import { removeEmpty } from "../../../remuveEmptyInObject";

const INFINITY = 8734;

export class Licenses extends Component {
  state = {
    isLoading: true,
    isLoadingTrunk: true,
    groupServices: [],
    showMore: false,
    trunkGroups: {},
    servicePacks: [],
    editNumberOfUsers: false,
    newUserLimit: null,
    editTrunkCapacity: false,
    editServicePacks: false,
    editGroupServices: false,
    showModal: false,

    editTrunkLicenses: false,
    editMaxBursting: false
  };

  fetchData() {
    this.props
      .fetchGetTenantLicenses(this.props.match.params.tenantId)
      .then(() =>
        this.setState({
          isLoading: false,
          groupServices: this.props.tenantLicenses.groups,
          servicePacks: this.props.tenantServicePacks
        })
      );
    this.props
      .fetchGetTrunkByTenantID(this.props.match.params.tenantId)
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
      isLoadingLicenses,
      trunkGroups,
      editNumberOfUsers,
      editTrunkCapacity,
      editServicePacks,
      editGroupServices,

      editTrunkLicenses,
      editMaxBursting
    } = this.state;
    if (this.state.isLoading || isLoadingTrunk) {
      return <Loading />;
    }
    return (
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
                          <td className={"licenses-td vertical-middle"}>
                            <FormattedMessage
                              id="trunking_licenses"
                              defaultMessage={`Trunking licenses:`}
                            />
                          </td>
                          <td
                            className={"text-right licenses-td vertical-middle"}
                          >
                            {
                              this.props.tenantTrunkGroups.maxActiveCalls
                                .maximum
                            }
                          </td>
                          <td
                            className={"text-right licenses-td vertical-middle"}
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
                            className={"text-right licenses-td vertical-middle"}
                          >
                            {this.props.tenantTrunkGroups.burstingMaxActiveCalls
                              .unlimited
                              ? String.fromCharCode(INFINITY)
                              : this.props.tenantTrunkGroups
                                  .burstingMaxActiveCalls.maximum}
                          </td>
                          <td
                            className={"text-right licenses-td vertical-middle"}
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
                    <SingleEdit
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
                      isEditTrunkLicenses
                      value={this.state.trunkGroups.maxActiveCalls.maximum}
                      onChange={this.changeTrunkingLicenses}
                      onSave={this.updateTrunkCapacity}
                    />
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
                        this.state.trunkGroups.burstingMaxActiveCalls.maximum
                      }
                      infinity={
                        this.state.trunkGroups.burstingMaxActiveCalls.unlimited
                      }
                      onChangeInfinity={this.changeMaxBurstingInfinity}
                      onChange={this.changeMaxBurstingValue}
                      onSave={this.updateTrunkCapacity}
                    />
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
                {this.state.servicePacks.length ? (
                  <LicensesPanel licenses={this.state.servicePacks} />
                ) : (
                  <FormattedMessage
                    id="No_service_packs"
                    defaultMessage="No service packs were found"
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
              tenantId={this.props.match.params.tenantId}
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
                  licenses={this.state.groupServices}
                  showHide={this.showHideAdditionalServices}
                  withShowMore
                />
              ) : (
                <FormattedMessage
                  id="No_service_packs"
                  defaultMessage="No service packs were found"
                />
              )}
            </Panel.Body>
          </Panel>
        </Col>
        {/* <Col md={4}>
          <Row>
            <Panel>
              <Panel.Heading>
                <FormattedMessage
                  id="trunling_capacity"
                  defaultMessage="TRUNKING CAPACITY"
                />
                {!editTrunkCapacity ? (
                  !!Object.keys(trunkGroups).length && (
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
                          trunkGroups: this.props.tenantTrunkGroups
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
              {this.props.isAuthorisedTrunkTenant ? (
                Object.keys(trunkGroups).length ? (
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
                        >{`${this.props.tenantTrunkGroups.maxActiveCalls.maximum}`}</Col>
                      ) : (
                        <Col md={4} className={"text-right"}>
                          <FormControl
                            type="number"
                            defaultValue={
                              this.props.tenantTrunkGroups.maxActiveCalls
                                .maximum
                            }
                            min={0}
                            onChange={e => {
                              this.props.clearErrorMassage();
                              let target = e.currentTarget;
                              this.setState(prevState => ({
                                trunkGroups: {
                                  ...prevState.trunkGroups,
                                  maxActiveCalls: {
                                    ...prevState.trunkGroups.maxActiveCalls,
                                    maximum: Number(target.value)
                                  }
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
                          this.props.tenantTrunkGroups.burstingMaxActiveCalls
                            .unlimited
                            ? String.fromCharCode(INFINITY)
                            : this.props.tenantTrunkGroups
                                .burstingMaxActiveCalls.maximum
                        }`}</Col>
                      ) : (
                        <Col md={4} className={"text-right"}>
                          <Checkbox
                            defaultChecked={
                              this.props.tenantTrunkGroups
                                .burstingMaxActiveCalls.unlimited
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
                              min={0}
                              defaultValue={
                                this.props.tenantTrunkGroups
                                  .burstingMaxActiveCalls.maximum
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
                                      maximum: Number(target.value)
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

            {this.props.tenantLicenses.groups &&
            this.props.tenantLicenses.groups.length ? (
              <Panel.Body>
                <Row>
                  <Col
                    mdOffset={5}
                    md={3}
                    className={"text-center font-weight-bold"}
                  >
                    allocated to
                  </Col>
                  <Col md={3} className={"text-center font-weight-bold"}>
                    limited to
                  </Col>
                </Row>
                {this.state.groupServices.map((pack, i) =>
                  !this.state.showMore && !editGroupServices ? (
                    i <= this.props.tenantLicenses.countShown - 1 ? (
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
                              pack.currentlyAllocated
                                ? pack.currentlyAllocated
                                : 0
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
                            pack.currentlyAllocated
                              ? pack.currentlyAllocated
                              : 0
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
                        pack.currentlyAllocated ? pack.currentlyAllocated : 0
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
              {!!this.state.servicePacks.length &&
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
                          servicePacks: this.props.tenantServicePacks,
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
            {this.state.servicePacks.length ? (
              <Panel.Body>
                <Row>
                  <Col
                    mdOffset={5}
                    md={3}
                    className={"text-center font-weight-bold"}
                  >
                    allocated to
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
                    {!pack.allocated.unlimited && pack.allocated.maximum === 0 && (
                      <Col md={6} className={"text-center"}>
                        not authorised
                      </Col>
                    )}

                    {pack.allocated.maximum !== 0 && (
                      <Col md={3} className={"text-center"}>{`${
                        pack.currentlyAllocated ? pack.currentlyAllocated : 0
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
                          changePacksMaximum={this.changeServicePacksMaximum}
                          maximumAllowed={pack.maximumAllowed}
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
          <Row className={"flex justify-center"}>
            <Col>
              <Button
                bsStyle="link"
                onClick={() => this.setState({ showModal: true })}
              >
                <FormattedMessage
                  id="edit_end_user_service_authorisation"
                  defaultMessage="Edit end user service authorisation"
                />
              </Button>
            </Col>
            <ServicePackAuthorisation
              level={"tenant"}
              tenantId={this.props.match.params.tenantId}
              isOpen={this.state.showModal}
              handleHide={this.handleHide}
              userServices={this.props.userServices}
            />
          </Row>
        </Col> */}
      </Row>
    );
  }

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

  changeMaxBurstingValue = e => {
    let value = e.target.value;
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
    const { groupServices } = this.state;
    const newGroupServices = [];
    groupServices.forEach(el => {
      if (el.additional) {
        newGroupServices.push({ ...el, hide: status });
      } else {
        newGroupServices.push(el);
      }
    });
    this.setState({ groupServices: newGroupServices });
  };

  changeTrunkingLicenses = e => {
    let value = e.target.value;
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
    ////////////
    const data = {
      maxActiveCalls: this.state.trunkGroups.maxActiveCalls,
      burstingMaxActiveCalls: this.state.trunkGroups.burstingMaxActiveCalls
    };
    this.props
      .fetchPutUpdateTrunkByTenantId(this.props.match.params.tenantId, data)
      .then(
        this.setState({ editTrunkLicenses: false, editMaxBursting: false })
      );
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
      .fetchPutUpdateGroupServicesByTenantId(
        this.props.match.params.tenantId,
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
          this.props.match.params.tenantId,
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
  tenantLicenses: state.tenantLicenses,
  tenantTrunkGroups: state.tenantTrunkGroups,
  tenantServicePacks: state.tenantServicePacks,
  userServices: state.userServicesTenant,
  isAuthorisedTrunkTenant: state.isAuthorisedTrunkTenant
});

const mapDispatchToProps = {
  fetchGetTenantLicenses,
  fetchGetTrunkByTenantID,
  clearErrorMassage,
  fetchPutUpdateTrunkByTenantId,
  fetchPutUpdateGroupServicesByTenantId,
  fetchPutUpdateTenantServicePacks
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Licenses)
);
