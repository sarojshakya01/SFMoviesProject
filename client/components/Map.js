import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import Modal from "react-modal";
import { Button } from "react-bootstrap";

const mapStyles = {
  width: "94%",
  height: "94%",
};

export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      movie: "",
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({
      modalIsOpen: true,
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      movie: "",
    });
  }

  componentDidMount() {
    this.setState({
      movie: this.props.data[0],
    });
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    const sanfrancisco = { lat: 37.755704, lng: -122.437344 };

    return (
      <div>
        <div onClick={this.openModal}>
          <img alt="map" src="../img/map.png" width="25" height="25"></img>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          ariaHideApp={false}
          contentLabel="Map"
          className="Modal"
        >
          <Button bsstyle="danger" bssize="mini" onClick={this.closeModal}>
            <span className="closebtn glyphicon glyphicon-remove"></span>
          </Button>
          <div id="mapframe">
            <Map
              google={this.props.google}
              zoom={13}
              style={mapStyles}
              initialCenter={sanfrancisco}
              onClick={this.onMapClicked}
            >
              {this.props.data[1].map((info, index) => {
                if (info.lat_lon != undefined) {
                  return [
                    <Marker
                      key={"marker_" + info.title + index.toString()}
                      onClick={this.onMarkerClick}
                      title={info.locations}
                      moviename={this.state.movie}
                      location={info.locations}
                      funfact={info.fun_facts}
                      prodcomp={info.production_company}
                      distrubuter={info.distrubuter}
                      director={info.director}
                      writer={info.writer}
                      actor_1={info.actor_1}
                      actor_2={info.actor_2}
                      actor_3={info.actor_3}
                      position={{
                        lat: info.lat_lon.split(",")[0],
                        lng: info.lat_lon.split(",")[1],
                      }}
                      // icon={{
                      //   url: "../img/map.png",
                      //   anchor: new google.maps.Point(32, 32),
                      //   scaledSize: new google.maps.Size(64, 64),
                      // }}
                    ></Marker>,
                    <InfoWindow
                      key={"info_" + info.title + index.toString()}
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}
                      onClose={this.onClose}
                    >
                      <div>
                        <p>
                          <b>Movie Title: </b>
                          {this.state.selectedPlace.name}
                        </p>

                        <p>
                          <b>Location: </b>
                          {this.state.selectedPlace.location}
                        </p>

                        <p>
                          <b>Fun Fact: </b>
                          {this.state.selectedPlace.funfact}
                        </p>

                        <p>
                          <b>Production Company: </b>
                          {this.state.selectedPlace.prodcomp}
                        </p>

                        <p>
                          <b>Distributor: </b>
                          {this.state.selectedPlace.distrubuter}
                        </p>

                        <p>
                          <b>Director: </b>
                          {this.state.selectedPlace.director}
                        </p>

                        <p>
                          <b>Writer: </b>
                          {this.state.selectedPlace.writer}
                        </p>

                        <p>
                          <b>Actor 1: </b>
                          {this.state.selectedPlace.actor_1}
                        </p>

                        <p>
                          <b>Actor 2: </b>
                          {this.state.selectedPlace.actor_2}
                        </p>

                        <p>
                          <b>Actor 3: </b>
                          {this.state.selectedPlace.actor_3}
                        </p>
                      </div>
                    </InfoWindow>,
                  ];
                }
              })}
            </Map>
          </div>
        </Modal>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBrX6PgieG65DkgD9G0CYPYcG7Uk2YK4nM",
})(MapContainer);
