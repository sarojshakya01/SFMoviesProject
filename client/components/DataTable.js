import React from "react";
import Map from "./Map";

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.getRowData = this.getRowsData.bind(this);
  }

  getRowsData = function () {
    const items = this.props.data;
    const that = this;
    return items.map((row, index) => {
      var mydata = [];
      mydata.push(row.title);
      mydata.push(row.description);
      return (
        <tr key={index}>
          <RenderRow key={index} data={mydata} comp={that} index={index} />
        </tr>
      );
    });
  };

  setOpenModal = (e) => {
    const index = e.currentTarget.getAttribute("index");
    this.child.current.openModal(index);
  };

  render() {
    const that = this;
    return [
      <div key={0} id="datatable">
        <table>
          <thead>
            <tr>
              <th key="movies">Movies</th>
              <th key="map">Map</th>
            </tr>
          </thead>
          <tbody>{this.getRowsData()}</tbody>
        </table>
      </div>,
      <Map key={1} data={this.props.data} ref={this.child} />,
    ];
  }
}

const RenderRow = (props) => {
  const that = props.comp;
  const index = props.index;

  return props.data.map((movies, i) => {
    if (i == 0) {
      return <td key={i}>{movies}</td>;
    } else {
      return (
        <td key={i}>
          <div index={index} onClick={that.setOpenModal.bind(this)}>
            <img alt="map" src="../img/map.png" width="25" height="25"></img>
          </div>
        </td>
      );
    }
  });
};
