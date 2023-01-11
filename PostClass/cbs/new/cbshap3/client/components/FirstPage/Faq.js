import React from "react";
import * as BS from "react-bootstrap";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import Aos from "aos";

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container sx={{ pl: -10, pr: 0, pt:10 }}>
      <div className="desc">
        <BS.Container>
          <Box
            sx={{
              pt: 5,
              pb: 5,
              display: "flex",
              justifyContent: "center",
              borderRadius: "15px",
            }}
          >
            <BS.Row>
              <BS.Col  md={3} sm={3}>
                <div 
                data-aos="fade-up-right" data-aos-duration="1000"
                >
                  <Container sx={{ mt: 0, pl: 0, mr:9, mb:20, justifyContent: "center" }}>
                    <Box
                      variant="h3"
                      // className="white-background"
                      sx={{ p: 0, justifyContent: "center" }}
                    >
                      {" "}
                      <Typography variant="h2" component="h2" sx={{ pb: 5, pt:10 }}>
                        <div className="fontbold">FAQs</div>
                      </Typography>
                    </Box>
                  </Container>
                </div>
              </BS.Col>

              <BS.Col md={6}>
                <Box sx={{ pb: 10, pt: 5 }}>
                <div
                data-aos="fade-up" data-aos-duration="1000"
                >
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                    sx={{ background: "white" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography component={'span'}  sx={{ width: "78%", flexShrink: 0 }}>
                        <div className="fontbold">
                    What is this website?
                        </div>
                      </Typography>

                      {/* <Typography component={'span'} sx={{ color: "text.secondary" }}>
                        <div className="font">Two Choices</div>
                      </Typography> */}
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={'span'} >
                        <Divider sx={{ mb: 3, p: 0 }} />
                        <div className="font">
                   We wanted to put together resources for Columbia Business School students to maximize their experience at school. This includes keeping everyone up to date on events, deadlines and other happenings you might have otherwised missed.
                          <br />
                      We hope this website helps 
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel2"}
                    onChange={handleChange("panel2")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >
                      <Typography component={'span'}  sx={{ width: "100%", flexShrink: 0 }}>
                        <div className="fontbold">
                  Can I help?
                        </div>
                      </Typography>
                      <Typography component={'span'}  sx={{ color: "text.secondary" }}></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={'span'} >
                        <Divider sx={{ mb: 3, p: 0 }} />
                        <div className="font">
                         Heck ya you can. Click on the form above to reach out.
                         We could always use more coders and event scouts. 
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    expanded={expanded === "panel6"}
                    onChange={handleChange("panel6")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel6bh-content"
                      id="panel2bh-header"
                    >
                      <Typography component={'span'} sx={{ width: "100%", flexShrink: 0 }}>
                        <div className="fontbold">
                        How often is the site updated?
                      
                        </div>
                      </Typography>
                      <Typography component={'span'} sx={{ color: "text.secondary" }}></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={'span'} >
                        <Divider sx={{ mb: 3, p: 0 }} />
                        <div className="font">
                      We try to update at least once a week for the weekly calendar.
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    expanded={expanded === "panel4"}
                    onChange={handleChange("panel4")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                    >
                      <Typography component={'span'}  sx={{ width: "100%", flexShrink: 0 }}>
                        <div className="fontbold">
               I go a different school. Can you show me my events?
                        </div>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={'span'} >
                        <Divider sx={{ mb: 3, p: 0 }} />
                        <div className="font">
                        We are only doing CBS for now. If there is an event so large we deem it might be important for CBS students to know we will put it on the site. 
                        </div>
                      </Typography>
                    </AccordionDetails>
                
                  </Accordion>
                  </div>
                </Box>
              </BS.Col>
              <BS.Col md={2}>
              <Box sx={{ pb: 10, pt: 8, pl:0 }}>
              <div 
              data-aos="fade-up-left" data-aos-duration="1000"
              >
              <img src="/lightout.svg" height={150} width={150} />
              </div>
           </Box>
              </BS.Col>
            </BS.Row>
          </Box>
        </BS.Container>
      </div>
    </Container>
  );
}
