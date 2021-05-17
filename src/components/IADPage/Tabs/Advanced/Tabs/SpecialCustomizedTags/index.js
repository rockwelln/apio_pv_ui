import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  fetchPutUpdateIADCustomTag,
  fetchGetIADs,
} from "../../../../../../store/actions";

import Tags from "./Tags";
import AddTagModal from "./AddTagModal";
import Loading from "../../../../../../common/Loading";
import DeleteModal from "./DeleteModal";
import RebootWindow from "../../../../../MassIADReboot/RebootWindow";

import { isAllowed, pages } from "../../../../../../utils/user";

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
  const [isEditAll, setIsEditAll] = useState(false);
  const [showDeleteWindow, setShowDeleteWindow] = useState(false);
  const [deleteValue, setDeleteValue] = useState("");
  const [showRebootWindow, setShowRebootWindow] = useState(false);
  const [rebootIads, setRebootIads] = useState([]);

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

  const iads = useSelector((state) => state.iads);

  const dispatch = useDispatch();

  useEffect(() => {
    pagination();
  }, [tags, countPages, countPerPage]);

  useEffect(() => {
    if (!isLoading) {
      const customTags = iadSpecialCustomTags.map((el) => ({
        ...el,
        allIADs: false,
        isEdit: false,
      }));
      setTags(customTags);
    }
  }, [isLoading, iadSpecialCustomTags]);

  const multipleEdit = (value) => {
    const newCustomTags = [
      ...tags.map((el) => ({
        ...el,
        isEdit: value,
        allIADs: value ? el.allIADs : false,
      })),
    ];
    setIsEditAll(value);
    setTags(newCustomTags);
  };

  const singleEdit = (tagName, value) => {
    const index = iadSpecialCustomTags.findIndex((el) => el.name === tagName);
    const newCustomTags = [...tags];
    newCustomTags[index].isEdit = value;
    if (!value) {
      newCustomTags[index].value = iadSpecialCustomTags[index].value;
      newCustomTags[index].allIADs = false;
    }
    setTags(newCustomTags);
  };

  const editValue = (tagName, value) => {
    const index = iadSpecialCustomTags.findIndex((el) => el.name === tagName);
    const newCustomTags = [...tags];
    newCustomTags[index].value = value;
    setTags(newCustomTags);
  };

  const setAllIADs = (tagName, value) => {
    const index = iadSpecialCustomTags.findIndex((el) => el.name === tagName);
    const newCustomTags = [...tags];
    newCustomTags[index].allIADs = value;
    setTags(newCustomTags);
  };

  const multipleUpdate = () => {
    let requestArray = [];
    tags.forEach((el) => {
      const { name, value, allIADs } = el;
      const data = { value, allIADs };

      requestArray.push(
        dispatch(
          fetchPutUpdateIADCustomTag(tenantId, groupId, iadId, name, data)
        )
      );
    });

    Promise.all(requestArray).then((res) => {
      if (res.every((el) => el === "success")) {
        rebootCallBack(
          tags.some((el) => el.allIADs),
          iadId
        );
        multipleEdit(false);
      }
    });
  };

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
    dispatch(fetchGetIADs(tenantId, groupId));
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

  const handleOpenDeleteWindow = (tagName) => {
    setDeleteValue(tagName);
    setShowDeleteWindow(true);
  };

  const handleOpenMultipleDeleteWindow = () => {
    setDeleteValue(tags.map((el) => el.name));
    setShowDeleteWindow(true);
  };

  const handleCloseDeleteWindow = () => {
    setShowDeleteWindow(false);
  };

  const rebootCallBack = (isAllIads, iad) => {
    setRebootIads(isAllIads ? iads.iads.map((el) => el.iadId) : [iad]);
    setShowRebootWindow(true);
  };

  const handleCloseRebootWindow = () => {
    dispatch(
      fetchGetIADSpecialCustomTags(tenantId, groupId, iadId, setIsLoading)
    ).then(() => pagination());
    setShowRebootWindow(false);
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
        {isAllowed(
          localStorage.getItem("userProfile"),
          pages.edit_iad_advanced_customized_tags
        ) && (
          <Col md={1}>
            <Glyphicon
              className={"x-large"}
              glyph="glyphicon glyphicon-plus-sign"
              onClick={() => setIsOpenAddModal(true)}
            />
          </Col>
        )}
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
              disabled={
                isUpdatingComment ||
                !isAllowed(
                  localStorage.getItem("userProfile"),
                  pages.edit_iad_advanced_customized_tags
                )
              }
            />
          </div>
          {isAllowed(
            localStorage.getItem("userProfile"),
            pages.edit_iad_advanced_customized_tags
          ) && (
            <Button
              onClick={handleUpdateComment}
              bsStyle="primary"
              disabled={isUpdatingComment}
            >
              <FormattedMessage
                id="update"
                defaultMessage={commentButtonName}
              />
            </Button>
          )}
        </Col>
      </Row>
      {paginationTags.length ? (
        <React.Fragment>
          <Row>
            <Col mdOffset={1} md={10}>
              <Table hover>
                <thead>
                  <tr>
                    <th style={{ width: "35%" }}>
                      <FormattedMessage id="tag-name" defaultMessage="Name" />
                    </th>
                    <th style={{ width: "35%" }}>
                      <FormattedMessage id="tag-value" defaultMessage="Value" />
                    </th>
                    {isAllowed(
                      localStorage.getItem("userProfile"),
                      pages.edit_iad_advanced_customized_tags
                    ) && (
                      <>
                        <th style={{ width: "14%" }}>
                          <FormattedMessage
                            id="allIADs"
                            defaultMessage="All IADs"
                          />
                        </th>
                        <th style={{ width: "8%" }}>
                          {isEditAll ? (
                            <>
                              <Glyphicon
                                className={"margin-right-1"}
                                glyph="glyphicon glyphicon-ok"
                                onClick={multipleUpdate}
                              />
                              <Glyphicon
                                glyph="glyphicon glyphicon-ban-circle"
                                onClick={() => multipleEdit(false)}
                              />
                            </>
                          ) : (
                            <Glyphicon
                              glyph="glyphicon glyphicon-pencil"
                              onClick={() => multipleEdit(true)}
                            />
                          )}
                        </th>
                        <th style={{ width: "8%" }}>
                          <Glyphicon
                            glyph="glyphicon glyphicon-remove"
                            onClick={handleOpenMultipleDeleteWindow}
                          />
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {paginationTags[page].map((tag) => (
                    <Tags
                      key={tag.name}
                      tag={tag}
                      isEditAll={isEditAll}
                      singleEdit={singleEdit}
                      editValue={editValue}
                      setAllIADs={setAllIADs}
                      handleDelete={handleOpenDeleteWindow}
                      rebootCallBack={rebootCallBack}
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
          rebootCallBack={rebootCallBack}
        />
      )}
      {showDeleteWindow && (
        <DeleteModal
          show={showDeleteWindow}
          onClose={handleCloseDeleteWindow}
          tagName={deleteValue}
          rebootCallBack={rebootCallBack}
        />
      )}
      {showRebootWindow && (
        <RebootWindow
          show={showRebootWindow}
          onClose={handleCloseRebootWindow}
          iads={rebootIads}
        />
      )}
    </React.Fragment>
  );
};

export default withRouter(SpecialCustomizedTagsTable);
