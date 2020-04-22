import React from "react";
import axios from "axios";

export default class AutoCompleteSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: "",
    };
  }

  onTextChange = (elem) => {
    const value = elem.target.value.toLowerCase();
    let suggestions = [];
    const that = this;
    axios.get("/movies?title=").then(function (response) {
      that.props.changeState(response.data);

      for (var i = 0; i < response.data.length; i++) {
        suggestions.push(response.data[i].title);
      }

      if (value === "") {
        suggestions = suggestions;
      } else if (value.length > 0) {
        const regex = new RegExp(value);
        suggestions = suggestions
          .sort()
          .filter((v) => regex.test(v.toLowerCase()));
      }

      that.setState(() => ({
        suggestions,
        text: value,
      }));
    });
  };

  selectedText(value) {
    this.setState(() => ({
      text: value,
      suggestions: [],
    }));
    const that = this;
    axios.get("/movies?title=" + value).then(function (response) {
      that.props.changeState(response.data);
    });
  }

  renderSuggestions = () => {
    let { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((item, index) => (
          <li key={index} onClick={() => this.selectedText(item)}>
            {item}
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { text, suggestions } = this.state;
    return (
      <div id="search-container">
        <h2>Search movies</h2>
        <input
          id="search-input"
          type="text"
          onChange={this.onTextChange}
          value={text}
        />
        {this.renderSuggestions()}
        <span>Suggestions: {suggestions.length}</span>
      </div>
    );
  }
}
