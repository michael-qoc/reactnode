import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

//const google = window.google;

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        return getLatLng(results[0]);
      })
      .then(latLng => {
        console.log("Success", latLng);
      })
      .catch(error => console.error("Error", error));
  };
  onError = (status, clearSuggestions) => {
    console.log("Google Maps API returned error with status: ", status);
    clearSuggestions();
  };
  render() {
    return (
      <div className="LocationSearchInput">
        <form onSubmit={this.handleFormSubmit}>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            onError={this.onError}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div className="wrapper">
                <input
                  {...getInputProps({
                    placeholder: "Enter city name to check weather below ...",
                    className: "location-search-input"
                  })}
                />
                {this.state.address ? (
                  <button
                    onClick={() => {
                      this.setState({ address: "" });
                    }}
                    className="Demo__clear-button"
                  >
                    X
                  </button>
                ) : null}
                <div className="autocomplete-dropdown-container">
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? {
                          backgroundColor: "#fafafa",
                          cursor: "pointer",
                          width: "50rem"
                        }
                      : {
                          backgroundColor: "#ffffff",
                          cursor: "pointer",
                          width: "50rem"
                        };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <span className="suggestion-wrapper">
                          {suggestion.description}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default LocationSearchInput;
