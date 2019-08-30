import React, { Component } from "react";
import { connect } from "react-redux";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Button from "react-bootstrap/lib/Button";

import View from "./View";
import Edit from "./Edit";

export class index extends Component {
  state = {
    edit: false
  };
  render() {
    return (
      <React.Fragment>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex font-24"}>Redundancy</div>
            {!this.state.edit && (
              <Glyphicon
                className={"font-18"}
                glyph="glyphicon glyphicon-pencil"
                onClick={() => this.setState({ edit: true })}
              />
            )}
          </Col>
        </Row>
        {this.state.edit ? <Edit /> : <View />}
        {this.state.edit && (
          <Row>
            <Col md={12}>
              <div className="button-row">
                <div className="pull-right">
                  <Button
                    onClick={() => this.setState({ edit: false })}
                    type="submit"
                    className="btn-primary"
                  >
                    <Glyphicon glyph="glyphicon glyphicon-ok" /> Update
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);
