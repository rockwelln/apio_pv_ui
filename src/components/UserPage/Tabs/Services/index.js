import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Checkbox from "react-bootstrap/lib/Checkbox";

import { FormattedMessage } from "react-intl";

import { fetchGetUserServicesByUserId } from "../../../../store/actions";
import { countsPerPages } from "../../../../constants";

import Loading from "../../../../common/Loading";
import Service from "./Service";

export class Services extends Component {
  state = {
    services: [],
    paginationServices: [],
    isLoading: true,
    sortedBy: "",
    countPerPage: 25,
    page: 0,
    pagination: true,
    countPages: null,
    searchValue: "",
    showDelete: false,
    servicesForDelete: []
  };

  componentDidMount() {
    this.props
      .fetchGetUserServicesByUserId(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        this.props.match.params.userName
      )
      .then(data =>
        this.setState(
          {
            services: this.props.userServices.sort((a, b) => {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            }),
            isLoading: data ? false : true,
            sortedBy: "name"
          },
          () => this.pagination()
        )
      );
  }

  render() {
    const {
      isLoading,
      countPerPage,
      pagination,
      paginationServices,
      page,
      showDelete
    } = this.state;
    if (isLoading && pagination) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <Row className={"margin-top-2"}>
          <Col mdOffset={1} md={10}>
            <InputGroup className={"margin-left-negative-4"}>
              <InputGroup.Addon>
                <Glyphicon glyph="lyphicon glyphicon-search" />
              </InputGroup.Addon>
              <FormattedMessage
                id="search_placeholder"
                defaultMessage="Service"
              >
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
        {paginationServices.length ? (
          <React.Fragment>
            <Row>
              <Col mdOffset={1} md={10}>
                <div style={{ display: "flex" }}>
                  <Checkbox
                    className={"margin-checbox"}
                    checked={this.state.selectAll}
                    onChange={this.handleSelectAllClick}
                  >
                    assign/deassign all
                  </Checkbox>
                </div>
              </Col>
            </Row>
            <Row>
              <Col mdOffset={1} md={10}>
                <Table hover>
                  <thead>
                    <tr>
                      <th style={{ width: "60%" }}>
                        <FormattedMessage
                          id="tenant-id"
                          defaultMessage="Service"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByName}
                        />
                      </th>
                      <th style={{ width: "10%" }}>
                        <FormattedMessage id="name" defaultMessage="Assigned" />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByServiceChecked}
                        />
                      </th>
                      <th style={{ width: "25%" }}>
                        <FormattedMessage id="type" defaultMessage="Status" />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByStatus}
                        />
                      </th>
                      <th style={{ width: "5%" }} />
                    </tr>
                  </thead>
                  <tbody>
                    {paginationServices[page].map((service, i) => (
                      <Service
                        key={i}
                        index={i}
                        tenantId={this.props.tenantId}
                        service={service}
                        notifications={this.props.notifications}
                        handleSingleCheckboxClick={
                          this.handleSingleCheckboxClick
                        }
                        onReload={() =>
                          this.props.fetchGetUserServicesByUserId(
                            this.props.match.params.tenantId,
                            this.props.match.params.groupId,
                            this.props.match.params.userName
                          )
                        }
                      />
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col mdOffset={9} md={2}>
                <FormControl
                  componentClass="select"
                  defaultValue={countPerPage}
                  style={{ display: "inline", width: "auto" }}
                  className={"margin-1"}
                  onChange={this.changeCoutOnPage}
                >
                  {countsPerPages.map(counts => (
                    <option key={counts.value} value={counts.value}>
                      {counts.title}
                    </option>
                  ))}
                </FormControl>
                <Glyphicon
                  glyph="glyphicon glyphicon-chevron-left"
                  onClick={this.decrementPage}
                />
                {this.state.page + 1}
                <Glyphicon
                  glyph="glyphicon glyphicon-chevron-right"
                  onClick={this.incrementPage}
                />
              </Col>
            </Row>
          </React.Fragment>
        ) : (
          <Col mdOffset={1} md={10}>
            <FormattedMessage
              id="notFound"
              defaultMessage="No services were found"
            />
          </Col>
        )}
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
    const { countPerPage, services } = this.state;
    const countPages = Math.ceil(services.length / countPerPage);

    let paginationItems = [];
    let counter = 0;

    for (let i = 0; i < countPages; i++) {
      if (i === 0) {
        const item = services.slice(0, countPerPage);
        paginationItems.push(item);
      } else {
        const item = services.slice(counter, counter + countPerPage);
        paginationItems.push(item);
      }
      counter = counter + countPerPage;
    }

    this.setState({
      paginationServices: paginationItems,
      pagination: false,
      countPages,
      page: 0
    });
  };

  handleSelectAllClick = e => {
    const isChecked = e.target.checked;
    const newArr = this.state.services.map(el => ({
      ...el,
      serviceChecked: isChecked
    }));
    this.setState({ services: newArr, selectAll: !this.state.selectAll }, () =>
      this.pagination()
    );
  };

  handleSingleCheckboxClick = index => {
    const newArr = this.state.services.map((el, i) => ({
      ...el,
      serviceChecked: index === i ? !el.serviceChecked : el.serviceChecked
    }));
    this.setState({ services: newArr, selectAll: false }, () =>
      this.pagination()
    );
  };

  filterBySearchValue = () => {
    const { searchValue } = this.state;
    const SearchArray = this.props.userServices
      .filter(service =>
        service.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map(service => service);
    this.setState({ services: SearchArray }, () => this.pagination());
  };

  sortByName = () => {
    const { services, sortedBy } = this.state;
    if (sortedBy === "name") {
      const servicesSorted = services.reverse();
      this.setState({ services: servicesSorted }, () => this.pagination());
    } else {
      const servicesSorted = services.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      this.setState({ services: servicesSorted, sortedBy: "name" }, () =>
        this.pagination()
      );
    }
  };

  sortByServiceChecked = () => {
    const { services, sortedBy } = this.state;
    if (sortedBy === "serviceChecked") {
      const servicesSorted = services.reverse();
      this.setState({ services: servicesSorted }, () => this.pagination());
    } else {
      const servicesSorted = services.sort((a, b) => {
        if (a.serviceChecked < b.serviceChecked) return 1;
        if (a.serviceChecked > b.serviceChecked) return -1;
        return 0;
      });
      this.setState(
        { services: servicesSorted, sortedBy: "serviceChecked" },
        () => this.pagination()
      );
    }
  };

  sortByStatus = () => {
    const { services, sortedBy } = this.state;
    if (sortedBy === "status") {
      const servicesSorted = services.reverse();
      this.setState({ services: servicesSorted }, () => this.pagination());
    } else {
      const servicesSorted = services.sort((a, b) => {
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return 0;
      });
      this.setState({ services: servicesSorted, sortedBy: "status" }, () =>
        this.pagination()
      );
    }
  };
}

const mapStateToProps = state => ({ userServices: state.userServices });

const mapDispatchToProps = { fetchGetUserServicesByUserId };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Services)
);
