import React, { Component } from "react";
import { connect } from "react-redux";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Radio from "react-bootstrap/lib/Radio";

export class AddPhoneNumberPage extends Component {
  state = { isLoadNewPhones: null };
  render() {
    return (
      <React.Fragment>
        <div className={"header panel-heading"}>Add phonenumbers for group</div>
        <div className={"panel-body"}>
          <Row>
            <Col md={12}>
              Please select how you want to add phonenumbers to this group:
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Radio
                  className={"margin-left-1"}
                  name="addPhoneGroups"
                  checked={this.state.isLoadNewPhones === "not load"}
                  onChange={() =>
                    this.setState({
                      isLoadNewPhones: "not load"
                    })
                  }
                >
                  <div>I want to select free numbers from the tenant level</div>
                </Radio>
                <Radio
                  className={"margin-left-1"}
                  name="addPhoneGroups"
                  checked={this.state.isLoadNewPhones === "load"}
                  onChange={() =>
                    this.setState({
                      isLoadNewPhones: "load"
                    })
                  }
                >
                  <div>
                    I want to copy-paste numbers. If some numbers are not yet
                    assigned on tenant level, please do it for me!
                  </div>
                </Radio>
              </FormGroup>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPhoneNumberPage);
