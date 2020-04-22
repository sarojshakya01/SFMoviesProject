import React from "react";
import Map from "./Map";

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.getRowData = this.getRowsData.bind(this);
  }

  getRowsData = function () {
    var items = this.props.data;
    return items.map((row, index) => {
      var mydata = [];
      mydata.push(row.title);
      mydata.push(row.description);
      return (
        <tr key={index}>
          <RenderRow key={index} data={mydata} />
        </tr>
      );
    });
  };

  render() {
    return (
      <div id="datatable">
        <table>
          <thead>
            <tr>
              <th key="movies">Movies</th>
              <th key="map">Map</th>
            </tr>
          </thead>
          <tbody>{this.getRowsData()}</tbody>
        </table>
      </div>
    );
  }
}

const RenderRow = (props) => {
  return props.data.map((data, index) => {
    if (index == 0) {
      return <td key={index}>{props.data[index]}</td>;
    } else {
      return (
        <td key={index}>
          <Map data={props.data} />
        </td>
      );
    }
  });
};
