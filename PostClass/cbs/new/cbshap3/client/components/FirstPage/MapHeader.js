import React, { useEffect } from "react";
import * as BS from "react-bootstrap";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Parallax, Background } from "react-parallax";
import Aos from "aos";

const MapHeader = () => {
  useEffect(() => {
    Aos.init({});
  }, []);

  return (
    <div className="desc">
      <BS.Container>
        <Box
          sx={{
            pb: 5,
            display: "flex",
            justifyContent: "center",
            borderRadius: "15px",
          }}
        >
          <BS.Row>
            <BS.Col sm={7} xs={7}>
              <div data-aos="fade-left" data-aos-duration="1000">
                <Container sx={{ mt: 5, pl: 21, justifyContent: "center" }}>
                  <Box
                    // variant="h3"
                    // className="white-background"
                    sx={{ p: 3, justifyContent: "center" }}
                  >
                    {" "}
                    <Typography component={"span"}>
                      <h1 className="fontbold">Partner Locations</h1>
                      <br />
                      <br />
                      <h4 className="font">
                        As our expansion continues outside of Lower Manhattan,
                        we are still committed to the highest levels of service.
                        If you are outside of our current partner boundries, we
                        may still be interested in seeing working with you.
                      </h4>
                      <br />
                    </Typography>
                  </Box>
                </Container>
              </div>
            </BS.Col>
            <BS.Col sm={5}>
            <Box
                    // variant="h3"
                    // className="white-background"
                    sx={{ pl: 13, justifyContent: "center" }}
                  >
              <div data-aos="fade-right" data-aos-duration="1000">
                <img src="/moneymove.png" height={230} />
              </div>
              </Box>
            </BS.Col>
          </BS.Row>
        </Box>
      </BS.Container>
    </div>
  );
};
export default MapHeader;
