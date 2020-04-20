import React, { Component } from "react";
import AutoCompletedText from "./AutoCompletedText";
import DataTable from "./DataTable";
import "../css/App.css";
import axios from "axios";

window.$movies = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  changeState = (a) => {
    this.setState({ data: a });
  };

  componentDidMount() {
    const that = this;
    axios.get("/movies").then(function (response) {
      that.setState({ data: response.data });
      for (var i = 0; i < response.data.length; i++) {
        window.$movies.push(response.data[i].title);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <AutoCompletedText changeState={this.changeState} />
        <DataTable data={this.state.data} />
      </div>
    );
  }
}

export default App;
