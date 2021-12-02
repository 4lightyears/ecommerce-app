import { API } from "../../backend";

export const getProducts = () => {
  // get the list of products from the backend.
  return fetch(`${API}product`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
