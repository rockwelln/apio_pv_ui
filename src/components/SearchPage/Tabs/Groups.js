import React, { Component } from "react";
import { connect } from "react-redux";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Button from "react-bootstrap/lib/Button";
import HelpBlock from "react-bootstrap/lib/HelpBlock";

import { removeEmpty } from "../../remuveEmptyInObject";
import { fetchGetSearchGroups } from "../../../store/actions";

export class Groups extends Component {
  state = {
    insensitiveGroupNameContains: "",
    insensitiveGroupIdContains: "",
    responseSizeLimit: undefined,
    showGroupId: false,
    showSizeLimit: false,
    buttonSearch: "Search",
    sizeError: null
  };

  render() {
    return (
      <React.Fragment>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              Group name contains:
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={this.state.insensitiveGroupNameContains}
                onChange={e => {
                  this.setState({
                    insensitiveGroupNameContains: e.target.value
                  });
                }}
              />
            </div>
            {!this.state.showGroupId && (
              <div>
                <Glyphicon
                  className={"x-large margin-0"}
                  glyph="glyphicon glyphicon-plus-sign"
                  onClick={() =>
                    !this.state.showGroupId &&
                    this.setState({ showGroupId: true })
                  }
                />
              </div>
            )}
          </Col>
        </Row>
        {this.state.showGroupId && (
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}>
                Group ID contains:
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  type="text"
                  value={this.state.insensitiveGroupIdContains}
                  onChange={e => {
                    this.setState({
                      insensitiveGroupIdContains: e.target.value
                    });
                  }}
                />
              </div>
              {!this.state.showSizeLimit && (
                <div>
                  <Glyphicon
                    className={"x-large margin-0"}
                    glyph="glyphicon glyphicon-plus-sign"
                    onClick={() =>
                      !this.state.showSizeLimit &&
                      this.setState({ showSizeLimit: true })
                    }
                  />
                </div>
              )}
            </Col>
          </Row>
        )}
        {this.state.showSizeLimit && (
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}>
                Max number of results:
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormGroup
                  controlId="size"
                  validationState={this.state.sizeError}
                >
                  <FormControl
                    type="number"
                    min={1}
                    value={this.state.responseSizeLimit}
                    onChange={e => {
                      this.setState({
                        responseSizeLimit: e.target.value,
                        sizeError: null
                      });
                    }}
                  />
                  {this.state.sizeError && (
                    <HelpBlock>Can be empty, if not it should be > 0</HelpBlock>
                  )}
                </FormGroup>
              </div>
            </Col>
          </Row>
        )}
        <Row className={"margin-top-1"}>
          <Col md={12}>
            <div className="button-row">
              <div className="pull-right">
                <Button
                  className={"btn-primary"}
                  onClick={this.search}
                  disabled={
                    (!this.state.insensitiveGroupNameContains &&
                      !this.state.insensitiveGroupIdContains) ||
                    this.state.buttonSearch === "Searching..."
                  }
                >
                  {this.state.buttonSearch}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
  search = () => {
    const {
      insensitiveGroupNameContains,
      insensitiveGroupIdContains,
      responseSizeLimit
    } = this.state;

    if (responseSizeLimit && responseSizeLimit < 1) {
      this.setState({ sizeError: "error" });
      return;
    }

    const data = {
      insensitiveGroupNameContains,
      insensitiveGroupIdContains,
      responseSizeLimit
    };
    const clearData = removeEmpty(data);
    const queryString = Object.keys(clearData)
      .map(key => key + "=" + clearData[key])
      .join("&");
    this.setState({ buttonSearch: "Searching..." }, () =>
      this.props
        .fetchGetSearchGroups(queryString)
        .then(() => this.setState({ buttonSearch: "Search" }))
    );
  };
}

const mapStateToProps = state => ({
  groups: state.groupsFound
});

const mapDispatchToProps = { fetchGetSearchGroups };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups);
