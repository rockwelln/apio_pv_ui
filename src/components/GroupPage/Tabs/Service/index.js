import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Button from "react-bootstrap/lib/Button";
import Radio from "react-bootstrap/lib/Radio";

import { FormattedMessage } from "react-intl";
import Loading from "../../../../common/Loading";
import { removeEmpty } from "../../../remuveEmptyInObject";

import {
  fetchGetConfig,
  fetchGetGroupById,
  fetchPutUpdateGroupDetails
} from "../../../../store/actions";

import { isAllowed, pages } from "../../../../utils/user";
import RebootWindow from "../../RebootWindow";

export class Service extends Component {
  state = {
    isLoading: true,
    group: {},
    disableButton: false,
    data: {},
    showRebootDialog: false
  };

  fetchReq = () => {
    this.props
      .fetchGetGroupById(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() =>
        this.setState({ group: this.props.group }, () =>
          this.props.fetchGetConfig().then(() =>
            this.setState({
              isLoading: false,
              group: {
                ...this.state.group,
                ncos:
                  this.state.group.ncos ||
                  this.props.config.tenant.group.ncos[0].value,
                aoc:
                  this.state.group.aoc ||
                  this.props.config.tenant.group.aoc[0].value,
                dtmf:
                  this.state.group.dtmf ||
                  this.props.config.tenant.group.dtmf[0].value,
                clip: this.state.group.clip || false,
                clir: this.state.group.clir || false,
                colr: this.state.group.colr || false,
                colp: this.state.group.colp || false
              }
            })
          )
        )
      );
  };

  componentDidMount() {
    this.fetchReq();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.hash !== this.props.location.hash) {
      this.fetchReq();
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <Loading />
        </div>
      );
    }
    return (
      <React.Fragment>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <ControlLabel>
                <FormattedMessage id="ncosValue" defaultMessage="NCOS value" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.group.ncos}
                onChange={e =>
                  this.setState({
                    group: {
                      ...this.state.group,
                      ncos: e.target.value
                    }
                  })
                }
                disabled={
                  this.state.isDisabled ||
                  !isAllowed(
                    localStorage.getItem("userProfile"),
                    pages.edit_group_services
                  )
                }
              >
                {this.props.config.tenant.group.ncos.map((el, i) => (
                  <option key={i} value={el.value}>
                    {el.label}
                  </option>
                ))}
              </FormControl>
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>CLIP</div>
            <div className={"margin-right-1 flex-basis-11"}>
              <Radio
                className={"margin-0 flex margin-right-2"}
                name="clip"
                checked={this.state.group.clip}
                onChange={e =>
                  this.setState({
                    group: {
                      ...this.state.group,
                      clip: true
                    }
                  })
                }
                disabled={
                  !isAllowed(
                    localStorage.getItem("userProfile"),
                    pages.edit_group_services
                  )
                }
              >
                <div className="font-weight-bold flex">Active</div>
              </Radio>
            </div>
            <div className={"margin-right-1"}>
              <Radio
                className={"margin-0 flex margin-right-2"}
                name="clip"
                checked={!this.state.group.clip}
                onChange={e =>
                  this.setState({
                    group: {
                      ...this.state.group,
                      clip: false
                    }
                  })
                }
                disabled={
                  !isAllowed(
                    localStorage.getItem("userProfile"),
                    pages.edit_group_services
                  )
                }
              >
                <div className="font-weight-bold flex">Not Active</div>
              </Radio>
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>CLIR</div>
            <div className={"margin-right-1 flex-basis-11"}>
              <Radio
                className={"margin-0 flex margin-right-2"}
                name="clir"
                checked={this.state.group.clir}
                onChange={e =>
                  this.setState({
                    group: {
                      ...this.state.group,
                      clir: true
                    }
                  })
                }
                disabled={
                  !isAllowed(
                    localStorage.getItem("userProfile"),
                    pages.edit_group_services
                  )
                }
              >
                <div className="font-weight-bold flex">Active</div>
              </Radio>
            </div>
            <div className={"margin-right-1"}>
              <Radio
                className={"margin-0 flex margin-right-2"}
                name="clir"
                checked={!this.state.group.clir}
                onChange={e =>
                  this.setState({
                    group: {
                      ...this.state.group,
                      clir: false
                    }
                  })
                }
                disabled={
                  !isAllowed(
                    localStorage.getItem("userProfile"),
                    pages.edit_group_services
                  )
                }
              >
                <div className="font-weight-bold flex">Not Active</div>
              </Radio>
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>COLR</div>
            <div className={"margin-right-1 flex-basis-11"}>
              <Radio
                className={"margin-0 flex margin-right-2"}
                name="colr"
                checked={this.state.group.colr}
                onChange={e =>
                  this.setState({
                    group: {
                      ...this.state.group,
                      colr: true
                    }
                  })
                }
                disabled={
                  !isAllowed(
                    localStorage.getItem("userProfile"),
                    pages.edit_group_services
                  )
                }
              >
                <div className="font-weight-bold flex">Active</div>
              </Radio>
            </div>
            <div className={"margin-right-1"}>
              <Radio
                className={"margin-0 flex margin-right-2"}
                name="colr"
                checked={!this.state.group.colr}
                onChange={e =>
                  this.setState({
                    group: {
                      ...this.state.group,
                      colr: false
                    }
                  })
                }
                disabled={
                  !isAllowed(
                    localStorage.getItem("userProfile"),
                    pages.edit_group_services
                  )
                }
              >
                <div className="font-weight-bold flex">Not Active</div>
              </Radio>
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>COLP</div>
            <div className={"margin-right-1 flex-basis-11"}>
              <Radio
                className={"margin-0 flex margin-right-2"}
                name="colp"
                checked={this.state.group.colp}
                onChange={e =>
                  this.setState({
                    group: {
                      ...this.state.group,
                      colp: true
                    }
                  })
                }
                disabled={
                  !isAllowed(
                    localStorage.getItem("userProfile"),
                    pages.edit_group_services
                  )
                }
              >
                <div className="font-weight-bold flex">Active</div>
              </Radio>
            </div>
            <div className={"margin-right-1"}>
              <Radio
                className={"margin-0 flex margin-right-2"}
                name="colp"
                checked={!this.state.group.colp}
                onChange={e =>
                  this.setState({
                    group: {
                      ...this.state.group,
                      colp: false
                    }
                  })
                }
                disabled={
                  !isAllowed(
                    localStorage.getItem("userProfile"),
                    pages.edit_group_services
                  )
                }
              >
                <div className="font-weight-bold flex">Not Active</div>
              </Radio>
            </div>
          </Col>
        </Row>
        {(this.state.group.pbxType === "PRA" ||
          this.state.group.pbxType === "PRA_SIP" ||
          this.state.group.pbxType === "SIP_PRA") && (
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                <ControlLabel>
                  <FormattedMessage id="aoc" defaultMessage="AOC" />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  componentClass="select"
                  value={this.state.group.aoc}
                  onChange={e =>
                    this.setState({
                      group: {
                        ...this.state.group,
                        aoc: e.target.value === "false" ? false : e.target.value
                      }
                    })
                  }
                  disabled={
                    this.state.isDisabled ||
                    !isAllowed(
                      localStorage.getItem("userProfile"),
                      pages.edit_group_services
                    )
                  }
                >
                  {this.props.config.tenant.group.aoc.map((el, i) => (
                    <option key={i} value={el.value}>
                      {el.label}
                    </option>
                  ))}
                </FormControl>
              </div>
            </Col>
          </Row>
        )}
        {(this.state.group.pbxType === "SIP" ||
          this.state.group.pbxType === "PRA_SIP" ||
          this.state.group.pbxType === "SIP_PRA") && (
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                <ControlLabel>
                  <FormattedMessage id="dtmf" defaultMessage="DTMF" />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  componentClass="select"
                  value={this.state.group.dtmf}
                  onChange={e =>
                    this.setState({
                      group: {
                        ...this.state.group,
                        dtmf: e.target.value
                      }
                    })
                  }
                  disabled={
                    this.state.isDisabled ||
                    !isAllowed(
                      localStorage.getItem("userProfile"),
                      pages.edit_group_services
                    )
                  }
                >
                  {this.props.config.tenant.group.dtmf.map((el, i) => (
                    <option key={i} value={el.value}>
                      {el.label}
                    </option>
                  ))}
                </FormControl>
              </div>
            </Col>
          </Row>
        )}
        <Row>
          <div className="button-row">
            <div className="pull-right">
              {isAllowed(
                localStorage.getItem("userProfile"),
                pages.edit_group_services
              ) ? (
                <Button
                  onClick={this.updateService}
                  className={"btn-primary"}
                  disabled={this.state.disableButton}
                >
                  {this.state.disableButton ? (
                    <FormattedMessage
                      id="updating"
                      defaultMessage="Updating..."
                    />
                  ) : (
                    <FormattedMessage id="update" defaultMessage="Update" />
                  )}
                </Button>
              ) : null}
            </div>
          </div>
        </Row>
        <RebootWindow
          data={this.state.data}
          show={this.state.showRebootDialog}
          onClose={() => this.setState({ showRebootDialog: false })}
        />
      </React.Fragment>
    );
  }

  updateService = () => {
    const { ncos, aoc, dtmf, clip, clir, colr, colp } = this.state.group;
    const data = {
      ncos,
      aoc,
      dtmf,
      clip,
      clir,
      colr,
      colp
    };
    this.setState({ disableButton: true });
    const clearData = removeEmpty(data);

    if (
      this.state.group.pbxType === "SIP" &&
      this.state.group.dtmf !== this.props.group.dtmf
    ) {
      this.setState({
        showRebootDialog: true,
        data: clearData,
        disableButton: false
      });
      return;
    }

    this.props
      .fetchPutUpdateGroupDetails(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        clearData
      )
      .then(() => this.setState({ disableButton: false }));
  };
}

const mapStateToProps = state => ({ group: state.group, config: state.config });

const mapDispatchToProps = {
  fetchGetConfig,
  fetchGetGroupById,
  fetchPutUpdateGroupDetails
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Service)
);
