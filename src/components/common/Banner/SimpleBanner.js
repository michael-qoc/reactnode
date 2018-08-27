import React from "react";

const Banner = ({ appName }) => {
  return (
    <div
      className="banner flex-row align-items-center "
      style={{ marginBottom: 30 }}
    >
      <div className="container ">
        <h1 className="text-center	" style={{ marginTop: 0 }}>
          React & Node
        </h1>
        <h4 className="text-center	font-slim" style={{ marginTop: 20 }}>
          React as frontend and Node as middle layer
        </h4>
      </div>
    </div>
  );
};

export default Banner;
