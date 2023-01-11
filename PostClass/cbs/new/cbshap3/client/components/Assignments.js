import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Form from "./FirstPage/Form";
import { Link } from "react-router-dom";
import Aos from "aos";
import * as BS from "react-bootstrap";

const Assignments = () => {
  useEffect(() => {
    Aos.init({});
  }, []);

  return (
    <BS.Container>
      <Container sx={{ pt: 20, pb: 10 }}>
        <Box sx={{ pt: 15, pb: 10, display: "flex", justifyContent: "center" }}>
          <Typography component="h1" variant="h2">
            <div
              className="fontbold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div>Week of 10/01/22</div>
            </div>
          </Typography>
        </Box>
        <Box
          sx={{
            pt: 3,
            pl: 3,
            pr: 3,
            pb: 0,

            display: "flex",
            justifyContent: "left",
          }}
        >
          <div
            className="fontbold"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <Typography
              variant="h3"
              className="white-background"
              sx={{
                pt: 3,
                pl: 3,
                pr: 3,
                pb: 3,
                justifyContent: "center",
              }}
            >
              <div className="fontbold">
                <h1>EMBA Saturday '24 homework:</h1>
              </div>
              <br />

              <div className="fontbold">
                <h1>Marketing:</h1>
                <div className="date">
                  <h2>No Class or HW this week</h2>
                </div>
                <Typography></Typography>
              </div>
              <br />

              <div className="fontbold">
                <h1>Corporate Finance:</h1>
                <div className="date">
                  <h2>TBA</h2>
                </div>
                <Typography></Typography>
              </div>

              <br />
              <div className="fontbold">
                <h1>Strategy:</h1>
                <div className="date">
                  <h2>Pepsi reading + poll due Saturday 8:00am (13 pages)</h2>
                  <h2>Disney reading + poll due Saturday 8:00am (17 pages)</h2>
                  <h2>
                    {" "}
                    Diversification and Corporate Scope reading (12 pages)
                  </h2>
                </div>
                <Typography></Typography>
              </div>
            </Typography>
          </div>
        </Box>
        <br /> <br /> <br />
        <Box
          sx={{
            pt: 3,
            pl: 3,
            pr: 3,
            pb: 3,
            // justifyContent: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="p"
            className="white-background"
            sx={{
              pt: 3,
              pl: 3,
              pr: 3,
              pb: 3,
              justifyContent: "left",
            }}
          >
            <div className="fontbold">
              {" "}
              Did I miss something?
              <br />
              Recommendations for the site?
              <br />
              <br />
              <Typography>
                <h4>Email us at</h4>
                <h4>Bgreenspan24@gsb.columbia.edu</h4>
              </Typography>
            </div>
          </Typography>
        </Box>
      </Container>
    </BS.Container>
  );
};

export default Assignments;
