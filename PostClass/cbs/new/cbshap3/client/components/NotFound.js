import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Form from "./FirstPage/Form";
import { Link } from "react-router-dom";
import Aos from "aos";
import * as BS from "react-bootstrap";

const NotFound = () => {
  useEffect(() => {
    Aos.init({});
  }, []);

  return (
    <div>
      <div className="desc">
        <BS.Container>
          <Box
            sx={{
              pt: 31,
              pb: 15,
              display: "flex",
              justifyContent: "center",
              borderRadius: "15px",
            }}
          >
            <BS.Row>
              <BS.Col sm={5}>
                <div
                data-aos="fade-right" data-aos-duration="1000"
                >
                  <img src="/NotFound.png" alt="Mc" />
                </div>
              </BS.Col>

              <BS.Col sm={7} xs={7}>
                <div
                data-aos="fade-left" data-aos-duration="1000"
                >
                  <Container sx={{ mt: 5, pl: 21, justifyContent: "center" }}>
                    <Box
                      // variant="h3"
                      // className="white-background"
                      sx={{ p: 3, justifyContent: "center" }}
                    >
                      {" "}
                      <Typography component={"span"}>
                        <h1 className="fontbold">Page Not Found!</h1>
                        <br />
                        <br />
                        <h1 className="font">To get back to a working page</h1>
                        <br />

                        <br />
                        <br />
                        <br />
                        <Link to="/">
                          <button> Click Here</button>
                        </Link>
                      </Typography>
                    </Box>
                  </Container>
                </div>
              </BS.Col>
            </BS.Row>
          </Box>
        </BS.Container>
      </div>
    </div>
  );
};

export default NotFound;
