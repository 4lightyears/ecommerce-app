import React from "react";
import { MemoryRouter } from "react-router-dom";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import MainNavigation from "../core/MainNavigation";
import CustomizedTables from "../core/Table";

import { totalItemsInCart } from "../core/helper/cartHelper";

it("Main navigation is rendered", async () => {
  let products = [
    {
      id: 1,
      name: "yellow tshirt",
      description: "A yellow tshirt for summer",
      price: "10.50",
      image: "http://localhost:8000/media/images/AFPX9833_2_2048x.jpg",
      category: "http://localhost:8000/api/v1/category/1/",
    },
  ];
  let cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  let child = (
    <CustomizedTables
      product={products}
      addtoCart={true}
      removeFromCart={false}
      changeCount={() => totalItemsInCart()}
    />
  );
  const { getByTestId } = render(
    <MemoryRouter>
      <MainNavigation
        onSearchProduct={() => {
          "";
        }}
      >
        {child}
      </MainNavigation>
    </MemoryRouter>
  );
  expect(getByTestId("main-navigation")).toBeTruthy();
});
