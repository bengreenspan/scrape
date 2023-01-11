import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Contact = () => {
  const [value, setValue] = useState("GSNC@LLC.com");
  const [copied, setCopied] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Container sx={{ pt: 20, pb:20}}>
      <div className="contact">
        <div className="font" data-aos="flip-down" data-aos-duration="1000">
          <Box sx={{ display: "flex", justifyContent: "center", pb: 3 }}>
            <Typography component={"span"} variant="h4" marginTop={3}>
            <Link to="/blog">
              {/* <button to="/Blog" >Go To Happenings</button> */}
              </Link>
            </Typography>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography component="h2" id="modal-modal-title" variant="h6">
                To fill out an ATM form:
                <br />
                <Link to={"/Blog#"}>Click here</Link> <br />
                or <br />
                Email us at: GSNC@GSNCLLC.com
              </Typography>
              <Typography
                component={"span"}
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
                  <Button>Copy email to clipboard</Button>
                </CopyToClipboard>

                {copied ? (
                  <span style={{ color: "black", background: "white" }}>
                    <br />
                    Email succesfully copied.
                  </span>
                ) : null}
              </Typography>
            </Box>
          </Modal>
          <Box sx={{ display: "flex", justifyContent: "space-evenly", pb: 6 }}>
            <Typography
              component={"span"}
              variant="h6"
              sx={{ display: "flex", justifyContent: "space-evenly", pb: 6 }}
            ></Typography>
          </Box>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
