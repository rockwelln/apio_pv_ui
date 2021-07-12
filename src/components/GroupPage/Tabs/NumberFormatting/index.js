import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Button from "react-bootstrap/lib/Button";

import { FormattedMessage } from "react-intl";
import Loading from "../../../../common/Loading";
import { removeEmpty } from "../../../remuveEmptyInObject";

import {
  fetchGetConfig,
  fetchGetGroupById,
  fetchPutUpdateGroupDetails,
} from "../../../../store/actions";

import RebootWindow from "../../RebootWindow";

import { isAllowed, pages } from "../../../../utils/user";

export class NumberFormatting extends Component {
  state = {
    isLoading: true,
    group: {},
    disableButton: false,
    showRebootDialog: false,
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
                pra_nat_dst:
                  this.state.group.pra_nat_dst ||
                  this.props.config.tenant.group.pra_nat_dst[0].value,
                pra_nat_src:
                  this.state.group.pra_nat_src ||
                  this.props.config.tenant.group.pra_nat_src[0].value,
                pra_int_src:
                  this.state.group.pra_int_src ||
                  this.props.config.tenant.group.pra_int_src[0].value,
                sip_nat_dst:
                  this.state.group.sip_nat_dst ||
                  this.props.config.tenant.group.sip_nat_dst[0].value,
                sip_nat_src:
                  this.state.group.sip_nat_src ||
                  this.props.config.tenant.group.sip_nat_src[0].value,
                sip_int_src:
                  this.state.group.sip_int_src ||
                  this.props.config.tenant.group.sip_int_src[0].value,
              },
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
        {(this.state.group.pbxType === "PRA" ||
          this.state.group.pbxType === "PRA_SIP" ||
          this.state.group.pbxType === "SIP_PRA" ||
          this.state.group.pbxType === "BRA") && (
          <React.Fragment>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-24"}>
                  {this.state.group.pbxType === "BRA" ? "BRA" : "PRA"}
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="nationalCalled"
                      defaultMessage="National Called"
                    />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.group.pra_nat_dst}
                    onChange={(e) =>
                      this.setState({
                        group: {
                          ...this.state.group,
                          pra_nat_dst: e.target.value,
                        },
                      })
                    }
                    disabled={
                      !isAllowed(
                        localStorage.getItem("userProfile"),
                        pages.edit_group_number_formating_tab
                      )
                    }
                  >
                    {this.props.config.tenant.group.pra_nat_dst.map((el, i) => (
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
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="nationalCalling"
                      defaultMessage="National Calling"
                    />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.group.pra_nat_src}
                    onChange={(e) =>
                      this.setState({
                        group: {
                          ...this.state.group,
                          pra_nat_src: e.target.value,
                        },
                      })
                    }
                    disabled={
                      !isAllowed(
                        localStorage.getItem("userProfile"),
                        pages.edit_group_number_formating_tab
                      )
                    }
                  >
                    {this.props.config.tenant.group.pra_nat_src.map((el, i) => (
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
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="internationalCalling"
                      defaultMessage="International Calling"
                    />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.group.pra_int_src}
                    onChange={(e) =>
                      this.setState({
                        group: {
                          ...this.state.group,
                          pra_int_src: e.target.value,
                        },
                      })
                    }
                    disabled={
                      !isAllowed(
                        localStorage.getItem("userProfile"),
                        pages.edit_group_number_formating_tab
                      )
                    }
                  >
                    {this.props.config.tenant.group.pra_int_src.map((el, i) => (
                      <option key={i} value={el.value}>
                        {el.label}
                      </option>
                    ))}
                  </FormControl>
                </div>
              </Col>
            </Row>
          </React.Fragment>
        )}
        {(this.state.group.pbxType === "SIP" ||
          this.state.group.pbxType === "PRA_SIP" ||
          this.state.group.pbxType === "SIP_PRA") && (
          <React.Fragment>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-24"}>SIP</div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="nationalCalled"
                      defaultMessage="National Called"
                    />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.group.sip_nat_dst}
                    onChange={(e) =>
                      this.setState({
                        group: {
                          ...this.state.group,
                          sip_nat_dst: e.target.value,
                        },
                      })
                    }
                    disabled={
                      !isAllowed(
                        localStorage.getItem("userProfile"),
                        pages.edit_group_number_formating_tab
                      )
                    }
                  >
                    {this.props.config.tenant.group.sip_nat_dst.map((el, i) => (
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
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="nationalCalling"
                      defaultMessage="National Calling"
                    />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.group.sip_nat_src}
                    onChange={(e) =>
                      this.setState({
                        group: {
                          ...this.state.group,
                          sip_nat_src: e.target.value,
                        },
                      })
                    }
                    disabled={
                      !isAllowed(
                        localStorage.getItem("userProfile"),
                        pages.edit_group_number_formating_tab
                      )
                    }
                  >
                    {this.props.config.tenant.group.sip_nat_src.map((el, i) => (
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
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="internationalCalling"
                      defaultMessage="International Calling"
                    />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.group.sip_int_src}
                    onChange={(e) =>
                      this.setState({
                        group: {
                          ...this.state.group,
                          sip_int_src: e.target.value,
                        },
                      })
                    }
                    disabled={
                      !isAllowed(
                        localStorage.getItem("userProfile"),
                        pages.edit_group_number_formating_tab
                      )
                    }
                  >
                    {this.props.config.tenant.group.sip_int_src.map((el, i) => (
                      <option key={i} value={el.value}>
                        {el.label}
                      </option>
                    ))}
                  </FormControl>
                </div>
              </Col>
            </Row>
          </React.Fragment>
        )}
        <Row>
          <div className="button-row">
            <div className="pull-right">
              {isAllowed(
                localStorage.getItem("userProfile"),
                pages.edit_group_number_formating_tab
              ) ? (
                <Button
                  onClick={this.updateNumberFormatting}
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
  updateNumberFormatting = () => {
    const {
      pra_nat_dst,
      pra_nat_src,
      pra_int_src,
      sip_nat_dst,
      sip_nat_src,
      sip_int_src,
    } = this.state.group;
    const data = {
      pra_nat_dst,
      pra_nat_src,
      pra_int_src,
      sip_nat_dst,
      sip_nat_src,
      sip_int_src,
    };
    this.setState({ disableButton: true });
    const clearData = removeEmpty(data);
    if (
      pra_nat_dst !== this.props.group.pra_nat_dst ||
      pra_nat_src !== this.props.group.pra_nat_src ||
      pra_int_src !== this.props.group.pra_int_src ||
      sip_nat_dst !== this.props.group.sip_nat_dst ||
      sip_nat_src !== this.props.group.sip_nat_src ||
      sip_int_src !== this.props.group.sip_int_src
    ) {
      this.setState({
        showRebootDialog: true,
        data: clearData,
        disableButton: false,
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

const mapStateToProps = (state) => ({
  group: state.group,
  config: state.config,
});

const mapDispatchToProps = {
  fetchGetConfig,
  fetchGetGroupById,
  fetchPutUpdateGroupDetails,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NumberFormatting)
);
