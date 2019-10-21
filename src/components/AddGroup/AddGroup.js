import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Panel from "react-bootstrap/lib/Panel";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Radio from "react-bootstrap/lib/Radio";
import FormGroup from "react-bootstrap/lib/FormGroup";

import Loading from "../../common/Loading";

import { FormattedMessage } from "react-intl";
import { fetchPostCreateGroup, fetchGetConfig } from "../../store/actions";
import { removeEmpty } from "../remuveEmptyInObject";

import { TYPEOFIAD, TYPEOFACCESS, SERVICETYPE } from "../../constants";

export class AddGroup extends Component {
  state = {
    siteName: "",
    zipCode: "",
    virtualSite: false,
    typeOfIad: "",
    typeOfAccess: "",
    numberOfChannels: undefined,
    serviceType: "",
    buttonName: "Create",
    cliName: "",
    isLoading: true
  };

  componentDidMount = () => {
    this.props.fetchGetConfig().then(() =>
      this.setState({
        isLoading: false,
        typeOfIad: this.props.config.tenant.group.pbxType[0].value,
        typeOfAccess: this.props.config.tenant.group.accessType[0].value,
        serviceType: this.props.config.tenant.group.serviceType[0].value
      })
    );
  };
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    console.log(
      this.state.typeOfIad,
      this.state.typeOfAccess,
      this.state.serviceType
    );
    return (
      <React.Fragment>
        <Panel className={"margin-0"}>
          <Panel.Heading>
            <div className={"header"}>
              ADD SITE
              <Button
                className={"margin-left-1 btn-danger"}
                onClick={this.cancelClick}
              >
                Cancel
              </Button>
            </div>
          </Panel.Heading>
          <Panel.Body>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  Site ID
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl type="text" placeholder={"ID"} disabled />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-24"}>Site Infos</div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  Site Name
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.siteName}
                    placeholder={"Site Name"}
                    onChange={e => this.setState({ siteName: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  Main Number
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.cliName}
                    placeholder={"Main Number"}
                    onChange={e => this.setState({ cliName: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  ZIP code
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.zipCode}
                    placeholder={"ZIP code"}
                    onChange={e => this.setState({ zipCode: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  Virtual Site
                </div>
                <div className={"margin-right-1 flex"}>
                  <FormGroup className={"margin-0 flex"}>
                    <Radio
                      className={"margin-0 flex margin-right-2"}
                      name="isVirtualSite"
                      checked={this.state.virtualSite}
                      onChange={e =>
                        this.setState({
                          virtualSite: true
                        })
                      }
                    >
                      <div className="font-weight-bold flex">Yes</div>
                    </Radio>
                    <Radio
                      className={"margin-0 flex margin-right-2"}
                      name="isVirtualSite"
                      checked={!this.state.virtualSite}
                      onChange={e =>
                        this.setState({
                          virtualSite: false
                        })
                      }
                    >
                      <div className="font-weight-bold flex">No</div>
                    </Radio>
                  </FormGroup>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-24"}>
                  Product Type
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage id="pbxType" defaultMessage="Type of IAD" />
                </div>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    defaultValue={this.state.typeOfIad}
                    onChange={e => this.setState({ typeOfIad: e.target.value })}
                  >
                    {this.props.config.tenant.group.pbxType.map((type, i) => (
                      <option key={i} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </FormControl>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage
                    id="accessType"
                    defaultMessage="Type of access"
                  />
                </div>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.typeOfAccess}
                    onChange={e =>
                      this.setState({ typeOfAccess: e.target.value })
                    }
                  >
                    {this.props.config.tenant.group.accessType.map(
                      (type, i) => (
                        <option key={i} value={type.value}>
                          {type.label}
                        </option>
                      )
                    )}
                  </FormControl>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage
                    id="serviceType"
                    defaultMessage="Service Type"
                  />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.serviceType}
                    onChange={e =>
                      this.setState({ serviceType: e.target.value })
                    }
                  >
                    {this.props.config.tenant.group.serviceType.map(
                      (type, i) => (
                        <option key={i} value={type.value}>
                          {type.label}
                        </option>
                      )
                    )}
                  </FormControl>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  Numbers of Channels{"\u002a"}
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="number"
                    value={this.state.numberOfChannels}
                    placeholder={"Numbers of Channels"}
                    onChange={e =>
                      this.setState({ numberOfChannels: e.target.value })
                    }
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"} />
                <div className={"margin-right-1 flex-basis-33"}>
                  {"\u002a"} Don't exceed your IADs capacity (avalible: xxxxx)
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="button-row">
                  <div className="pull-right">
                    <Button
                      onClick={this.AddGroup}
                      type="submit"
                      className="btn-primary"
                    >
                      <Glyphicon glyph="glyphicon glyphicon-ok" />{" "}
                      {this.state.buttonName}
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Panel.Body>
        </Panel>
      </React.Fragment>
    );
  }

  cancelClick = () => {
    this.props.history.push(
      `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}`
    );
  };

  AddGroup = () => {
    const {
      siteName,
      typeOfIad,
      typeOfAccess,
      numberOfChannels,
      serviceType,
      zipCode,
      cliName,
      virtualSite
    } = this.state;

    const data = {
      groupName: siteName,
      cliName,
      zipCode,
      numberOfChannels: Number(numberOfChannels),
      pbxType: typeOfIad,
      accessType: typeOfAccess,
      serviceType,
      virtualSite
    };
    const clearData = removeEmpty(data);
    this.setState({ buttonName: "Creating..." }, () =>
      this.props
        .fetchPostCreateGroup(this.props.match.params.tenantId, clearData)
        .then(res =>
          res === "created"
            ? this.props.history.push(
                `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}`
              )
            : this.setState({ buttonName: "Create" })
        )
    );
  };
}

const mapStateToProps = state => ({
  config: state.config
});

const mapDispatchToProps = { fetchPostCreateGroup, fetchGetConfig };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddGroup)
);