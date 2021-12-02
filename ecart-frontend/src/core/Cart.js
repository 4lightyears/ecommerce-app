import {
  CardMedia,
  Card,
  CardContent,
  Typography,
  Box,
  Drawer,
  Button,
  Divider,
} from "@mui/material";

import { useState } from "react";
import * as React from "react";
import { Link } from "react-router-dom";
import { Stack } from "react-bootstrap";

import addItemToCart, {
  loadCart,
  decreaseItemCount,
  totalItemsInCart,
  totalCost,
  removeItemFromCart,
} from "./helper/cartHelper";

import { isAuthenticated } from "../auth/helper";

import classes from "./styles/Cart.module.css";

export default function TemporaryDrawer(props) {
  const [state, setState] = useState({
    right: true,
  });

  const [cartItems, setCartItems] = useState(loadCart());
  const [itemCount, setItemCount] = useState(totalItemsInCart());
  const [showCartDrawer, setShowCartDrawer] = useState(props.currentCartState);

  let totalAmount = totalCost();

  const handleIncrementProductCount = (id) => {
    // increase the count of a particular item in the cart by 1 unit.
    let count = itemCount;
    count += 1;
    setItemCount(count);
  };

  const handleDecrementProductCount = () => {
    // decrease the count of a particular item in the cart by 1 unit.
    let count = itemCount;
    if (itemCount !== 1) {
      count -= 1;
    }
    setItemCount(count);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    // for toggling the drawer open and close.
    if (showCartDrawer) {
      setShowCartDrawer(false);
      props.onCartClose();
    }
    setCartItems(loadCart());
    setState({ ...state, [anchor]: open });
  };

  const deleteItemFromCart = (productId) => {
    // deletes item from cart

    removeItemFromCart(productId);
    setCartItems(loadCart());
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 600 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {cartItems.map((item, index) => (
        <Card key={item.id} className={classes.CartProductCard}>
          <CardContent className={classes.cardDivContainer}>
            <Stack
              direction="horizontal"
              gap={2}
              className={classes.cardHorizontalDiv}
            >
              <div className={classes.cartImageContainer}>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.name}
                  className={classes.CartProductImage}
                />
              </div>
              <Typography
                variant="body2"
                color="text.secondary"
                className={classes.TypographyDiv}
              >
                <div className={classes.cardProductInfo}>
                  <h6>{item.name}</h6>
                  <p>{item.description}</p>
                  <p>${item.price}</p>
                </div>
              </Typography>
              <div ms-auto="true" className={classes.addRemoveContainerDiv}>
                <Stack gap={4} className={classes.addRemoveStack}>
                  <div className={classes.addRemoveSection}>
                    <Button
                      variant="text"
                      className={classes.addRemoveSectionButton}
                      onClick={() => {
                        handleDecrementProductCount(item.id);
                        decreaseItemCount(item);
                        setCartItems(loadCart());
                      }}
                    >
                      -
                    </Button>
                    {/*  +++++++++++++++++++ Current COUNT ++++++++++++++ */}
                    {item.count}
                    <Button
                      variant="text"
                      className={classes.addRemoveSectionButton}
                      onClick={() => {
                        handleIncrementProductCount(item.id);
                        addItemToCart(item);
                        setCartItems(loadCart());
                      }}
                    >
                      +
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={() => {
                        deleteItemFromCart(item.id);
                        props.removeItem(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="grey"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                        style={{ marginRight: "10px" }}
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fillRule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                      <p>Remove Item</p>
                    </Button>
                  </div>
                </Stack>
              </div>
            </Stack>
          </CardContent>
        </Card>
      ))}

      <Card className={classes.paymentCardCart}>
        <CardContent className={classes.billSection}>
          <div className={classes.billSectionHeader}>
            <h5>******Total Bill******</h5>
          </div>
          <Stack gap={2}>
            <div>
              <Stack direction="horizontal" gap={3}>
                <div>Total products count</div>
                <div className="ms-auto">{totalItemsInCart()}</div>
              </Stack>
            </div>
            <Divider />
            <div>
              <Stack direction="horizontal" gap={3}>
                <div>Total Amount</div>
                <div className="ms-auto">${totalAmount}</div>
              </Stack>
            </div>
            <div>
              <Stack direction="horizontal" gap={3}>
                <div>Shipping</div>
                <div className="ms-auto">
                  <p>Free</p>
                </div>
              </Stack>
            </div>
          </Stack>
        </CardContent>
        {isAuthenticated() && cartItems.length > 0 ? (
          <Button
            variant="contained"
            onClick={toggleDrawer(anchor, false)}
            component={Link}
            to={"/payment"}
            className={classes.placeOrderButton}
            fullWidth
          >
            Place Order
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={toggleDrawer(anchor, false)}
            disabled={true}
            className={classes.placeOrderButton}
            fullWidth
          >
            Place Order
          </Button>
        )}
      </Card>
    </Box>
  );

  return (
    <div>
      {
        <React.Fragment key={"right"}>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}
