import React from "react";
import store from "../../../store/store";
import * as actionTypes from "../../../store/actions/actionTypes";

const Tags = props => {
  const tags = props.tags;
  if (tags) {
    return (
      <div className="flex-row">
        {tags.map(tag => {
          const handleClick = ev => {
            ev.preventDefault();
            store.dispatch({
              type: actionTypes.SET_TAG,
              payload: tag
            });
            props.onClickTag(tag);
          };

          return (
            <a
              href=""
              className="tag-default tag-pill"
              key={tag}
              onClick={handleClick}
            >
              {tag}
            </a>
          );
        })}
      </div>
    );
  } else {
    return <div>Loading Tags...</div>;
  }
};

export default Tags;
