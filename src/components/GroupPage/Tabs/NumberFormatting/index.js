import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Checkbox from "react-bootstrap/lib/Checkbox";
import Button from "react-bootstrap/lib/Button";

import { FormattedMessage } from "react-intl";
import Loading from "../../../../common/Loading";
import { removeEmpty } from "../../../remuveEmptyInObject";

import {
  fetchGetConfig,
  fetchGetGroupById,
  fetchPutUpdateGroupDetails
} from "../../../../store/actions";

export class NumberFormatting extends Component {
  state = {
    isLoading: true,
    group: {},
    disableButton: false
  };
  componentDidMount() {}
  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <div>
    //       <Loading />
    //     </div>
    //   );
    // }
    return <React.Fragment>Number Formatting</React.Fragment>;
  }
  //   updateProduct = () => {
  //     const {
  //       pbxType,
  //       accessType,
  //       serviceType,
  //       np1Redundancy
  //     } = this.state.group;
  //     const data = {
  //       pbxType,
  //       accessType,
  //       serviceType,
  //       np1Redundancy
  //     };
  //     this.setState({ disableButton: true });
  //     const clearData = removeEmpty(data);
  //     this.props
  //       .fetchPutUpdateGroupDetails(
  //         this.props.match.params.tenantId,
  //         this.props.match.params.groupId,
  //         clearData
  //       )
  //       .then(() => this.setState({ disableButton: false }));
  //   };
}

const mapStateToProps = state => ({ group: state.group, config: state.config });

const mapDispatchToProps = {
  fetchGetConfig,
  fetchGetGroupById,
  fetchPutUpdateGroupDetails
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NumberFormatting)
);
