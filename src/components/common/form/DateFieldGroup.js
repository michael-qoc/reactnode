import React from "react";
import classnames from "classnames";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const DateFieldGroup = ({
  input: { value, onChange, ...restInput },
  placeholder,
  info,
  meta: { touched, error },
  withTime,
  ...rest
}) => {
  return (
    <div
      className={classnames("form-group", {
        with_time: withTime
      })}
      style={{ width: "100%", position: "relative" }}
    >
      <DatePicker
        {...rest}
        className={classnames("form-control ", {
          "is-invalid": !!error && touched
        })}
        placeholderText={placeholder}
        selected={value ? moment(value) : null}
        //selected={moment(value)}
        onChange={onChange}
        {...restInput}
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

export default DateFieldGroup;
