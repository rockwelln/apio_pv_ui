import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { fetchGetCategoryByName } from "../../store/actions";

import Loading from "../../common/Loading";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Pagination from "react-bootstrap/lib/Pagination";

import { FormattedMessage } from "react-intl";

import { countsPerPages } from "../../constants";
import Template from "./Template";

export class TemplatePage extends Component {
  state = {
    isLoading: true,
    templates: [],
    sortedBy: "",
    countPerPage: 25,
    pagination: true,
    page: 0,
    countPages: null,
    searchValue: "",
    paginationTemplates: []
  };

  fetchReq() {
    this.props
      .fetchGetCategoryByName(this.props.match.params.templateName)
      .then(() =>
        this.setState(
          {
            templates: this.props.category.templates.sort((a, b) => {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            }),
            isLoading: false,
            sortedBy: "name"
          },
          () => this.pagination()
        )
      );
  }

  componentDidMount() {
    console.log(this.props.match.params.templateName);
    this.fetchReq();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.templateName !==
      this.props.match.params.templateName
    ) {
      this.setState(
        {
          isLoading: true
        },
        () => this.fetchReq()
      );
    }
  }
  render() {
    const { isLoading, countPerPage, paginationTemplates, page } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <div className={"header"}>{`Name: ${this.props.category.name}`}</div>
          <div>{`Description: ${this.props.category.description}`}</div>
        </div>
        <div className={"panel-body"}>
          <Row className={"margin-top-2"}>
            <Col mdOffset={1} md={10}>
              <InputGroup className={"margin-left-negative-4"}>
                <InputGroup.Addon>
                  <Glyphicon glyph="lyphicon glyphicon-search" />
                </InputGroup.Addon>
                <FormattedMessage id="search_placeholder" defaultMessage="Name">
                  {placeholder => (
                    <FormControl
                      type="text"
                      value={this.state.searchValue}
                      placeholder={placeholder}
                      onChange={e =>
                        this.setState(
                          {
                            searchValue: e.target.value
                          },
                          () => this.filterBySearchValue()
                        )
                      }
                    />
                  )}
                </FormattedMessage>
              </InputGroup>
            </Col>
            <Col md={1}>
              <Glyphicon
                className={"x-large"}
                glyph="glyphicon glyphicon-plus-sign"
              />
            </Col>
          </Row>
          <Row>
            <Col md={11}>
              <div className="flex flex-row flex-end-center indent-top-bottom-1">
                <div>Item per page</div>
                <FormControl
                  componentClass="select"
                  defaultValue={countPerPage}
                  style={{ display: "inline", width: "auto" }}
                  className={"margin-left-1"}
                  onChange={this.changeCoutOnPage}
                >
                  {countsPerPages.map(counts => (
                    <option key={counts.value} value={counts.value}>
                      {counts.title}
                    </option>
                  ))}
                </FormControl>
              </div>
            </Col>
          </Row>
          {paginationTemplates.length ? (
            <React.Fragment>
              <Row>
                <Col mdOffset={1} md={10}>
                  <Table hover>
                    <thead>
                      <tr>
                        <th style={{ width: "20%" }}>
                          <FormattedMessage
                            id="tenant-id"
                            defaultMessage="Name"
                          />
                          <Glyphicon
                            glyph="glyphicon glyphicon-sort"
                            onClick={this.sortByName}
                          />
                        </th>
                        <th style={{ width: "76%" }}>
                          <FormattedMessage
                            id="name"
                            defaultMessage="Description"
                          />
                          {/* <Glyphicon
                            glyph="glyphicon glyphicon-sort"
                            onClick={this.sortByFirstName}
                          /> */}
                        </th>
                        <th style={{ width: "4%" }} />
                      </tr>
                    </thead>
                    <tbody>
                      {paginationTemplates[page].map(template => (
                        <Template
                          key={template.name}
                          template={template}
                          onReload={() => this.fetchReq()}
                        />
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col md={11}>
                  <div className="flex flex-row flex-end-center">
                    <Pagination className={"indent-top-bottom-1"}>
                      <Pagination.Prev onClick={this.decrementPage} />
                      <Pagination.Item>{this.state.page + 1}</Pagination.Item>
                      <Pagination.Next onClick={this.incrementPage} />
                    </Pagination>
                  </div>
                </Col>
              </Row>
            </React.Fragment>
          ) : (
            <Col mdOffset={1} md={10}>
              <FormattedMessage
                id="notFound"
                defaultMessage="No templates were found"
              />
            </Col>
          )}
        </div>
      </React.Fragment>
    );
  }
  changeCoutOnPage = e => {
    this.setState({ countPerPage: Number(e.target.value), page: 0 }, () =>
      this.pagination()
    );
  };

  incrementPage = () => {
    if (this.state.page >= this.state.countPages - 1) {
      return;
    }
    this.setState({ page: this.state.page + 1 });
  };

  decrementPage = () => {
    if (this.state.page === 0) {
      return;
    }
    this.setState({ page: this.state.page - 1 });
  };
  pagination = () => {
    const { countPerPage, templates } = this.state;
    const countPages = Math.ceil(templates.length / countPerPage);

    let paginationItems = [];
    let counter = 0;

    for (let i = 0; i < countPages; i++) {
      if (i === 0) {
        const item = templates.slice(0, countPerPage);
        paginationItems.push(item);
      } else {
        const item = templates.slice(counter, counter + countPerPage);
        paginationItems.push(item);
      }
      counter = counter + countPerPage;
    }

    this.setState({
      paginationTemplates: paginationItems,
      pagination: false,
      countPages,
      page: 0
    });
  };

  filterBySearchValue = () => {
    const { searchValue } = this.state;
    const SearchArray = this.props.category.templates
      .filter(template =>
        template.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map(template => template);
    this.setState({ templates: SearchArray }, () => this.pagination());
  };

  sortByName = () => {
    const { templates, sortedBy } = this.state;
    if (sortedBy === "name") {
      const templatesSorted = templates.reverse();
      this.setState({ templates: templatesSorted }, () => this.pagination());
    } else {
      const templatesSorted = templates.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      this.setState({ templates: templatesSorted, sortedBy: "name" }, () =>
        this.pagination()
      );
    }
  };
}

const mapStateToProps = state => ({
  category: state.category
});

const mapDispatchToProps = { fetchGetCategoryByName };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TemplatePage)
);
