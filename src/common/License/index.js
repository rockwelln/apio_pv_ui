import React, { useState } from "react";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Button from "react-bootstrap/lib/Button";

import { FormattedMessage } from "react-intl";

const INFINITY = 8734;

const Licenses = props => {
  const [showMore, setShowMore] = useState(false);
  const { licenses, withShowMore, showHide, showEdit, isEditGroup } = props;
  return (
    <React.Fragment>
      <Table responsive>
        <thead>
          <tr>
            <th className={"licenses-th"} />
            <th className={"text-right vertical-middle licenses-th nowrap"}>
              {isEditGroup ? (
                <FormattedMessage id="in_use" defaultMessage="in use" />
              ) : (
                <FormattedMessage id="allocated" defaultMessage="allocated" />
              )}
            </th>
            <th className={"text-right vertical-middle licenses-th"}>
              <FormattedMessage id="limited" defaultMessage="limited" />
            </th>
            <th className={"licenses-th"} />
          </tr>
        </thead>
        <tbody>
          {licenses.map(
            (el, i) =>
              (!el.additional || !el.hide) && (
                <tr key={el.name}>
                  <td className={"licenses-td vertical-middle"}>{el.name}</td>
                  {!el.allocated.unlimited && el.allocated.maximum === 0 ? (
                    <td
                      colSpan={"2"}
                      className={"text-center licenses-td vertical-middle"}
                    >
                      <FormattedMessage
                        id="not_authorised"
                        defaultMessage="not authorised"
                      />
                    </td>
                  ) : (
                    <React.Fragment>
                      <td className={"text-right licenses-td vertical-middle"}>
                        {el.currentlyAllocated
                          ? el.currentlyAllocated
                          : el.inUse
                          ? el.inUse
                          : 0}
                      </td>
                      <td className={"text-right licenses-td vertical-middle"}>
                        {el.allocated.unlimited
                          ? String.fromCharCode(INFINITY)
                          : el.allocated.maximum}
                      </td>
                    </React.Fragment>
                  )}
                  <td className={"text-right licenses-td vertical-middle"}>
                    <Glyphicon
                      glyph="glyphicon glyphicon-pencil"
                      className={"edit-pencil"}
                      onClick={() => showEdit(i)}
                    />
                  </td>
                </tr>
              )
          )}
        </tbody>
      </Table>
      {withShowMore && (
        <Button
          bsStyle="link"
          onClick={() => {
            setShowMore(!showMore);
            showHide(showMore);
          }}
        >
          {showMore ? (
            <FormattedMessage id="hide" defaultMessage="Hide" />
          ) : (
            <FormattedMessage id="show_more" defaultMessage="Show more" />
          )}
        </Button>
      )}
    </React.Fragment>
  );
};

export default Licenses;
