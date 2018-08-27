import React from "react";

export default ({ maxWidth, maxHeight, image }) => {
  return (
    <div
      className=" border-radius"
      style={{
        display: "inline-block",
        border: "1px solid #ddd",
        padding: 3
      }}
    >
      <div
        style={{
          maxWidth,
          maxHeight,
          overflowY: "hidden"
        }}
      >
        <img
          className="img-responsive "
          alt=""
          style={{ width: "100%" }}
          src={image}
        />
      </div>
    </div>
  );
};
