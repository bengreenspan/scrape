import React, { useEffect, useState } from "react";
import * as BS from "react-bootstrap";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Divider } from "@mui/material";
import Aos from "aos";

const Who = () => {
  useEffect(() => {
    Aos.init({});
  }, []);

  return (
    <BS.Container>
      <div>
        <Box sx={{ pt: 20, pb: 10, display: "flex", justifyContent: "center" }}>
          <Typography component="h1" variant="h2">
            <div
              className="fontbold"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              Meet the team
            </div>
          </Typography>
        </Box>
        <Box
          sx={{
            pt: 5,
            pb: 20,
            display: "flex",
            justifyContent: "center",
            borderRadius: "15px",
          }}
        >
          <div>
            <div>
              <Container sx={{ mt: 5, mb: 10, justifyContent: "center" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <BS.Row>
                    <BS.Col lg={6} md={7} sm={8} xs={10}>
                      <div data-aos="fade-right" data-aos-duration="1000">
                        <img src="/cbsoverhead.webp" width="400" height="300" />{" "}
                      </div>
                      <Box sx={{ mb: 10 }}></Box>
                    </BS.Col>
                    <br />
                    <BS.Col lg={6} md={7} sm={8} xs={10}>
                      <Typography align="right">
                        <h5 className="font">
                          <div data-aos="fade-left" data-aos-duration="1000">
                            Haas '24 and Ben '24 are two Columbia EMBA students
                            dedicated to finding useful and relevant information
                            for Columbia Business School students.
                            <br />
                            <br />
                            Our mission is to aggregate and link to CBS events
                            in one convenient place. This includes speakers,
                            club events, as well as school run activities, along
                            witht the occasional non CBS event.
                          </div>
                        </h5>
                      </Typography>
                    </BS.Col>
                  </BS.Row>
                  <br />
                  <br />
                  <br />
                </Box>
              </Container>
            </div>
            <Divider sx={{ m: 10, mt: 20 }} />

            {/* </BS.Col> */}
            <BS.Row>
              <BS.Col sm={6} xs={12}>
                <div data-aos="fade-left" data-aos-duration="1000">
                  <Container sx={{ mt: 0, justifyContent: "center" }}>
                    <Box sx={{ p: 3, pt: 0, justifyContent: "center" }}>
                      <Box sx={{ pb: 8, justifyContent: "center" }}>
                        {" "}
                        <div>
                          <Typography
                            component={"span"}
                            variant="h4"
                            sx={{ pl: 5, pt: 0, pb: 4 }}
                          >
                            <img src="/promo.svg" height={130} />
                            <br />
                            <br />

                            <h2>
                              Haas Rahaman <br />
                              <div className="fontbold">
                                Chief Content Officer
                              </div>
                              <br />
                            </h2>
                            <h4>
                              Haas is looking to make the pivot from his current
                              roles as a healthcare administrator to a career in
                              real estate. A networker's networker, Haas
                              populates, keeps track, and attends
                              most events on the site.
                              <br />
                              <br />
                              Hrahman24@gsb.columbia.edu{" "}
                            </h4>
                          </Typography>
                        </div>
                        <br />
                      </Box>
                    </Box>
                  </Container>
                </div>
              </BS.Col>

              <BS.Col sm={6} xs={12}>
                <div data-aos="fade-right" data-aos-duration="1000">
                  <Container sx={{ mt: 0, justifyContent: "center" }}>
                    <Box sx={{ p: 3, pt: 0, justifyContent: "center" }}>
                      <Box sx={{ pb: 8, justifyContent: "center" }}>
                        {" "}
                        <div>
                          <div>
                            <Typography
                              component={"span"}
                              variant="h4"
                              sx={{ pl: 5, pt: 0, pb: 4 }}
                            >
                              {/* <h4>Ben</h4> */}
                              <img src="/ops.svg" height={130} /> <br />
                              <br />
                              <h2>
                                Ben Greenspan <br />
                                <div className="fontbold">Head Developer</div>
                              </h2>
                              <br />
                              <h4>
                                Currently a senior equity trader with a finance
                                background, Ben is looking to pursue a more
                                innovative and entrepenurial career.
                                <br />
                                <br />
                                Bgreenspan24@gsb.columbia.edu{" "}
                              </h4>
                            </Typography>
                          </div>
                        </div>
                        <br />
                      </Box>
                    </Box>
                  </Container>
                </div>
              </BS.Col>
            </BS.Row>
          </div>
        </Box>
      </div>
    </BS.Container>
  );
};

export default Who;
