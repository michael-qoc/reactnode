import React from "react";
import PropTypes from "prop-types";

const RadioInputGroup = ({ input, label }) => {
  return (
    <label className="radio-inline">
      <input {...input} type="radio" />
      {label}
    </label>
  );
};

RadioInputGroup.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
};

export default RadioInputGroup;
