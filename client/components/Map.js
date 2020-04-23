import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Modal from "react-modal";
import { Button } from "react-bootstrap";

const mapStyles = {
  width: "100%",
  height: "100%",
};

const sanfrancisco = { lat: 37.755704, lng: -122.437344 };

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.KEY = "<GOOGLE_MAP_API_KEY>";
    this.center = sanfrancisco;
    this.zoom = 12;
    this.state = {
      modalIsOpen: false,
      movie: "",
      data: [],
    };
    this.closeModal = this.closeModal.bind(this);
  }

  onGoogleApiLoaded = ({ map, maps }) => {
    this.map = map;
    this.maps = maps;
    this.infowindow = new maps.InfoWindow();
    let info = this.state.data;
    for (let i = 0; i < info.length; i++) {
      if (info[i].lat_lon !== undefined) {
        this.renderMarkers(info[i]);
      } else {
        alert("Location is not available.");
        break;
      }
    }
  };

  renderMarkers = (info) => {
    let infoWindowContent =
      "<div><p><b>Movie Title: </b>" + this.state.movie + "</p>";
    infoWindowContent =
      infoWindowContent + "<p><b>Location: </b>" + info.locations + "</p>";

    if (info.funfact !== undefined) {
      infoWindowContent =
        infoWindowContent + "<p><b>Fun Fact: </b>" + info.funfact + "</p>";
    }

    if (info.prodcomp !== undefined) {
      infoWindowContent =
        infoWindowContent +
        "<p><b>Production Company: </b>" +
        info.prodcomp +
        "</p>";
    }

    if (info.distrubuter !== undefined) {
      infoWindowContent =
        infoWindowContent +
        "<p><b>Distributor: </b>" +
        info.distrubuter +
        "</p>";
    }

    if (info.director !== undefined) {
      infoWindowContent =
        infoWindowContent + "<p><b>Director: </b>" + info.director + "</p>";
    }

    if (info.writer !== undefined) {
      infoWindowContent =
        infoWindowContent + "<p><b>Writer: </b>" + info.writer + "</p>";
    }

    if (info.actor_1 !== undefined) {
      infoWindowContent =
        infoWindowContent + "<p><b>Actor 1: </b>" + info.actor_1 + "</p>";
    }

    if (info.actor_2 !== undefined) {
      infoWindowContent =
        infoWindowContent + "<p><b>Actor 2: </b>" + info.actor_2 + "</p>";
    }

    if (info.actor_3 !== undefined) {
      infoWindowContent =
        infoWindowContent + "<p><b>Actor 3: </b>" + info.actor_3 + "</p></div>";
    }

    let marker = new this.maps.Marker({
      position: {
        lat: parseFloat(info.lat_lon.split(",")[0]),
        lng: parseFloat(info.lat_lon.split(",")[1]),
      },
      map: this.map,
      title: info.title,
      infoWindowContent: infoWindowContent,
    });

    marker.addListener("click", () => {
      this.infowindow.setContent(marker.infoWindowContent);
      this.infowindow.open(this.map, marker);
    });
  };

  openModal(index) {
    this.setState({
      modalIsOpen: true,
      movie: this.props.data[index].title,
      data: this.props.data[index].description,
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      movie: "",
      data: [],
    });
  }

  componentDidMount() {
    this.setState({
      movie: this.props.data[0],
    });
  }

  render() {
    return (
      <div>
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
          <div id="mapframe" style={mapStyles}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: this.KEY, libraries: "places" }}
              onGoogleApiLoaded={this.onGoogleApiLoaded}
              defaultCenter={this.center}
              defaultZoom={this.zoom}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default MapContainer;
