import React from "react";
import Map from "./Map";
import MovieRow from "./MovieRow";

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  renderRowsData = () => {
    const moviesList = this.props.data;
    const renderMovieListRows = moviesList.map((movie, index) => {
      return (
        <MovieRow
          key={index}
          movieName={movie.title}
          index={index}
          openModal={this.openModal}
        />
      );
    });
    return renderMovieListRows;
  };

  openModal = (e) => {
    const index = e.currentTarget.getAttribute("index");
    this.child.current.openModal(index);
  };

  render() {
    return (
      <>
        <div id="datatable">
          <table>
            <thead>
              <tr>
                <th>Movies</th>
                <th>Map</th>
              </tr>
            </thead>
            <tbody>{this.renderRowsData()}</tbody>
          </table>
        </div>
        <Map key={1} data={this.props.data} ref={this.child} />
      </>
    );
  }
}
