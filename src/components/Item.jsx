import React from "react";

const Item = (props) => {
  return (
    <div>
      <div className="row">
        <div className="col-auto">
          <button
            onClick={props.onRemove}
            type="button"
            className="btn btn-primary btn-sm"
          >
            -
          </button>
        </div>
        <div className="col" data-id={props.id}>
          {props.task}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Item;
