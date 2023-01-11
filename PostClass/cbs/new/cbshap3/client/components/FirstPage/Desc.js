import React, { useEffect } from "react";
import * as BS from "react-bootstrap";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Parallax, Background } from "react-parallax";
import Aos from "aos";

const Desc = () => {
  useEffect(() => {
    Aos.init({});
  }, []);

  return (
    <div className="desc">
      <BS.Container>
        <Box
          sx={{
            pt: 30,
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
                <Parallax bgImage={"/hysoun1.png"} strength={-150}>
                  <div className="transparent">
                    {" "}
                    <img src="/hysoun2.png" height={630} />
                  </div>
                </Parallax>
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
                      <h1 className="fontbold">
                      Interested in contributing?
                      </h1>
                      <br />
                      <br />
                      <div className="font">
                        A flawlessly installed ATM can provide seamless customer
                        convience for cash transactions as well as provide
                        supplementary income to the business
                      </div>
                      <br />
                      <div className="font">
                        {" "}
                        For a small business in the NYC area, GSNC can provide a
                        full service ATM for your customers. Our industry
                        experts can create custom ATM services for any small
                        business.
                      </div>
                      <br />
                      <br />
                      <br />
                      <Link to="/Blog">
                        <button> Click Here to Start</button>
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
  );
};
export default Desc;
