import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Pagination from "react-bootstrap/lib/Pagination";
import { FormattedMessage } from "react-intl";

import { fetchGetReconciliationTeams } from "../../../store/actions";

export class ReconciliationTeams extends Component {
  state = {
    searchValue: ""
  };
  componentDidMount() {
    this.props.fetchGetReconciliationTeams();
  }
  render() {
    return (
      <div>
        <Row className={"margin-top-1"}>
          <Col mdOffset={1} md={10}>
            <InputGroup className={"margin-left-negative-4"}>
              <InputGroup.Addon>
                <Glyphicon glyph="lyphicon glyphicon-search" />
              </InputGroup.Addon>
              <FormattedMessage id="search_placeholder" defaultMessage="">
                {placeholder => (
                  <FormControl
                    type="text"
                    value={this.state.searchValue}
                    placeholder={placeholder}
                    // onChange={e =>
                    //   this.setState(
                    //     {
                    //       searchValue: e.target.value
                    //     },
                    //     () => this.filterBySearchValue()
                    //   )
                    // }
                  />
                )}
              </FormattedMessage>
            </InputGroup>
          </Col>
          <Col md={1}>
            <Link
              to={`/provisioning/${this.props.match.params.gwName}/configs/addteam`}
            >
              <Glyphicon
                className={"x-large"}
                glyph="glyphicon glyphicon-plus-sign"
              />
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { fetchGetReconciliationTeams };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReconciliationTeams)
);
