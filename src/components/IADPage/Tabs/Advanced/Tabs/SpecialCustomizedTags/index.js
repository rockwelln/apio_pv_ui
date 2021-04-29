import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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

import { countsPerPages } from "../../../../../../constants";
import {
  fetchGetIADSpecialCustomTags,
  clearCreatedTenant,
} from "../../../../../../store/actions";
import { removeEmpty } from "../../../../../remuveEmptyInObject";

import Tags from "./Tags";

const fakeTags = [
  {
    name: "foo",
    value: "bar",
  },
  {
    name: "foo",
    value: "bar",
  },
  {
    name: "foo",
    value: "bar",
  },
  {
    name: "%foo%",
    value: "%bar%",
  },
  {
    name: "foo",
    value: "bar",
  },
  {
    name: "asf",
    value: "sadf",
  },
  {
    name: "12312",
    value: "sad342323f",
  },
  {
    name: "foo",
    value: "bar",
  },
  {
    name: "foo",
    value: "bar",
  },
  {
    name: "foo",
    value: "bar",
  },
  {
    name: "%foo%",
    value: "%bar%",
  },
  {
    name: "foo",
    value: "bar",
  },
  {
    name: "asf",
    value: "sadf",
  },
  {
    name: "12312",
    value: "sad342323f",
  },
  {
    name: "foo",
    value: "bar",
  },
  {
    name: "foo",
    value: "bar",
  },
  {
    name: "foo",
    value: "bar",
  },
  {
    name: "%foo%",
    value: "%bar%",
  },
  {
    name: "foo",
    value: "bar",
  },
  {
    name: "asf",
    value: "sadf",
  },
  {
    name: "12312",
    value: "sad342323f",
  },
  {
    name: "foo",
    value: "bar",
  },
  {
    name: "foo",
    value: "bar",
  },
  {
    name: "foo",
    value: "bar",
  },
  {
    name: "%foo%",
    value: "%bar%",
  },
  {
    name: "foo",
    value: "bar",
  },
  {
    name: "asf",
    value: "sadf",
  },
  {
    name: "12312",
    value: "sad342323f",
  },
];

const SpecialCustomizedTagsTable = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [countPerPage, setCountPrePage] = useState(25);
  const [tags, setTags] = useState(fakeTags);
  const [paginationTags, setPaginationTags] = useState([]);
  const [countPages, setCountPages] = useState(null);
  const [page, setPage] = useState(0);

  const {
    match: {
      params: { tenantId, groupId, iadId },
    },
  } = props;
  const createdTenant = useSelector((state) => state.createdTenant);
  const dispatch = useDispatch();

  useEffect(() => {
    pagination();
  }, [tags, countPages]);

  const filterBySearchValue = (value) => {
    setSearchValue(value);
    const SearchArray = fakeTags.filter(
      (tag) =>
        tag.name.toLowerCase().includes(value.toLowerCase()) ||
        tag.value.toLowerCase().includes(value.toLowerCase())
    );
    console.log(SearchArray);
    setTags(SearchArray);
  };

  useEffect(() => {
    dispatch(fetchGetIADSpecialCustomTags(tenantId, groupId, iadId)).then(() =>
      pagination()
    );
  }, []);

  const pagination = () => {
    const countPages = Math.ceil(tags.length / countPerPage);
    const paginationTags = [...tags];
    let paginationItems = [];
    let counter = 0;

    for (let i = 0; i < countPages; i++) {
      if (i === 0) {
        const item = paginationTags.slice(0, countPerPage);
        paginationItems.push(item);
      } else {
        const item = paginationTags.slice(counter, counter + countPerPage);
        paginationItems.push(item);
      }
      counter = counter + countPerPage;
    }

    setPaginationTags(paginationItems);
    setCountPages(countPages);
    setPage(page);
  };

  const changeCoutOnPage = (e) => {
    setCountPrePage(Number(e.target.value));
    setPage(0);
  };

  const incrementPage = () => {
    if (page >= countPages - 1) {
      return;
    }
    setPage(page + 1);
  };

  const decrementPage = () => {
    if (page === 0) {
      return;
    }
    setPage(page - 1);
  };

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
              defaultMessage="Tag name or value"
            >
              {(placeholder) => (
                <FormControl
                  type="text"
                  value={searchValue}
                  placeholder={placeholder}
                  onChange={(e) => {
                    filterBySearchValue(e.target.value);
                  }}
                />
              )}
            </FormattedMessage>
          </InputGroup>
        </Col>
        {/* {isAllowed(localStorage.getItem("userProfile"), pages.create_group) && ( */}
        <Col md={1}>
          <Link
          //to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/addgroup`}
          >
            <Glyphicon
              className={"x-large"}
              glyph="glyphicon glyphicon-plus-sign"
            />
          </Link>
        </Col>
        {/* )} */}
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
              onChange={changeCoutOnPage}
            >
              {countsPerPages.map((counts) => (
                <option key={counts.value} value={counts.value}>
                  {counts.title}
                </option>
              ))}
            </FormControl>
          </div>
        </Col>
      </Row>
      {paginationTags.length ? (
        <React.Fragment>
          <Row>
            <Col mdOffset={1} md={10}>
              <Table hover>
                <thead>
                  <tr>
                    <th>
                      <FormattedMessage id="tag-name" defaultMessage="Name" />
                      {/* <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={this.sortByID}
                      /> */}
                    </th>
                    <th>
                      <FormattedMessage id="tag-value" defaultMessage="Value" />
                      {/* <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={this.sortByTinaPID}
                      /> */}
                    </th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {paginationTags[page].map((tag) => (
                    <Tags
                      key={Math.random()}
                      tag={tag}
                      //onReload={() => this.fetchReq()}
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
                  <Pagination.Prev onClick={decrementPage} />
                  <Pagination.Item>{page + 1}</Pagination.Item>
                  <Pagination.Next onClick={incrementPage} />
                </Pagination>
              </div>
            </Col>
          </Row>
        </React.Fragment>
      ) : (
        <Col mdOffset={1} md={10}>
          <FormattedMessage
            id="notFound"
            defaultMessage="No groups were found"
          />
        </Col>
      )}
      <Row>
        <Col md={12}>
          <Table hover>
            <thead>
              <tr>
                <th>
                  <FormattedMessage id="name" defaultMessage="Name" />
                </th>
                <th>
                  <FormattedMessage id="value" defaultMessage="Value" />
                </th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {[{ name: 123, value: 321 }].map((tag) => (
                <Tags
                  key={tag.value}
                  tag={tag}
                  //onReload={() => this.fetchReq()}
                />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default withRouter(SpecialCustomizedTagsTable);
