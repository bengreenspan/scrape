import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Parallax, Background } from "react-parallax";
import Carousel from "react-elastic-carousel";
import Aos from "aos";

const Carousely = () => {
  // const carouselRef = useRef(null);
  // let resetTimeout;
  return (
    <Container sx={{ pt: 10 }}>
            <Typography
        component={"span"}
        variant="h5"
        sx={{
          pt: 10,
          pl: 10,
          
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          className="fontbold"
        >
Did we miss an event? Interested in getting your event on the site? Email us at Events@cbshappenings.com
        </div>
        {/* </Typography> */}
      </Typography>
      <Box       sx={{
          pb: 10,
          pl: 10,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}> 

<div
          data-aos="flip-down"
          data-aos-duration="1000"
          className="fontbold"
        >
      <img src="/5star.png" alt="one" width="300" height="225" />
      </div>
      </Box>


      {/* <Container sx={{ mt: 4 }}>
        <div
        data-aos="fade-left"
          data-aos-duration="1000"
        >
          <Carousel
            itemsToShow={1}
            itemsToScroll={1}
            enableAutoPlay
            autoPlaySpeed={5000}
            focusOnSelect={true}
            infinite
            ref={carouselRef}
            onNextEnd={({ index }) => {
              clearTimeout(resetTimeout);
              if (index + 1 === 6) {
                resetTimeout = setTimeout(() => {
                  carouselRef.current.goTo(0);
                }, 5000); // same time
              }
            }}
          >
            <Box
              sx={{
                // pr: 5,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <h5>
                <Typography
                  component={"span"}
                  // sx={{ pl: 10, pt: 3, pb: 3, pr: 8 }}
                >
                  <p>
                    “I couldn’t believe how fast and easy installation was with
                    these guys.”
                  </p>
                  <br />
                  <br />
                  <h5>-Julian V.</h5>
                </Typography>
              </h5>
            </Box>

            <Box
              sx={{
                // pr: 5,
                // justifyContent: "center",
                // alignItems: "center",
                borderRadius: 5,
              }}
            >
              <h5>
                <Typography
                  component={"span"}
                  // sx={{ pl: 10, pt: 3, pb: 3, pr: 8 }}
                >
                  <p>
                    “They service it once every few days, I do not think it has
                    even gotten close to malfunctioning or running empty.”
                  </p>
                  <br />
                  <br />
                  <h5>-Shoon R.</h5>
                </Typography>
              </h5>
            </Box>
            <Box
              sx={{
                pr: 5,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <div>
                <Typography
                  component={"span"}
                  // sx={{ pl: 10, pt: 3, pb: 3, pr: 18 }}
                >
                  <p>
                    “GSNC supplies the paperwork monthly and are professional in
                    communicating”
                  </p>
                  <br />
                  <br />
                  <h5>-Conor W.</h5>
                </Typography>
              </div>
            </Box>

            <Box
              sx={{
                pr: 10,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <h5>
                <Typography
                  component={"span"}
                  // sx={{ pl: 10, pt: 3, pb: 3, pr: 8 }}
                >
                  <p>
                    “Running an all cash business has never been easier. Plus I
                    get a cut of the action.”
                  </p>
                  <br />
                  <br />
                  <h5>-Janet L.</h5>
                </Typography>
              </h5>
            </Box>
            <Box
              sx={{
                pr: 10,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <h5>
                <Typography
                  component={"span"}
                  // sx={{ pl: 10, pt: 3, pb: 3, pr: 3 }}
                >
                  <p>"Kind, caring and punctual"</p>
                  <br />
                  <br />
                  <h5>-Lee C.</h5>
                </Typography>
              </h5>
            </Box>

            <Box
              sx={{
                pr: 10,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <h5>
                <Typography
                  component={"span"}
                  // sx={{ pl: 10, pt: 3, pb: 3, pr: 3 }}
                >
                  <p>“I have my business, and they take care of the rest”</p>
                  <br />
                  <br />
                  <h5>-Alex G.</h5>
                </Typography>
              </h5>
            </Box>
          </Carousel>
        </div>
      </Container> */}
    </Container>
  );
};
export default Carousely;
