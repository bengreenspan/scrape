import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Form from "./FirstPage/Form";
import { Link } from "react-router-dom";
import Aos from "aos";
import * as BS from "react-bootstrap";
import { send } from "emailjs-com";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Parallax, Background } from "react-parallax";
import { Divider } from "@mui/material";
// import "aos/dist/aos.css"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShad0w: 24,
  p: 4,
};

const Tips = () => {
  useEffect(() => {
    Aos.init({});
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false) && window.location.reload;

  const [toSend, setToSend] = useState({
    business: "",
    email: "",
    name: "",
    phone: "",
    message: "",
    reply_to: "",
  });

  const [errors, setErrors] = useState({
    business: "",
    email: "",
    name: "",
    phone: "",
    message: "",
    reply_to: "",
  });

  const validate = () => {
    let temp = {};
    temp.name = toSend.name ? "" : "Name is required";
    // temp.business = toSend.business ? "" : "Business Name is required";
    temp.email = /$^|.+@.+..+/.test(toSend.email) ? "" : "Email is not valid";
    // temp.phone =
    // toSend.phone.length > 8 ? "" : "Please enter a valid phone number";
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const resetForm = () => {
    window.location.reload();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setOpen(true);
      send("service_0t74imh", "template_q1ecudp", toSend, "87uW5IjR7xE2EqVKU")
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text);
        })
        .catch((err) => {
          console.log("FAILED...", err);
        });
    }
  };

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  return (
    <BS.Container>
      <Container sx={{ pt: 20 }}>
        <Box
          sx={{
            pt: 3,
            pl: 3,
            pr: 3,
            pb: 3,

            display: "flex",
            justifyContent: "left",
          }}
        >
          <div className="fontbold">
            <Typography
              variant="h3"
              // className="white-background"
              sx={{
                pt: 3,
                pl: 3,
                pr: 3,
                pb: 3,
                justifyContent: "center",
              }}
            >
              <BS.Row>
                <BS.Col lg={8} md={8} sm={10} xs={10}>
                  <div
                    className="fontbold"
                    data-aos="fade-right"
                    data-aos-duration="1500"
                  >
                    Tips for Columbia Business School
                    <h4>
                      In an effort to help you get the most out of your time at
                      Columbia, we put together a list of resources available to
                      you as a student.
                    </h4>
                    <h4>
                      If there is anything you'd like to tell your classmates,
                      please fill out the form below!
                    </h4>
                    <br />
                  </div>
                </BS.Col>
                <BS.Col lg={4} md={6} sm={10} xs={10}>
                  <Box
                    sx={{
                      // pt: 3,
                      pl: 3,
                      pr: 3,
                      pb: 3,
                      justifyContent: "center",
                    }}
                  >
                    <div data-aos="fade-left" data-aos-duration="1500">
                      <img src="faq3.png" height={160} alt="Tips" />
                    </div>
                  </Box>
                </BS.Col>
              </BS.Row>
              <Box
                sx={{
                  pb: 10,
                }}
              ></Box>
              <BS.Row>
                <BS.Col lg={4} md={6} sm={10} xs={10}>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="500"
                    className="fontbold"
                  >
                    Gym + Shower
                    <br />
                    <div>
                      <h4>
                        {" "}
                        In the tunnel between Kravis and Geffen there is a small
                        gym as well as showers available for use{" "}
                      </h4>
                    </div>
                  </div>
                </BS.Col>

                <BS.Col lg={4} md={6} sm={10} xs={10}>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="750"
                    // data-aos-offset="200"
                    className="fontbold"
                  >
                    <div className="links">
                      <a
                        target="_blank"
                        href="https://artsinitiative.columbia.edu/?mc_cid=f866adffcb&mc_eid=8280e1c030"
                      >
                        {" "}
                        Arts Initiative
                      </a>
                      <h4>
                        {" "}
                        Early access to discounted ticket sales for musicals,
                        theater, ballet, art shows etc and updates on
                        interesting cultural events.
                      </h4>
                    </div>
                  </div>
                </BS.Col>
                <BS.Col lg={4} md={6} sm={10} xs={10}>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    // data-aos-offset="300"
                    className="fontbold"
                  >
                    <div className="links">
                      <a
                        target="_blank"
                        href="https://www.cuit.columbia.edu/aws"
                      >
                        AWS Credits
                      </a>
                      <h4>
                        {" "}
                        The Lang Center connected with AWS to give every student
                        up to $5,000 in AWS credits for their ventures.{" "}
                      </h4>
                    </div>
                    <br />
                    <br />
                  </div>
                </BS.Col>
              </BS.Row>
              <BS.Row>
                <BS.Col lg={4} md={6} sm={10} xs={10}>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="1250"
                    // data-aos-offset="300"
                    className="fontbold"
                  >
                    Jake's Dilemma Happy Hour
                    <div>
                      <div className="links"></div>
                      <h4>
                        {" "}
                        Most Wednesdays, the Rugby Club has a mixer with another
                        club at Jake's Dilemma. Open bar and everyone is
                        invited!{" "}
                      </h4>
                    </div>
                    <br />
                    <br />
                  </div>
                </BS.Col>
                <BS.Col lg={4} md={6} sm={10} xs={10}>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="1500"
                    // data-aos-offset="300"
                    className="fontbold"
                  >
                    <div className="links">
                      <a
                        target="_blank"
                        href="https://seats.library.columbia.edu/reserve/spaces/business-group-study"
                      >
                        Booking Rooms in Uris
                      </a>
                    </div>
                    <div>
                      <h4>
                        {" "}
                        Watson Library in Uris has study rooms similar to Kravis
                        and Geffen. Reserve them if the Manhattanville Campus is
                        fully booked.
                      </h4>
                    </div>
                    <br />
                    <br />
                  </div>

                  <br />
                </BS.Col>

                <BS.Col lg={4} md={6} sm={10} xs={10}>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="1750"
                    // data-aos-offset="200"
                    className="fontbold"
                  >
                    Extra Class Credits
                    <h4>
                      {" "}
                      Columbia Business School students must take 60 credits of
                      classwork to graduate. Up to six credits can be cross
                      registered from other schools. Additionally you can take
                      up to nine more credits before you graduaten without
                      charge! free.
                    </h4>
                  </div>
                </BS.Col>
              </BS.Row>
              <BS.Row>
                <BS.Col lg={4} md={6} sm={10} xs={10}>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="500"
                    // data-aos-offset="200"
                    className="fontbold"
                  >
                    <div className="links">
                      <a
                        target="_blank"
                        href="https://www8.gsb.columbia.edu/emba-students/academic-essentials/policies/auditing"
                      >
                        Auditing Classes
                      </a>
                      <div>
                        <h4>
                          You can audit any class, even after you graduate, in
                          any school, as long as you get the instructors
                          permission. You will get access to course materials
                          and show up as frequently as you would like. The exact
                          terms of your participation will depends on the
                          agreement you make with the professor. There will be
                          no offical record of taking a class on your
                          transcript.
                        </h4>
                      </div>
                    </div>
                    <br />
                  </div>
                </BS.Col>
                <BS.Col lg={4} md={6} sm={10} xs={10}>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="700"
                    // data-aos-offset="200"
                    className="fontbold"
                  >
                    <div className="links">
                      <a
                        target="_blank"
                        href="https://transportation.columbia.edu/content/bike-registration"
                      >
                        Indoor Bike Storage
                      </a>
                    </div>
                    {/* <h4>20 person limit</h4> */}
                    <h4>
                      Attatched to Geffen on the north side of the building
                      there is an indoor bike room. You will need to register
                      your bike with Public Safety to get swipe access.
                      <br /> <br /> Visit or contact Columbia Public Safety by
                      phone at 212-854-8513 or email
                      ps-crimeprevention@columbia.edu to set up an appointment
                      to have your bicycle registered.
                    </h4>
                  </div>
                  <br />
                </BS.Col>

                <BS.Col lg={4} md={6} sm={10} xs={10}>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="700"
                    // data-aos-offset="200"
                    className="fontbold"
                  >
                    <div className="links">
                      <a
                        target="_blank"
                        href="https://blogs.cul.columbia.edu/spotlights/category/new-e-resources/"
                      >
                        News Services
                      </a>
                      <h4>
                        {" "}
                        Access popular financial news sources through Columbia’s
                        university library with your student credentials for
                        free.
                        <br />
                        Click below to access each publication.
                      </h4>

                      <div className="links">
                        <a
                          target="_blank"
                          href="https://blogs.cul.columbia.edu/spotlights/2021/09/21/new-york-times-access/"
                        >
                          <h4>New York Times </h4>
                        </a>
                      </div>
                      <a
                        target="_blank"
                        href="https://blogs.cul.columbia.edu/spotlights/2022/01/28/wall-street-journal-access/"
                      >
                        <div className="links">
                          <h4>Wall Street Journal</h4>
                        </div>
                      </a>
                      <a
                        target="_blank"
                        href="https://blogs.cul.columbia.edu/business/2015/01/28/new-resource-financial-times-ft-com/"
                      >
                        <div className="links">
                          <h4>Financial Times</h4>
                        </div>
                      </a>
                    </div>
                  </div>
                </BS.Col>
              </BS.Row>

              <BS.Row>
                <BS.Col lg={4} md={6} sm={10} xs={10}>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="500"
                    // data-aos-offset="200"
                    className="fontbold"
                  >
                    <div className="links">
                      <a
                        target="_blank"
                        href="https://www8.gsb.columbia.edu/caseworks/about"
                      >
                        Additional Published Cases
                      </a>
                      <div>
                        <h4>
                          Students have access to the full repository of
                          published cases in the Columbia eco system. All
                          material is closely tied to and based on the research
                          and expertise of Columbia’s faculty.
                        </h4>
                      </div>
                    </div>
                    <br />
                  </div>
                </BS.Col>
                <BS.Col lg={4} md={6} sm={10} xs={10}></BS.Col>

                <BS.Col lg={4} md={6} sm={10} xs={10}></BS.Col>
              </BS.Row>
            </Typography>
          </div>
        </Box>
      </Container>
      <Divider sx={{ mb: 10, p: 0 }} />
      <div className="graycard" data-aos="zoom-in" data-aos-duration="1000">
        <BS.Container>
          <Container className="form" sx={{ pt: 0 }}>
            <BS.Row>
              <BS.Col md={4}>
                <Typography>
                  <Typography
                    variant="h4"
                    // className="white-background"
                    sx={{
                      pt: 0,
                      pl: 0,
                      pr: 0,
                      pb: 10,
                      justifyContent: "center",
                    }}
                  >
                    <div className="fontbold">
                      Anything you would like to add? Let us know.
                    </div>
                  </Typography>
                </Typography>
                <div data-aos="fade-up-right" data-aos-duration="1500">
                  <img src="rocket.svg" height={160} alt="Tips" />
                </div>
                <Box
                  sx={{
                    pt: 0,
                    pl: 0,
                    pr: 0,
                    pb: 10,
                    // justifyContent: "center",
                  }}
                ></Box>
              </BS.Col>
              <BS.Col md={8}>
                <div>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { m: 1, width: "25ch" },
                    }}
                    autoComplete="off"
                    onSubmit={onSubmit}
                  >
                    <Container>
                      <Box
                        className="font"
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <TextField
                          required
                          id="outlined-name-input"
                          label="Name"
                          type="name"
                          autoComplete="name"
                          value={toSend.name}
                          onChange={handleChange}
                          name="name"
                          helperText={errors.name}
                        />
                        <TextField
                          required
                          id="outlined-email-input"
                          label="Email"
                          type="email"
                          autoComplete="email"
                          value={toSend.email}
                          onChange={handleChange}
                          name="email"
                          helperText={errors.email}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          "& > :not(style)": { m: 0 },
                        }}
                      ></Box>

                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <TextField
                          id="outlined-message-input"
                          label="Tip"
                          type="message"
                          autoComplete="message"
                          value={toSend.message}
                          onChange={handleChange}
                          name="message"
                          multiline={true}
                          rows={3}
                          sx={{ height: "100%", width: 10, fontSize: 33 }}
                          //   helperText="Enter any other details you'd like to mention"
                        ></TextField>
                      </Box>
                    </Container>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        pt: 8,
                        pb: 32,
                      }}
                    >
                      <div data-aos="zoom-out" data-aos-duration="2000">
                        <button>
                          <div className="svg-wrapper-1">
                            <div className="svg-wrapper">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                              >
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path
                                  fill="currentColor"
                                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <span>Submit</span>
                        </button>

                        <Modal
                          aria-labelledby="transition-modal-title"
                          aria-describedby="transition-modal-description"
                          open={open}
                          onClose={resetForm}
                          closeAfterTransition
                          BackdropComponent={Backdrop}
                          BackdropProps={{
                            timeout: 500,
                          }}
                        >
                          <Fade in={open}>
                            <Box sx={style}>
                              <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                              >
                                Thanks for submitting your details
                              </Typography>
                              <Typography
                                id="transition-modal-description"
                                sx={{ mt: 2 }}
                              >
                                Thank you for your input!
                              </Typography>
                            </Box>
                          </Fade>
                        </Modal>
                      </div>
                    </Box>
                  </Box>
                </div>
              </BS.Col>
            </BS.Row>
          </Container>
        </BS.Container>
      </div>
    </BS.Container>
  );
};
export default Tips;
