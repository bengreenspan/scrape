import React, { useRef, useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
// import theme from "../../theme";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";

const NavLinks = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const pages = ["Products", "Pricing", "Blog"];
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const dispatch = useDispatch();

  const navFull = "rgba(255, 255, 255, 1)";
  const navHalf = "rgba(0,0,255,0.3)";
  const navClear = "rgba(255, 255, 255, 0)";

  const navHorizontal = "row";
  const navVertical = "column";

  const [navBackground, setNavBackground] = useState(navClear);
  const [navPosition, setNavPosition] = useState(navVertical);

  // const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const navRef = useRef();
  navRef.current = navBackground;

  useEffect(() => {
    // const handleScroll = () => {
      if (window.innerWidth < 768) {
        setNavPosition(navVertical);
      } else {
        // setNavBackground(navClear);
        setNavPosition(navHorizontal);
        console.log("big")
      }
  }, []);

    // document.addEventListener("scroll", handleScroll);
    // return () => {
    //   document.removeEventListener("scroll", handleScroll);
    // };
  // }, []);







  return (
    <Container
      sx={{
        textDecoration: "none",
        display: "flex",
        flexDirection: navPosition,
      }}
    >
      {" "}
      {/* <Box sx={{ display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {page}
          </Button>
        ))}
      </Box> */}
      <MenuItem onClick={handleCloseNavMenu}>
        <Typography component={"span"} variant="h5" style={{ ml: 10 }}>
          <Link
            to="/#"
            //  sx={{
            //   display: { xs: 'block', md: 'none' },
            // }}

            style={{
              textDecoration: "none",
              color: "black",
              display: "flex",
            }}
          >
            {" "}
            Home
          </Link>
        </Typography>
      </MenuItem>
      {/* <MenuItem onClick={handleCloseNavMenu}>
        <Typography component={"span"} variant="h5">
          <Link to="/blog" style={{ textDecoration: "none", color: "black" }}>
            Events
          </Link>
        </Typography>
      </MenuItem> */}
      {/* <MenuItem onClick={handleCloseNavMenu}>
        <Typography component={"span"} variant="h5">
          <Link
            to="/assignments"
            style={{ textDecoration: "none", color: "black" }}
          >
            School
          </Link>
        </Typography>
      </MenuItem> */}
      <MenuItem onClick={handleCloseNavMenu}>
        <Typography component={"span"} variant="h5">
          <Link to="/tips" style={{ textDecoration: "none", color: "black" }}>
            Tips
          </Link>
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleCloseNavMenu}>
        <Typography component={"span"} variant="h5">
          <Link to="/who" style={{ textDecoration: "none", color: "black" }}>
            About
          </Link>
        </Typography>
      </MenuItem>
      {/* <MenuItem onClick={handleCloseNavMenu}>
        <Typography component={"span"} variant="h5">
          <Link to="/clubs" style={{ textDecoration: "none", color: "black" }}>
            Clubs
          </Link>
        </Typography>
      </MenuItem> */}
      {/* <Box sx={{ display:
         "flex", justifyContent: "right" }}> */}
      {/* </Box> */}
    </Container>
  );
};

export default NavLinks;

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
//           {/* <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: "none", md: "flex" },
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             LOGO
//           </Typography> */}

//           <Box >
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: "block", md: "none" },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography>{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href=""
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             LOGO
//           </Typography>

//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: "45px" }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography >{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };
// export default ResponsiveAppBar;
