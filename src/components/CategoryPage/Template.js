import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import DeleteModal from "./DeleteModal";

class Admin extends Component {
  state = { showDelete: false };
  render() {
    const { template, onReload } = this.props;
    const { showDelete } = this.state;
    return (
      <tr>
        <td>
          <Link
            to={`/provisioning/${this.props.match.params.gwName}/templates/${this.props.match.params.categoryName}/template/${template.name}`}
          >
            {template.name}
          </Link>
        </td>
        <td>{template.description}</td>
        <td>
          <ButtonToolbar>
            <Glyphicon
              glyph="glyphicon glyphicon-remove"
              onClick={() => this.setState({ showDelete: true })}
            />
          </ButtonToolbar>
          <DeleteModal
            templateName={template.name}
            categoryName={this.props.match.params.categoryName}
            show={showDelete}
            onClose={e => {
              onReload && onReload();
              this.setState({ showDelete: false });
            }}
            {...this.props}
          />
        </td>
      </tr>
    );
  }
}

export default withRouter(Admin);
