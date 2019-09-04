import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Panel from "react-bootstrap/lib/Panel";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import { fetchPostCreateTenant } from "../../store/actions";
import { removeEmpty } from "../remuveEmptyInObject";

export class AddEntreprises extends Component {
  state = {
    entrerpriseName: "",
    tinaId: "",
    vlanUuid: "",
    llid: "",
    buttonName: "Create"
  };
  render() {
    return (
      <React.Fragment>
        <Panel className={"margin-0"}>
          <Panel.Heading>
            <div className={"header"}>
              ADD ENTREPRISES
              <Button
                className={"margin-left-1 btn-danger"}
                onClick={this.cancelClick}
              >
                Cancel
              </Button>
            </div>
            <div>
              Enter yout Entrerprises name, your customer IDs and your
              Entrerprise ID will be auto-generated
            </div>
          </Panel.Heading>
          <Panel.Body>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>ID</div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl type="text" disabled />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>Name</div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.entrerpriseName}
                    placeholder={"Entrerprise Name"}
                    onChange={e =>
                      this.setState({ entrerpriseName: e.target.value })
                    }
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  TINA ID{"\u002a"}
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.tinaId}
                    placeholder={"TINA ID"}
                    onChange={e => this.setState({ tinaId: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  VLAN UUID{"\u002a"}
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.vlanUuid}
                    placeholder={"VLAN UUID"}
                    onChange={e => this.setState({ vlanUuid: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  LLID{"\u002a"}
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.llid}
                    placeholder={"LLID"}
                    onChange={e => this.setState({ llid: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"} />
                <div className={"margin-right-1 flex-basis-33"}>
                  {"\u002a"} At least one needed
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="button-row">
                  <div className="pull-right">
                    <Button
                      onClick={this.AddEntreprise}
                      type="submit"
                      className="btn-primary"
                      disabled={
                        (!this.state.tinaId &&
                          !this.state.vlanUuid &&
                          !this.state.llid) ||
                        this.state.buttonName === "Creating..."
                      }
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
      `/provisioning/${this.props.match.params.gwName}/tenants`
    );
  };

  AddEntreprise = () => {
    const { entrerpriseName, tinaId, vlanUuid, llid } = this.state;

    const data = {
      name: entrerpriseName,
      tina_id: tinaId,
      vlan_uuid: vlanUuid,
      ll_id: llid
    };
    const clearData = removeEmpty(data);
    this.setState({ buttonName: "Creating..." }, () =>
      this.props
        .fetchPostCreateTenant(clearData)
        .then(res =>
          res === "created"
            ? this.props.history.push(
                `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.createdTenant.tenantId}`
              )
            : this.setState({ buttonName: "Create" })
        )
    );
  };
}

const mapStateToProps = state => ({
  createdTenant: state.createdTenant
});

const mapDispatchToProps = { fetchPostCreateTenant };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddEntreprises)
);
