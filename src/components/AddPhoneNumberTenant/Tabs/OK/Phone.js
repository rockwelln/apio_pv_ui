import React, { Component } from "react";
import { connect } from "react-redux";

import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import DeleteModal from "./DeleteModal";

export class Phone extends Component {
  state = { showDelete: false };
  render() {
    const { phone } = this.props;
    const { showDelete } = this.state;
    return (
      <tr>
        <td>{phone.line}</td>
        <td>{phone.start}</td>
        <td>{phone.end}</td>
        <td>{phone.type}</td>
        <td>
          <ButtonToolbar>
            <Glyphicon
              glyph="glyphicon glyphicon-remove"
              onClick={() => this.setState({ showDelete: true })}
            />
          </ButtonToolbar>
          <DeleteModal
            phone={phone}
            show={showDelete}
            onClose={e => {
              this.setState({ showDelete: false });
            }}
          />
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Phone);
