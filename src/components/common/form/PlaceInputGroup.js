import React, { Component } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import Script from "react-load-script";
import classnames from "classnames";

const googleMapKey = "AIzaSyBtVBu2JP6xkGwpHQaqDtqiSA1RNnOrm-I";

const styles = {
  autocompleteContainer: {
    zIndex: 1000
  }
};

class PlaceInputGroup extends Component {
  state = {
    scriptLoaded: false
  };

  handleScriptLoad = () => {
    this.setState({ scriptLoaded: true });
  };

  render() {
    const {
      input,
      info,
      onSelect,
      placeholder,
      options,
      meta: { touched, error }
    } = this.props;
    return (
      <div
        className={classnames("form-group", {
          "has-error": !!error && touched
        })}
      >
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&libraries=places`}
          onLoad={this.handleScriptLoad}
        />

        {this.state.scriptLoaded && (
          <PlacesAutocomplete
            className={classnames("form-control form-control-lg", {
              "is-invalid": !!error && touched
            })}
            inputProps={{ ...input, placeholder }}
            options={options}
            onSelect={onSelect}
            styles={styles}
          />
        )}

        {info && <small className="form-text text-muted">{info}</small>}
        {error && touched ? (
          <p>
            <small style={{ color: "red", marginTop: 0 }}>{error}</small>
          </p>
        ) : null}
      </div>
    );
  }
}
export default PlaceInputGroup;
