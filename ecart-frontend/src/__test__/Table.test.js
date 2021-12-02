import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Button from "@mui/material/Button";

import CustomizedTables from "../core/Table";

import { totalItemsInCart } from "../core/helper/cartHelper";
import { act } from "react-dom/test-utils";

it("check table render", () => {
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

  const { getByTestId } = render(
    <CustomizedTables
      product={products}
      addtoCart={true}
      removeFromCart={false}
      changeCount={totalItemsInCart()}
    />
  );
  expect(getByTestId("product-name")).toBeTruthy();
  expect(getByTestId("product-name")).toHaveTextContent("yellow tshirt");
});

it("check for more than one product", async () => {
  let products = [
    {
      id: 1,
      name: "yellow tshirt",
      description: "A yellow tshirt for summer",
      price: "10.50",
      image: "http://localhost:8000/media/images/AFPX9833_2_2048x.jpg",
      category: "http://localhost:8000/api/v1/category/1/",
    },
    {
      id: 2,
      name: "Sweater",
      description: "A woolen sweater",
      price: "22.20",
      image: "http://localhost:8000/media/images/cable-knit-1610640392.jpg",
      category: "http://localhost:8000/api/v1/category/2/",
    },
  ];

  let cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  const { getAllByTestId } = render(
    <CustomizedTables
      product={products}
      addtoCart={true}
      removeFromCart={false}
      changeCount={totalItemsInCart()}
    />
  );

  expect(getAllByTestId("product-name")).toHaveLength(2);
});

it("check add to cart button", async () => {
  await act(async () => {
    const handleClick = jest.fn();

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

    const { queryByTestId, getByTestId } = render(
      <CustomizedTables
        product={products}
        addtoCart={true}
        removeFromCart={false}
        changeCount={() => totalItemsInCart()}
      />
    );

    expect(getByTestId("add-to-cart")).toBeTruthy();
    expect(handleClick).toBeCalledTimes(0);
  });
});
