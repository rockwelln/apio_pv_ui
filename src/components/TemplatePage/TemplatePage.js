import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import {
  fetchGetTemplateDetails,
  fetchPutUpdateTemplate
} from "../../store/actions";
import Loading from "../../common/Loading";

import Button from "react-bootstrap/lib/Button";

export class TemplatePage extends Component {
  state = {
    isLoading: true,
    isEdit: false,
    templateData: ""
  };
  componentDidMount() {
    this.props
      .fetchGetTemplateDetails(
        this.props.match.params.categoryName,
        this.props.match.params.templateName
      )
      .then(() =>
        this.setState({
          isLoading: false,
          templateData: JSON.stringify(this.props.templateDetails.data, null, 2)
        })
      );
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <div className={"panel-heading flex space-between"}>
          <div
            className={"header"}
          >{`Template details ${this.props.templateDetails.name}`}</div>
          {this.state.isEdit ? (
            <div>
              <Button
                className={"btn-danger margin-right-1"}
                onClick={() =>
                  this.setState({
                    isEdit: false,
                    templateData: this.props.templateDetails.data
                  })
                }
              >
                Cancel
              </Button>
              <Button className={"btn-primary"} onClick={this.saveTemplate}>
                Save
              </Button>
            </div>
          ) : (
            <Button
              className={"btn-primary"}
              onClick={() => this.setState({ isEdit: true })}
            >
              Edit
            </Button>
          )}
        </div>
        <div className={"panel-body"}>
          <textarea
            className={"template-text-area"}
            disabled={!this.state.isEdit}
            onChange={e => this.setState({ templateData: e.target.value })}
            value={this.state.templateData}
          />
          {/* <pre>{JSON.stringify(this.props.templateDetails, null, 2)}</pre> */}
        </div>
      </React.Fragment>
    );
  }

  saveTemplate = () => {
    this.setState({ isLoading: true }, () =>
      this.props
        .fetchPutUpdateTemplate(
          this.props.match.params.categoryName,
          this.props.match.params.templateName,
          { data: JSON.parse(this.state.templateData) }
        )
        .finally(() =>
          this.setState({
            isEdit: false,
            isLoading: false,
            templateData: JSON.stringify(
              this.props.templateDetails.data,
              null,
              2
            )
          })
        )
    );
  };
}

const mapStateToProps = state => ({ templateDetails: state.templateDetails });

const mapDispatchToProps = { fetchGetTemplateDetails, fetchPutUpdateTemplate };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TemplatePage)
);
