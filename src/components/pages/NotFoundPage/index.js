import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = props => {
  return (
    <div className="container ">
      <div
        className=" flex-row align-items-center justify-content-center"
        style={{ height: "75vh" }}
      >
        <div className=" text-center">
          <h1>{`Ooops :( `}</h1>
          <p
            style={{ margin: 20 }}
            className=""
          >{`route not found (404)...`}</p>
          <Link className="btn btn-success btn-lg" to="/">
            Go back to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
