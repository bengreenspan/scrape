import React from "react";
import * as BS from "react-bootstrap";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
// import "aos/dist/aos.css"
import Za from "./CustomerComp/Za";
// import CBS from "./CBS";
import Aos from "aos";
import { Link } from "react-router-dom";
import { Parallax, Background } from "react-parallax";

const link = "https://cbsstartupsweek2022.splashthat.com/";

const CBS = () => {
  return (
    <div className="flex">
      <Parallax bgImage={"./startups.png"} strength={200}>
        <a target="_blank" href={link}>
          <div className="container1">
            <img src="/startups.png" alt="Mc" className="image1" />
            <div className="middle1">
              <div className="text1">Click Here</div>
            </div>
          </div>
        </a>
      </Parallax>
    </div>
  );
};

const Customers = () => {
  return (
    <BS.Container>
      <Box
        sx={{
          pt: 20,
          pb: 15,
          display: "flex",
          justifyContent: "center",
          borderRadius: "15px",
        }}
      >
        <BS.Row>
          <BS.Col sm={9} xs={10} lg={6}>
            <div data-aos="fade-left" data-aos-duration="1000">
              <Container
                sx={{ mt: 0, pl: 20, pr: 10, justifyContent: "center" }}
              >
                <Box
                  // variant="h3"
                  // className="white-background"
                  sx={{ justifyContent: "center" }}
                >
                  {" "}
                  <Typography component={"span"} sx={{ mt: 5, pb: 5 }}>
                    <h1 className="fontbold">Featured Event</h1>
                    <br />
                  </Typography>
                  {/* <Typography component={"span"} sx={{ pr: 210}}> */}
                  <img src="/one2.png" alt="one" width="250" height="225" />
                  {/* </Typography> */}
                  <br />
                  <br />
                  <br />
                  <br />
                  <Typography component={"span"} sx={{ mt: 10, pb: 0 }}>
                    <h4 className="font">
                      CBS Startups Week is a week-long event on Nov 14-17,
                      celebrating entrepreneurship and innovation. Loaded with
                      panels, and talks by CBS founders and funders. Click{" "}
                      <a href={link}>here </a>
                      to learn more.
                    </h4>
                  </Typography>
                  <br />
                  <br />
                  <br />
                </Box>
              </Container>
            </div>
          </BS.Col>
          <BS.Col lg={1} sm={1} xs={3}></BS.Col>
          <BS.Col lg={5} sm={6} xs={6}>
            <div data-aos="fade-left" data-aos-duration="1000">
              <Container sx={{ justifyContent: "center" }}>
                <Box
                  // variant="h3"
                  // className="white-background"
                  sx={{ justifyContent: "center" }}
                >
                  {" "}
                  <div data-aos="fade-left">
                    <Typography component={"span"} sx={{ mt: 5, pb: 5 }}>
                      <h1 className="fontbold">11/14 - 11/17 </h1>
                      <br />
                      <h1 className="font">CBS Startups Week</h1>
                      <br />
                    </Typography>
                    <CBS />
                  </div>
                </Box>
              </Container>
            </div>
          </BS.Col>
        </BS.Row>
      </Box>
    </BS.Container>
  );
};
export default Customers;

// <div className="fontbold">Sample Partners</div>
// <br />
// <h2 className="font1">
//   Check out a few of our partners. These types of businesses
//   models lend themselves to synergies with their ATM
//   solution.
//   </h2>
