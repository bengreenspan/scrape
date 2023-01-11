import React, { useRef, useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store";
// import { makeStyles } from "@mui/core/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import NavLinks from "./NavLinks";
// import theme from "../../theme";

const ResponsiveAppBar = () => {
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const select = useSelector((state) => state.auth.id);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutButton = () => {
    dispatch(logout());
  };

  const navZero = "rgba(255, 255, 255, 0)";
  const navOne = "rgba(255, 255, 255, .1)";
  const navTwo = "rgba(255, 255, 255, .2)";
  const navThree = "rgba(255, 255, 255, .3)";
  const navFour = "rgba(255, 255, 255, .4)";
  const navFive = "rgba(255, 255, 255, .5)";
  const navSix = "rgba(255, 255, 255, .6)";
  const navSeven = "rgba(255, 255, 255, .7)";
  const navEight = "rgba(255, 255, 255, .8)";
  const navNine = "rgba(255, 255, 255, .9)";
  const navTen = "rgba(255, 255, 255, 1)";

  const [navBackground, setNavBackground] = useState(navZero);

  const navRef = useRef();
  navRef.current = navBackground;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 360) {
        setNavBackground(navTen);
        handleCloseNavMenu();
      } else if (window.scrollY > 320 && window.scrollY <= 360) {
        setNavBackground(navNine);
      } else if (window.scrollY > 280 && window.scrollY <= 320) {
        setNavBackground(navEight);
      } else if (window.scrollY > 240 && window.scrollY <= 280) {
        setNavBackground(navSeven);
      } else if (window.scrollY > 200 && window.scrollY <= 240) {
        setNavBackground(navSix);
      } else if (window.scrollY > 160 && window.scrollY <= 200) {
        setNavBackground(navFive);
      } else if (window.scrollY > 120 && window.scrollY <= 160) {
        setNavBackground(navFour);
      } else if (window.scrollY > 80 && window.scrollY <= 120) {
        setNavBackground(navThree);
      } else if (window.scrollY > 40 && window.scrollY <= 80) {
        setNavBackground(navTwo);
      } else if (window.scrollY > 0 && window.scrollY <= 40) {
        setNavBackground(navOne);
      } else {
        setNavBackground(navZero);
        handleCloseNavMenu();
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // console.log(process.env)

  return (
    <AppBar position="fixed" sx={{ bgcolor: navRef.current, color: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ ml: 2, pt: 1, display: { xs: "none", md: "flex" } }}
          >
            <Link to="/#" style={{ textDecoration: "none" }}>
              <img src="/logolong.png" height={70} />
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <NavLinks />
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Link to="/#" style={{ textDecoration: "none" }}>
              <img src="/logolong.png" height={40} />
            </Link>
          </Typography>
          <Box
            sx={{
              display: "flex",
              // flexDirection: "row",
              flexDirection: "row",
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <NavLinks />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <NavLinks />
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
