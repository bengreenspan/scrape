import React, { useEffect, useState } from "react";
import * as BS from "react-bootstrap";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Aos from "aos";
// import 'aos/dist/aos.css;'
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";

const FirstContact = () => {
  useEffect(() => {
    Aos.init({});
  }, []);

  return (
    <div className="firstbutton ">
      <BS.Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "15px",
            pt: 20,
            pb: 30,
            pl: 0,
          }}
        >
          <BS.Row>
            <BS.Col lg={5} md={7} sm={7} xs={12}>
              <div data-aos="fade-up" data-aos-duration="2000">
                <Typography>
                  <Typography
                    variant="h5"
                    align="center"
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
                      Columbia Business School Happenings
                    </div>
                    <br />
                    <h4 className="font">
                      {" "}
                      Overloaded by everything happening at Columbia Business
                      School?
                      <br />
                      <br />
                      We here at CBS Happenings will try to consolidate and
                      accentuate the most prominent events so you can make the
                      most of your time here.
                    </h4>
                  </Typography>
                </Typography>
              </div>
            </BS.Col>

            <BS.Col lg={3} md={5} sm={5} xs={12}>
              <div data-aos="fade-up" data-aos-duration="2000">
                <Typography
                  align="center"
                  sx={{
                    pt: 9,
                    // pl: 3,
                    // pr: 3,
                    // pb: 3,
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    align="center"
                    className="white-background"
                    textDecoration="none"
                    sx={{
                      pt: 3,
                      // pl: 3,
                      // pr: 3,
                      pb: 3,
                      // justifyContent: "center",
                    }}
                  >
                    <div className="fontbold">Navigate:</div>

                    <h4 className="font">
                      {" "}
                      <div className="links">
                        <a className="font" href="#monday">
                          Monday
                        </a>
                        <br />
                        <a className="font" href="#tuesday">
                          Tuesday
                        </a>
                        <br />
                        <a className="font" href="#wednesday">
                          Wednesday
                        </a>
                        <br />
                        <a className="font" href="#thursday">
                          Thursday
                        </a>
                        <br />
                        <a className="font" href="#friday">
                          Friday
                        </a>
                      </div>
                    </h4>
                  </Typography>
                </Typography>
              </div>
            </BS.Col>
          </BS.Row>
        </Box>
      </BS.Container>
    </div>
  );
};

export default FirstContact;
