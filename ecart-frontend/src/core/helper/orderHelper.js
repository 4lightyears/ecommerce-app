import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
  // for creating orders
  const formData = new FormData();

  console.log("ORDHELPER line 7: data: ", orderData);

  for (const name in orderData) {
    formData.append(name, orderData[name]);
  }

  return fetch(`${API}order/add/${userId}/${token}/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getOrderHistoryList = (userId, token) => {
  // make api call to the backend and get order history

  return fetch(`${API}order/order_history/${userId}/${token}/`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log("ERROR WHILE FETCHING order history", err));
};
