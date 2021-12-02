import { API } from "../../backend";

import { cartEmpty } from "../../core/helper/cartHelper";

export const signup = (user) => {
  /** function handling signup Makes POST request to the API.
   *
   * parameters:
   * user (object): Data assocaited with the user.
   *
   */

  return fetch(`${API}user/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  /** function handling signin. Makes POST request to the API.
   *
   * parameters:
   * user (object): Data assocaited with the user.
   *
   */

  const formData = new FormData();

  for (const name in user) {
    formData.append(name, user[name]);
  }

  return fetch(`${API}user/login/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  /** authenticates the user. Sets session token in local storage.
   *
   * parameters:
   * data: the data to signin with or signup with
   * next: any
   */

  if (typeof window !== undefined) {
    localStorage.setItem("token", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  // check if a user is authenticated or not.

  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("token")) {
    return JSON.parse(localStorage.getItem("token"));
  } else {
    return false;
  }
};

export const signout = (next) => {
  /**
   * Sign a user out.
   *
   * parameters:
   * next: any
   */

  const userId = isAuthenticated() && isAuthenticated().user.id;

  if (typeof window !== undefined) {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    cartEmpty(() => {});
    next();

    return fetch(`${API}user/logout/${userId}`, {
      mathod: "GET",
    })
      .then((response) => {
        next();
      })
      .catch((err) => console.log(err));
  }
};
