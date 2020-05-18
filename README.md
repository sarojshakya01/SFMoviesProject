visit My linkedin profile [here](https://www.linkedin.com/in/saroj-shakya)

After cloning(or downloading and extracting) the project, go to the project directory and run

### `npm start`

### Project: SF Movies

### Problem Statement

Create a service that shows on a map where movies have been filmed in San Francisco. User should be able to filter the view using autocompletion search.

The movie filming locations data are avalable on [DataSF : Film Locations](https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am)

### About the Project
SF Movies is a full stack web application which displays different filming locations in San Francisco for different movies. This application has used the data provided by the [DataSF : Film Locations](https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am). This application basically:

- displays the list of available movies with corresponging map in tabular structure
- provides a auto completion text search for movies by title
- displays a Google map of San Francisco.
- displays markers on a map of different filming locations of that particular movies after the movie is selected from auto completion text search.
- display the information on the selected movie if the markers on a map is clicked.

### Technology used

MongoDB
ExpressJS
ReactJS
NodeJS
JavaScript
HTML5
CSS
Bootstrap

### Architechture and Working Mechanism

This application has a simple autocompletion search with total found suggestions at the left panel of the page. At the side, a table with total movie record are displayed with corresponding map icons. The user can view filming locations of any movies from that icon. When user clicks the icon, the pop-up modal is opened with maps and correspongs locations with markers. When user again click on marker, it displays the movie descriptions in the info window.
In addition to this, the user can search for a movie using autocomplete search. When the user search for a movie, the get request is sent using axios for total movies available, then at front end, the matched movies with search key is displayed along with total number of matched movies after server send back the response. If the user select one suggestion from the suggestion list, request is again sent to the server from axios for the detail information of selected movies. After server sent back the response to client, based on the detail information on movies, the markers are displayed on a map. If the user click on the marker, the info window is displayed with details information on that movies as the available data on dataset.
