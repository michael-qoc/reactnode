import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = props => {
  const { input, placeholder, info, type, disabled, meta } = props;

  return (
    <div className="form-group ">
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": !!meta.error && meta.touched
        })}
        placeholder={placeholder}
        {...input}
        //name={name}
        //value={value}
        //onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {meta.error && meta.touched ? (
        <p>
          <small style={{ color: "red", marginTop: 0 }}>{meta.error}</small>
        </p>
      ) : null}
    </div>
  );
};

TextFieldGroup.propTypes = {
  //name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  //value: PropTypes.string.isRequired,
  info: PropTypes.string,
  //error: PropTypes.string,
  type: PropTypes.string.isRequired,
  //onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
