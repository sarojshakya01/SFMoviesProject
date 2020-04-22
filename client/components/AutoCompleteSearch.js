import React from "react";
import axios from "axios";

export default class AutoCompleteSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      suggestions: [],
      allMovieList: [],
    };
  }

  componentDidMount() {
    let allMovieList = [];
    const that = this;

    axios.get("/movies?title=").then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        allMovieList.push(response.data[i].title);
      }

      that.setState(() => ({
        allMovieList: allMovieList,
        suggestions: [],
      }));
    });
  }

  onFocusLoadList = (elem) => {
    const value = elem.target.value.toLowerCase();
    let suggestions = [];
    let allMovieList = this.state.allMovieList;

    if (value === "") {
      suggestions = allMovieList;
    } else if (value.length > 0) {
      const regex = new RegExp(value);
      suggestions = allMovieList
        .sort()
        .filter((v) => regex.test(v.toLowerCase()));
    }

    this.setState(() => ({
      allMovieList: allMovieList,
      suggestions: suggestions,
      text: value,
    }));
  };

  onFocusSendRequestAndLoadList = (elem) => {
    const value = elem.target.value.toLowerCase();
    let suggestions = [];
    let allMovieList = [];
    const that = this;

    axios.get("/movies?title=").then(function (response) {
      that.props.changeState(response.data);

      for (var i = 0; i < response.data.length; i++) {
        allMovieList.push(response.data[i].title);
      }

      if (value === "") {
        suggestions = allMovieList;
      } else if (value.length > 0) {
        const regex = new RegExp(value);
        suggestions = allMovieList
          .sort()
          .filter((v) => regex.test(v.toLowerCase()));
      }

      that.setState(() => ({
        allMovieList: allMovieList,
        suggestions: suggestions,
        text: value,
      }));
    });
  };

  onTextChange = (elem) => {
    const value = elem.target.value.toLowerCase();
    let suggestions = this.state.allMovieList;

    if (value.length > 0) {
      const regex = new RegExp(value);
      suggestions = suggestions
        .sort()
        .filter((v) => regex.test(v.toLowerCase()));
    }

    this.setState(() => ({
      suggestions: suggestions,
      text: value,
    }));
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
          placeholder="Enter a movie name"
          onFocus={this.onFocusLoadList}
          // onFocus={this.onFocusSendRequestAndLoadList}
          onChange={this.onTextChange}
          value={text}
        />
        {this.renderSuggestions()}
        <span>Suggestions: {suggestions.length}</span>
      </div>
    );
  }
}
