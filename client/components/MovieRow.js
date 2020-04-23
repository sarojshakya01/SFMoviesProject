import React from "react";

const MovieRow = (props) => {
  const { movieName, openModal, index } = props;
  return (
    <tr>
      <td>{movieName}</td>
      <td>
        <div index={index} onClick={openModal}>
          <img alt="map" src="../img/map.png" width="25" height="25"></img>
        </div>
      </td>
    </tr>
  );
};

export default MovieRow;
