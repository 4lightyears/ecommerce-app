import * as React from "react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { styled, alpha } from "@mui/material/styles";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Avatar,
} from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { deepPurple } from "@mui/material/colors";

import TemporaryDrawer from "./Cart";
import Order from "./Order";

import { isAuthenticated } from "../auth/helper";
import { signout } from "../auth/helper";
import { totalItemsInCart } from "./helper/cartHelper";

import classes from "./styles/AppBar.module.css";

const Search = styled("div")(({ theme }) => ({
  // searchbar on navigation bar

  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  // icon inside searchbar

  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  // Base component for search bar.

  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function MainNavigation({ children, onSearchProduct }) {
  // navigation bar component.

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [showCart, setShowCart] = useState(false);
  const [removeItem, setRemoveItem] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);

  let currCartCount = totalItemsInCart();

  var avatarName;
  if (isAuthenticated().token) {
    avatarName = localStorage.getItem("name")[0].toUpperCase();
  }

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    // toggle profile menu open and close.
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    // implements close feature on mobile menu popup.
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    // handle main menu close
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    // implements open feature on mobile menu popup.
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleShowCart = () => {
    // show cart handler. Opens cart drawer.
    setShowCart(!showCart);
  };

  const handleSignout = () => {
    // handles signout functionality.
    handleMenuClose();
    signout(() => {
      <Redirect to={{ pathname: "/signup" }} />;
    });
  };

  const setSearchKeywordHandler = (event) => {
    // search keyword handler for search input keyword

    // setSearchKeyword(event.target.value);
    onSearchProduct(event.target.value);
  };

  const orderHistoryHandler = () => {
    // handle state for order button
    handleMenuClose();
    setShowOrderHistory(true);
  };

  const handleOrderHistoryClose = () => {
    // handle the state of order history drawer when closed.
    setShowOrderHistory(false);
  };

  const handleCartClose = () => {
    // handle the state of cart drawer when closed.
    setShowCart(false);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = isAuthenticated() ? (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleSignout}>Sign Out</MenuItem>
    </Menu>
  ) : (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to={"/signin"}>
        Sign In
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to={"/signup"}>
        Sign Up
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = isAuthenticated() ? (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to={"/"}>
        Home
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to={"/profile"}>
        Profile
      </MenuItem>
      <MenuItem onClick={orderHistoryHandler}>My Order</MenuItem>
    </Menu>
  ) : (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to={"/"}>
        Home
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        className={classes.navBar}
        style={{ backgroundColor: "#14A098" }}
        data-testid="main-navigation"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            aria-haspopup="true"
            sx={{ mr: 2 }}
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            E-Cart
          </Typography>
          <Search onChange={setSearchKeywordHandler}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={handleShowCart}
            >
              <Badge badgeContent={currCartCount} color="error">
                <AddShoppingCartOutlinedIcon onClick={handleShowCart} />
              </Badge>
            </IconButton>
            {isAuthenticated() ? (
              <Avatar
                sx={{ bgcolor: deepPurple[500], width: 30, height: 30 }}
                // need help
                style={{ cursor: "pointer", margin: "auto", padding: "20px" }}
                onClick={handleProfileMenuOpen}
              >
                {avatarName}
              </Avatar>
            ) : (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {showCart ? (
        <TemporaryDrawer
          removeItem={() => setRemoveItem(!removeItem)}
          onCartClose={handleCartClose}
          currentCartState={showCart}
        />
      ) : (
        false
      )}
      {showOrderHistory ? (
        <Order
          currentOrderHistoryState={showOrderHistory}
          onOrderHistoryClose={handleOrderHistoryClose}
        />
      ) : (
        false
      )}
      <div>{children}</div>
    </Box>
  );
}
