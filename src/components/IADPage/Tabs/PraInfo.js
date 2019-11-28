import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import ControlLabel from "react-bootstrap/lib/ControlLabel";

import { FormattedMessage } from "react-intl";

import { changeIAD, fetchPutUpdateIAD } from "../../../store/actions";
import { removeEmpty } from "../../remuveEmptyInObject";

export class PraInfo extends Component {
  state = {
    praByIad: {},
    disabledButton: false
  };

  componentDidMount() {
    let praByIad = {};
    for (let i = 0; i < this.props.iad.pra_needed; i++) {
      praByIad = {
        ...praByIad,
        [i + 1]: { tpid: "", circuit_id: "" }
      };
    }
    praByIad = { ...praByIad, ...this.props.iad.pra_info };
    this.setState({ praByIad });
  }
  render() {
    return (
      <React.Fragment>
        {Object.keys(this.state.praByIad).map((el, i) => (
          <React.Fragment key={i + ""}>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-18"}>
                  <FormattedMessage
                    id="praNumber"
                    defaultMessage={`PRA ${i + 1}`}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="tpid"
                      defaultMessage="Tina Product ID"
                    />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.praByIad[el].tpid}
                    placeholder={"Tina Product ID"}
                    onChange={e =>
                      this.setState(
                        {
                          praByIad: {
                            ...this.state.praByIad,
                            [el]: {
                              ...this.state.praByIad[el],
                              tpid: e.target.value
                            }
                          }
                        },
                        () =>
                          this.props.changeIAD("pra_info", this.state.praByIad)
                      )
                    }
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="circuitID"
                      defaultMessage="Circuit ID"
                    />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.praByIad[el].circuit_id}
                    placeholder={"Prefix followed by national phone number"}
                    onChange={e =>
                      this.setState(
                        {
                          praByIad: {
                            ...this.state.praByIad,
                            [el]: {
                              ...this.state.praByIad[el],
                              circuit_id: e.target.value
                            }
                          }
                        },
                        () =>
                          this.props.changeIAD("pra_info", this.state.praByIad)
                      )
                    }
                  />
                </div>
              </Col>
            </Row>
          </React.Fragment>
        ))}
        <Row>
          <Col md={12}>
            <div className="button-row">
              <div className="pull-right">
                <Button
                  onClick={this.updateIAD}
                  type="submit"
                  className="btn-primary"
                  disabled={this.state.disabledButton}
                >
                  <Glyphicon glyph="glyphicon glyphicon-ok" />
                  <FormattedMessage id="update" defaultMessage="Update" />
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  updateIAD = () => {
    const { praByIad } = this.state;
    const data = { pra_info: { ...praByIad } };
    const clearData = removeEmpty(data);
    if (Object.keys(clearData).length) {
      this.setState({ disabledButton: true }, () =>
        this.props
          .fetchPutUpdateIAD(
            this.props.match.params.tenantId,
            this.props.match.params.groupId,
            this.props.match.params.iadId,
            clearData
          )
          .then(() => this.setState({ disabledButton: false }))
      );
    } else {
      this.setState({ disabledButton: true }, () =>
        this.setState({ disabledButton: false })
      );
    }
  };
}

const mapStateToProps = state => ({ iad: state.iad });

const mapDispatchToProps = { changeIAD, fetchPutUpdateIAD };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PraInfo)
);
