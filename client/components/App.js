import React, { Component } from "react";
import axios from "axios";
import AutoCompleteSearch from "./AutoCompleteSearch";
import DataTable from "./DataTable";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataFetched: false,
      data: [],
    };
  }
  changeState = (a) => {
    this.setState({ data: a });
  };

  componentDidMount() {
    const that = this;
    axios.get("/movies").then(function (response) {
      that.setState({ isDataFetched: true, data: response.data });
    });
  }

  render() {
    return this.state.isDataFetched ? (
      <div className="App">
        <AutoCompleteSearch changeState={this.changeState} />
        <DataTable data={this.state.data} />
      </div>
    ) : (
      <div class="loader"></div>
    );
  }
}

export default App;
