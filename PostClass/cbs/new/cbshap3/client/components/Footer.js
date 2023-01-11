import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

function Copyright() {
  return (
    <>
      {"© "}
      {/* <Link color="inherit" href="https://mui.com/"> */}
      CBS Happenings {/* </Link>{' '} */}
      {new Date().getFullYear()}
    </>
  );
}

export const Footer = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  });

  return (
    <div className="white">
      <Box>
        <Typography
          component="footer"
          sx={{
            display: "flex",
          }}
        >
          <Container sx={{ mt: 7, mb: 7, display: "flex" }}>
            <Grid container spacing={5}>
              <Grid item xs={6} sm={4} md={3}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  spacing={2}
                  sx={{ height: 120 }}
                >
                  <Grid item xs={6} sx={{ ml: 4 }}>
                    <Copyright />
                    <Box sx={{ mt: 2 }}>
                      <Box> 665 W130th St </Box>
                      <Box>New York, New York 10027 </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Typography
                  component={"span"}
                  variant="h6"
                  marked="left"
                  gutterBottom
                >
                  Navigate
                </Typography>
                <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
                  <Box>
                    {location.pathname === "/" ? (
                   <a href="#"> Return to Top</a>
                    ) : (
                      <Link to="/" style={{ textDecoration: "none" }}>
                        Return Home
                      </Link>
                    )}
                  </Box>

                  <Link
                    to="/Blog"
                    style={{ textDecoration: "none"}}
                  >
                    Contact Us
                  </Link>

                  <Link to={"/login"}>
                    <Box>Log In</Box>
                  </Link>
                </Box>
              </Grid>
              <Box sx={{ pt: 5, pl: 3 }}>
                <img src="/logolong.png" height={120} />
              </Box>
              <Grid item>
                <Typography variant="caption">
                  {" "}
                  A Money Green Production
                </Typography>

                {/* })} */}
              </Grid>
            </Grid>
          </Container>
        </Typography>
      </Box>
    </div>
  );
};
export default Footer;
