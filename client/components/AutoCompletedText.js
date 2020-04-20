import React from "react";
import "../css/App.css";
import axios from "axios";

export default class AutoCompletedText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: "",
    };
  }

  onTextChange = (e) => {
    const value = e.target.value.toLowerCase();
    let suggestions = [];
    if (value == "") {
      const that = this;
      axios.get("/movies?title=" + value).then(function (response) {
        that.props.changeState(response.data);
      });
    } else {
      if (value.length > 0) {
        const regex = new RegExp(value);
        suggestions = window.$movies
          .sort()
          .filter((v) => regex.test(v.toLowerCase()));
      }
    }
    this.setState(() => ({
      suggestions,
      text: value,
    }));
  };

  selectedText(value) {
    let data = [];
    data.push(value);
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
      <div id="notebooks">
        <h2>Search movies</h2>
        <input
          id="query"
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
