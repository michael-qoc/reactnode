import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({
  input,
  placeholder,
  info,
  multiple,
  options,
  meta: { touched, error }
}) => {
  const selectOptions = options.map(option => (
    <option key={option.key} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group ">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": touched && !!error
        })}
        //name={name}
        //value={input.value || null}
        //onChange={(event, data) => input.onChange(data.value)}
        {...input}
        //onChange={(event, data) => console.log(data)}
        placeholder={placeholder}
        multiple={multiple}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && touched ? (
        <p>
          <small style={{ color: "red", marginTop: 0 }}>{error}</small>
        </p>
      ) : null}
    </div>
  );
};

SelectListGroup.propTypes = {
  //name: PropTypes.string.isRequired,
  //value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  //onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
