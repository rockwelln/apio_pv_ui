import React, { Component } from "react";
import { connect } from "react-redux";

import {
  fetchGetPhoneTypes,
  fetchGetPhoneTypesDetails
} from "../../../../store/actions";

import FormControl from "react-bootstrap/lib/FormControl";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import Loading from "../../../../common/Loading";

export class PhoneTypes extends Component {
  state = {
    isLoading: true,
    selectedPhoneType: "none"
  };
  componentDidMount() {
    this.props
      .fetchGetPhoneTypes()
      .then(() =>
        this.setState({ isLoading: false, phoneTypes: this.props.phoneTypes })
      );
  }
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    if (this.state.phoneTypes.length) {
      return (
        <React.Fragment>
          <Row className={"margin-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}>
                All supported devices:
              </div>
              <div>
                <FormControl
                  componentClass="select"
                  value={this.state.selectedPhoneType}
                  onChange={e =>
                    this.setState(
                      { selectedPhoneType: e.target.value },
                      () =>
                        this.state.selectedPhoneType !== "none" &&
                        this.props
                          .fetchGetPhoneTypesDetails(
                            this.state.selectedPhoneType
                          )
                          .then(() =>
                            this.setState({
                              details: this.props.phoneTypesDetails
                            })
                          )
                    )
                  }
                >
                  <option key={"none"} value={"none"}>
                    {"none"}
                  </option>
                  {this.state.phoneTypes.map(type => (
                    <option key={type.technicalName} value={type.technicalName}>
                      {type.displayName}
                    </option>
                  ))}
                </FormControl>
              </div>
            </Col>
          </Row>
          <Row className={"margin-1"}>
            <Col md={12}>
              <div>Details</div>
              <pre>
                {this.state.selectedPhoneType !== "none" &&
                  JSON.stringify(this.state.details, null, 2)}
              </pre>
            </Col>
          </Row>
        </React.Fragment>
      );
    } else return <div> No phone types found</div>;
  }
}

const mapStateToProps = state => ({
  phoneTypes: state.phoneTypes,
  phoneTypesDetails: state.phoneTypesDetails
});

const mapDispatchToProps = { fetchGetPhoneTypes, fetchGetPhoneTypesDetails };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneTypes);
