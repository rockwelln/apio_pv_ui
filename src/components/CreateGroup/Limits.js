import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import FormControl from "react-bootstrap/lib/FormControl";
import Checkbox from "react-bootstrap/lib/Checkbox";

import {
  changeStepOfCreateTenant,
  fetchGetLicensesByGroupId
} from "../../store/actions";

const INFINITY = 8734;

export class Limits extends Component {
  componentDidMount() {
    this.props.fetchGetLicensesByGroupId(
      this.props.match.params.tenantId,
      this.props.createdGroup.groupId
    );
  }

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <Row>
          <Col md={12}>
            <p className={"header"}>ADD GROUP: usage limits</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p>
              Set user limits on service packs and group services. This is
              typically used to limit the volime of licensable items that can be
              consumed by a customer.
            </p>
          </Col>
        </Row>
        <Row className={"margin-1"}>
          <Col md={4}>
            <div>TRUNKING CAPACITY</div>
            <div
              className={"limits-row space-between align-items-center margin-1"}
            >
              <div className={"width-12"}>Trunking channels</div>
              <div className={"limits-row space-between"}>
                {String.fromCharCode(INFINITY)}
                <Checkbox className={"margin-0 margin-left-1"} />
              </div>
              <div>
                <FormControl className={"width-8"} type="number" />
              </div>
            </div>
            <div
              className={"limits-row space-between align-items-center margin-1"}
            >
              <div className={"width-12"}>Max bursting</div>
              <div className={"limits-row space-between"}>
                {String.fromCharCode(INFINITY)}
                <Checkbox className={"margin-0 margin-left-1"} />
              </div>
              <div>
                <FormControl className={"width-8"} type="number" />
              </div>
            </div>
          </Col>

          <Col md={4}>
            <div>GROUP SERVICES</div>
            <div
              className={"limits-row space-between align-items-center margin-1"}
            >
              <div className={"width-12"}>Auto attendant basic</div>
              <div className={"limits-row space-between"}>
                {String.fromCharCode(INFINITY)}
                <Checkbox className={"margin-0 margin-left-1"} />
              </div>
              <div>
                <FormControl className={"width-8"} type="number" />
              </div>
            </div>
            <div
              className={"limits-row space-between align-items-center margin-1"}
            >
              <div className={"width-12"}>Auto attendant standard</div>
              <div className={"limits-row space-between"}>
                {String.fromCharCode(INFINITY)}
                <Checkbox className={"margin-0 margin-left-1"} />
              </div>
              <div>
                <FormControl className={"width-8"} type="number" />
              </div>
            </div>
            <div
              className={"limits-row space-between align-items-center margin-1"}
            >
              <div className={"width-12"}>Hunt groups</div>
              <div className={"limits-row space-between"}>
                {String.fromCharCode(INFINITY)}
                <Checkbox className={"margin-0 margin-left-1"} />
              </div>
              <div>
                <FormControl className={"width-8"} type="number" />
              </div>
            </div>
            <div
              className={"limits-row space-between align-items-center margin-1"}
            >
              <div className={"width-12"}>Pickup groups</div>
              <div className={"limits-row space-between"}>
                {String.fromCharCode(INFINITY)}
                <Checkbox className={"margin-0 margin-left-1"} />
              </div>
              <div>
                <FormControl className={"width-8"} type="number" />
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div>SERVICE PACKS</div>
            <div
              className={"limits-row space-between align-items-center margin-1"}
            >
              <div className={"width-12"}>Standard</div>
              <div className={"limits-row space-between"}>
                {String.fromCharCode(INFINITY)}
                <Checkbox className={"margin-0 margin-left-1"} />
              </div>
              <div>
                <FormControl className={"width-8"} type="number" />
              </div>
            </div>
            <div
              className={"limits-row space-between align-items-center margin-1"}
            >
              <div className={"width-12"}>Advanced</div>
              <div className={"limits-row space-between"}>
                {String.fromCharCode(INFINITY)}
                <Checkbox className={"margin-0 margin-left-1"} />
              </div>
              <div>
                <FormControl className={"width-8"} type="number" />
              </div>
            </div>
            <div
              className={"limits-row space-between align-items-center margin-1"}
            >
              <div className={"width-12"}>Voicemail</div>
              <div className={"limits-row space-between"}>
                {String.fromCharCode(INFINITY)}
                <Checkbox className={"margin-0 margin-left-1"} />
              </div>
              <div>
                <FormControl className={"width-8"} type="number" />
              </div>
            </div>
            <div
              className={"limits-row space-between align-items-center margin-1"}
            >
              <div className={"width-12"}>Mobility</div>
              <div className={"limits-row space-between"}>
                {String.fromCharCode(INFINITY)}
                <Checkbox className={"margin-0 margin-left-1"} />
              </div>
              <div>
                <FormControl className={"width-8"} type="number" />
              </div>
            </div>
            <div
              className={"limits-row space-between align-items-center margin-1"}
            >
              <div className={"width-12"}>Call center agent basic</div>
              <div className={"limits-row space-between"}>
                {String.fromCharCode(INFINITY)}
                <Checkbox className={"margin-0 margin-left-1"} />
              </div>
              <div>
                <FormControl className={"width-8"} type="number" />
              </div>
            </div>
            <div
              className={"limits-row space-between align-items-center margin-1"}
            >
              <div className={"width-12"}>Call center agent std</div>
              <div className={"limits-row space-between"}>
                {String.fromCharCode(INFINITY)}
                <Checkbox className={"margin-0 margin-left-1"} />
              </div>
              <div>
                <FormControl className={"width-8"} type="number" />
              </div>
            </div>
            <div
              className={"limits-row space-between align-items-center margin-1"}
            >
              <div className={"width-12"}>Call center agent prem</div>
              <div className={"limits-row space-between"}>
                {String.fromCharCode(INFINITY)}
                <Checkbox className={"margin-0 margin-left-1"} />
              </div>
              <div>
                <FormControl className={"width-8"} type="number" />
              </div>
            </div>
          </Col>
        </Row>
        <Row className={"margin-1"}>
          <div className={"flex-row-reverse"}>
            <Button
              onClick={() => this.props.changeStepOfCreateTenant("Admin")}
            >
              <Glyphicon
                glyph="glyphicon glyphicon-ok"
                style={{ display: "flex", lineHeight: "20px" }}
              >
                <div
                  className={"margin-left-1"}
                  style={{
                    fontFamily: `"Helvetica Neue",Helvetica,Arial,sans-serif`
                  }}
                >
                  OK
                </div>
              </Glyphicon>
            </Button>
          </div>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  createdGroup: state.createdGroup
});

const mapDispatchToProps = {
  changeStepOfCreateTenant,
  fetchGetLicensesByGroupId
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Limits)
);
