import React, { useState, useEffect } from "react";
import { Offcanvas, Card, Stack } from "react-bootstrap";

import { getOrderHistoryList } from "./helper/orderHelper";

import classes from "./styles/OrdersHistory.module.css";

const Order = (props) => {
  let list = [];
  const [show, setShow] = useState(props.currentOrderHistoryState);
  const [ordList, setOrdList] = useState([]);
  const handleClose = () => {
    // handle order drawer close

    setShow(false);
    props.onOrderHistoryClose(false);
  };

  let userId = JSON.parse(localStorage.getItem("token")).user.id;
  let token = JSON.parse(localStorage.getItem("token")).token;

  const getOrderHistory = () => {
    let data = getOrderHistoryList(userId, token);

    data.then((orderList) => {
      orderList.orders.map((listItem) =>
        list.push({
          userId: listItem["user_id"],
          id: listItem["id"],
          totalProducts: listItem["total_products"],
          products: JSON.parse(listItem["product_names"]),
          totalAmount: listItem["total_amount"],
        })
      );
      setOrdList(list);
    });
  };

  useEffect(() => {
    getOrderHistory();
  }, []);

  const ordersView = (
    <Offcanvas
      show={show}
      onHide={handleClose}
      style={{ width: "45%", paddingTop: "0px" }}
      className={classes.offCanvasDiv}
    >
      <Offcanvas.Body style={{ paddingTop: "2px" }}>
        {ordList.map((item) => (
          <Card className={classes.orderHistoryCard} key={item.id}>
            <div className={classes.orderHistoryCardBody}>
              {item.products.map((productInOrder) => (
                <Card
                  key={productInOrder.id}
                  className={classes.orderListOfProducts}
                >
                  <Stack direction="horizontal" key={productInOrder.id}>
                    <div
                      className={classes.orderThumbnailImageContainer}
                      key={productInOrder.id}
                    >
                      <img
                        src={productInOrder.image}
                        alt={productInOrder.id}
                        className={classes.orderThumbnailImage}
                        key={productInOrder.id}
                      />
                    </div>
                    <div
                      className={classes.orderGeneralInfo}
                      key={`${productInOrder.id} general-info`}
                    >
                      <h6
                        className={`${classes.orderGeneralInfoItem} info-heading`}
                        key={`${productInOrder.id} heading`}
                      >
                        {productInOrder.name}
                      </h6>
                      <p
                        className={`${classes.orderGeneralInfoItem} info-items`}
                        key={`${productInOrder.id} info-items`}
                      >
                        {productInOrder.description}
                      </p>
                      <p
                        className={`${classes.orderGeneralInfoItem} info-amount`}
                        key={`${productInOrder.id} info-amount`}
                      >
                        ${productInOrder.price}
                      </p>
                    </div>
                    <div
                      className={classes.GrayIndicatiorContainer}
                      key={`${productInOrder.id} product-count`}
                    >
                      <div
                        className={classes.totalItemsGrayIndicator}
                        key={`${productInOrder.id} gray-indicator`}
                      >
                        {productInOrder.count}
                      </div>
                    </div>
                  </Stack>
                </Card>
              ))}
              <div className={classes.orderAmountInfo}>
                <p>Total Items: {item.totalProducts}</p>
                <p>Total Amount: {item.totalAmount}</p>
              </div>
            </div>
          </Card>
        ))}
      </Offcanvas.Body>
    </Offcanvas>
  );

  return <>{ordersView}</>;
};

export default Order;
