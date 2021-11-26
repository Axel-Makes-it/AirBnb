import { useState } from "react";
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import getCenter from "geolib/es/getCenter";


function Map({ searchResults }) {
    const [selectedLocation, setSelectedLocation] = useState({});

      // Transform the search results object into the
      // {latitude:52.56, longtitude:13.37}
      // object
      // had to convert my json data cordinates from lat/long to corespond
      // and match  geolib with full longitude/latutude variables

      const coordinates = searchResults.map(result => ({
          longitude: result.long,
          latitude: result.lat,
      }));

     const center = getCenter(coordinates);

     const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
      });

    return <ReactMapGL
        mapStyle="mapbox://styles/badbearaxel/ckwgq0w1m024b14o9l9cgwkgi"
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        
    >
        {searchResults.map(result => (
            <div key={result.long}>
                <Marker
                    longitude={result.long}
                    latitude={result.lat}
                    offsetLeft={-20}
                    offsetTop={-10}
                >
                    <p 
                        role="img"
                        onClick={() => setSelectedLocation(result)}
                        className="cursor-pointer text-2xl animate-bounce"
                        aria-label="push-pin"
                    >🏠</p>

                </Marker>

                {/*the popup when marker cliked*/}
                {selectedLocation.long === result.long ? (
                    <Popup
                        onClose={() => setSelectedLocation({})}
                        closeOnClick={true}
                        latitude={result.lat}
                        longitude={result.long}
                    >
                        {result.title}
                    </Popup>
                ) : (
                    false
                )}
            </div>
        ))}

    </ReactMapGL>;
}

export default Map;
