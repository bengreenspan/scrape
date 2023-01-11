import React, { useMemo } from "react";
import * as BS from "react-bootstrap";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  withScriptjs,
  withGoogleMap,
  useLoadScript,
} from "@react-google-maps/api";
import Aos from "aos";
import MapHeader from "./MapHeader";


// import "aos/dist/aos.css"

const Map = () => {
  const key = ["AIzaSyDifmaQTSJR0CKm", "7", "yniqQxCbB152sIAceQ"];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDifmaQTSJR0CKm7yniqQxCbB152sIAceQ",
  });

  const center = useMemo(() => ({ lat: 40.7412358, lng: -73.9988867 }), []);

  if (!isLoaded) {
    return <div>loading...</div>;
  } else {
    return (
      <div className="desc">

        <BS.Container>
          <Box
            sx={{
              pt: 10,
              pb: 5,
              pl: 0,
              display: "flex",
              justifyContent: "center",
              borderRadius: "15px",
            }}
          >
            <BS.Row>
              <BS.Col >
              <MapHeader/>

              </BS.Col>

                      <section>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            // pl: 10,
                          }}
                        >
                          <div>
                            {" "}
                            <GoogleMap
                              zoom={13}
                              center={center}
                              mapContainerClassName="map-container"
                            >
                              <Marker
                                position={{ lat: 40.7507647, lng: -73.9826266 }}
                              />
                              <Marker
                                position={{ lat: 40.7641359, lng: -73.9904049 }}
                              />
                              <Marker
                                position={{ lat: 40.7607937, lng: -73.9717539 }}
                              />
                              <Marker
                                position={{ lat: 40.7630212, lng: -73.9790517 }}
                              />
                              <Marker
                                position={{ lat: 40.7440062, lng: -73.9994829 }}
                              />

                              <Marker
                                position={{ lat: 40.7207183, lng: -73.9978387 }}
                              />
                              <Marker
                                position={{ lat: 40.725128, lng: -73.996547 }}
                              />
                              <Marker
                                position={{ lat: 40.7439122, lng: -74.0327507 }}
                              />
                              <Marker
                                position={{ lat: 40.7285051, lng: -73.9911129 }}
                              />
                              <Marker
                                position={{ lat: 40.7288053, lng: -73.9818678 }}
                              />
                              <Marker
                                position={{ lat: 40.7279935, lng: -74.0024069 }}
                              />
                              <Marker
                                position={{ lat: 40.7207644, lng: -73.991498 }}
                                title={"granny"}
                              />
                              <Marker
                                position={{ lat: 40.720323, lng: -73.9915795 }}
                                icon={{
                                  scaledSize: new window.google.maps.Size(3, 3),
                                }}
                              />
                            </GoogleMap>
                          </div>
                        </Box>
                      </section>
                
           
             
            </BS.Row>
          </Box>
        </BS.Container>
      </div>
    );
  }
};

export default Map;
