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
import Button from "react-bootstrap/lib/Button";
import { FormattedMessage } from "react-intl";

import { countsPerPages } from "../../../../../../constants";
import {
  fetchGetIADSpecialCustomTags,
  fetchPutUpdateIADCustomTagsComment,
} from "../../../../../../store/actions";

import Tags from "./Tags";
import AddTagModal from "./AddTagModal";
import Loading from "../../../../../../common/Loading";

const SpecialCustomizedTagsTable = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [countPerPage, setCountPrePage] = useState(25);
  const [tags, setTags] = useState([]);
  const [paginationTags, setPaginationTags] = useState([]);
  const [countPages, setCountPages] = useState(null);
  const [page, setPage] = useState(0);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [commentButtonName, setCommentButtonName] = useState("Update");
  const [isUpdatingComment, setIsUpdatingComment] = useState(false);

  const {
    match: {
      params: { tenantId, groupId, iadId },
    },
  } = props;
  const iadSpecialCustomTags = useSelector(
    (state) => state.iadSpecialCustomTags
  );
  const iadSpecialCustomTagsComment = useSelector(
    (state) => state.iadSpecialCustomTagsComment
  );

  const dispatch = useDispatch();

  useEffect(() => {
    pagination();
  }, [tags, countPages, countPerPage]);

  useEffect(() => {
    setTags(iadSpecialCustomTags);
  }, [iadSpecialCustomTags]);

  useEffect(() => {
    setComment(iadSpecialCustomTagsComment);
  }, [iadSpecialCustomTagsComment]);

  const filterBySearchValue = (value) => {
    setSearchValue(value);
    const SearchArray = iadSpecialCustomTags.filter(
      (tag) =>
        tag.name.toLowerCase().includes(value.toLowerCase()) ||
        tag.value.toLowerCase().includes(value.toLowerCase())
    );
    setTags(SearchArray);
  };

  useEffect(() => {
    dispatch(
      fetchGetIADSpecialCustomTags(tenantId, groupId, iadId, setIsLoading)
    ).then(() => pagination());
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

  const handleCloseAddModal = () => {
    setIsOpenAddModal(false);
    dispatch(
      fetchGetIADSpecialCustomTags(tenantId, groupId, iadId, setIsLoading)
    ).then(() => pagination());
  };

  const handleUpdateComment = () => {
    const data = {
      comment,
    };
    setIsUpdatingComment(true);
    setCommentButtonName("Updating");
    const callback = () => {
      setIsUpdatingComment(false);
      setCommentButtonName("Update");
    };
    dispatch(
      fetchPutUpdateIADCustomTagsComment(
        tenantId,
        groupId,
        iadId,
        data,
        callback
      )
    );
  };

  if (isLoading) {
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
          <Glyphicon
            className={"x-large"}
            glyph="glyphicon glyphicon-plus-sign"
            onClick={() => setIsOpenAddModal(true)}
          />
        </Col>
        {/* )} */}
      </Row>
      <Row>
        <Col md={11}>
          <div className="flex flex-row flex-end-center indent-top-bottom-1">
            <div>Item per page</div>
            <FormControl
              componentClass="select"
              value={countPerPage}
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
      <Row className={"margin-top-1"}>
        <Col mdOffset={1} md={10} className={"flex align-items-center"}>
          <div className={"margin-right-1 flex flex-basis-16"}>
            <FormattedMessage id="comment" defaultMessage="Comment" />
          </div>
          <div className={"margin-right-1 width-100p"}>
            <FormControl
              type="text"
              placeholder="Comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              disabled={isUpdatingComment}
            />
          </div>
          <Button
            onClick={handleUpdateComment}
            bsStyle="primary"
            disabled={isUpdatingComment}
          >
            <FormattedMessage id="update" defaultMessage={commentButtonName} />
          </Button>
        </Col>
      </Row>
      {paginationTags.length ? (
        <React.Fragment>
          <Row>
            <Col mdOffset={1} md={10}>
              <Table hover>
                <thead>
                  <tr>
                    <th style={{ width: "42%" }}>
                      <FormattedMessage id="tag-name" defaultMessage="Name" />
                      {/* <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={this.sortByID}
                      /> */}
                    </th>
                    <th style={{ width: "42%" }}>
                      <FormattedMessage id="tag-value" defaultMessage="Value" />
                      {/* <Glyphicon
                        glyph="glyphicon glyphicon-sort"
                        onClick={this.sortByTinaPID}
                      /> */}
                    </th>
                    <th style={{ width: "8%" }} />
                    <th style={{ width: "8%" }} />
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
      {isOpenAddModal && (
        <AddTagModal
          isOpen={isOpenAddModal}
          handleClose={handleCloseAddModal}
        />
      )}
    </React.Fragment>
  );
};

export default withRouter(SpecialCustomizedTagsTable);
