import React, { Component } from "react";
import axios from "axios";
import AutoCompleteSearch from "./AutoCompleteSearch";
import DataTable from "./DataTable";

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
    });
  }

  render() {
    return (
      <div className="App">
        <AutoCompleteSearch changeState={this.changeState} />
        <DataTable data={this.state.data} />
      </div>
    );
  }
}

export default App;
