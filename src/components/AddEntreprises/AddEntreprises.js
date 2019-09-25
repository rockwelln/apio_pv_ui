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
import { FormattedMessage } from "react-intl";

export class AddEntreprises extends Component {
  state = {
    entrerpriseName: "",
    tinaId: "",
    buttonName: "Create"
  };
  render() {
    return (
      <React.Fragment>
        <Panel className={"margin-0"}>
          <Panel.Heading>
            <div className={"header"}>
              <FormattedMessage
                id="addEnterprises"
                defaultMessage="ADD ENTREPRISES"
              />

              <Button
                className={"margin-left-1 btn-danger"}
                onClick={this.cancelClick}
              >
                <FormattedMessage id="cancel" defaultMessage="Cancel" />
              </Button>
            </div>
            <div>
              <FormattedMessage
                id="addEnterprisesInfo"
                defaultMessage="Enter yout Entrerprises name, your customer IDs and your
                      Entrerprise ID will be auto-generated"
              />
            </div>
          </Panel.Heading>
          <Panel.Body>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage
                    id="enterpriseId"
                    defaultMessage="Enterprise ID"
                  />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl type="text" disabled />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <FormattedMessage
                    id="customerName"
                    defaultMessage="Customer name"
                  />
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.entrerpriseName}
                    placeholder={"Customer name"}
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
                  <FormattedMessage
                    id="customerId"
                    defaultMessage="Customer ID"
                  />
                  {"\u002a"}
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.tinaId}
                    placeholder={"Customer ID"}
                    onChange={e => this.setState({ tinaId: e.target.value })}
                  />
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
                        !this.state.tinaId ||
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
    const { entrerpriseName, tinaId } = this.state;

    const data = {
      name: entrerpriseName,
      tina_id: tinaId
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
