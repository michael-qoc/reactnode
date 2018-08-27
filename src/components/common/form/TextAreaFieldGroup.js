import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextAreaFieldGroup = ({
  //name,
  input,
  rows,
  placeholder,
  meta: { touched, error },
  //value,
  //error,
  info
  //onChange
}) => {
  return (
    <div className="form-group">
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": !!error && touched
        })}
        {...input}
        placeholder={placeholder}
        //name={name}
        rows={rows}
        //value={value}
        //onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && touched ? (
        <p>
          <small style={{ color: "red", marginTop: 0 }}>{error}</small>
        </p>
      ) : null}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  //name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  //value: PropTypes.string.isRequired,
  info: PropTypes.string
  //error: PropTypes.string,
  //onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
