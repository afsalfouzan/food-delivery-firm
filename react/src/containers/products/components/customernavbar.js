import React from "react";
import { useCookies } from "react-cookie";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";

import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

function Navbar() {
  const classes = useStyles();

  const [cookies, , removeCookie] = useCookies("auth_cookie");

  function Signout() {
    console.log("cokieeeeee");
    removeCookie("auth_cookie", { path: "/" });
  }

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Fly High
        </Typography>
        <div className={classes.navlinks}>
          <Stack spacing={2} marginTop="30px" marginLeft={"30px"} direction="column">
            <Link to="/customer/products">
              <ColorButton variant="contained" style={{ fontWeight: "bold" }}>
                Home
              </ColorButton>
            </Link>
          </Stack>
          <Stack spacing={2} marginTop="30px" marginLeft={"30px"} direction="column">
            <Link to="/products/order">
              <ColorButton variant="contained" style={{ fontWeight: "bold" }}>
                My Orders
              </ColorButton>
            </Link>
          </Stack>
          <Link to="/faq" className={classes.link}>
            <div className="dropdon">
              <ul className="ull">
                <li className="dropdown li">
                  <li className="li">
                    <Link to=" " className="dropbtn">
                      <img
                        src="https://image.shutterstock.com/image-vector/user-avatar-icon-sign-profile-600w-1145752283.jpg"
                        alt="Avatar"
                        className="avatar"
                      ></img>
                    </Link>
                  </li>
                  <div className="dropdown-content">
                    <Link to=" ">Profile</Link>
                    <Link to="/login" onClick={Signout}>
                      Signout
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
