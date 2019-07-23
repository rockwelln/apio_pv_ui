import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";

import { changeStepOfCreateTenant } from "../../store/actions";

export class Limits extends Component {
  render() {
    return (
      <React.Fragment>
          <div className={"panel-heading"}>
            <Row >
              <Col md={12}>
                <div className={"header"}>
                  Assign tenant licenses
                </div>
              </Col>
            </Row>
          </div>


          <div class="panel-body">
              <Row>
                <p>
                  Set limits on how many service packs and group services a Tenant can consum. 
                  This is typically used to limit the volume of licensable items that can be
                  consumed by a customer.
                </p>
                <div class="alert alert-danger" role="alert">
                  Attention - this page is under construction
                </div>
              </Row>
              <Row>
                  <div class="button-row">
                    <div class="pull-left">
 
                          <Button className={"btn-success"} onClick={() => this.props.changeStepOfCreateTenant("Admin")}>
                            <Glyphicon
                              glyph="glyphicon glyphicon-ok"
                            >
                            </Glyphicon>
                            &nbsp; Finish

                          </Button>

                    </div>
                    <div class="pull-right">
                      <Button
                        onClick={() => this.props.changeStepOfCreateTenant("Admin")}
                        className={"btn-primary"}
                      >               
                      <Glyphicon
                        glyph="glyphicon glyphicon-forward"
                      >
                      </Glyphicon>

                      &nbsp; Assign licenses
                      </Button>
                    </div>
                  </div>
              </Row>
          </div>

      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { changeStepOfCreateTenant };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Limits);
