import React, { useState, useEffect } from "react";
import { Stack } from "react-bootstrap";

import { getProducts } from "./helper/coreapicalls";

import Base from "./Base";
import CustomizedTables from "./Table";
import MainNavigation from "./MainNavigation";

import CategorySelect from "./helper/categoryHelper";
import { totalItemsInCart } from "./helper/cartHelper";

import classes from "./styles/Home.module.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [currentCount, setCount] = useState(totalItemsInCart());
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchProduct, setSearchedProduct] = useState("");
  const [addToCartSwitch, setAddToCartSwitch] = useState(false);

  const loadAllProducts = () => {
    // load all the products sent from the backend.

    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  let productsToDisplay = products;

  if (selectedCategory === "All") {
    productsToDisplay = products;
  } else {
    productsToDisplay = products.filter((product) => {
      return (
        product.category.slice(-2)[0].toString() === selectedCategory.toString()
      );
    });
  }

  if (searchProduct !== "") {
    productsToDisplay = productsToDisplay.filter((product) => {
      return product.name.toLowerCase().includes(searchProduct.toLowerCase());
    });
  }

  return (
    <MainNavigation
      cartCount={currentCount}
      onSearchProduct={(keyword) => {
        setSearchedProduct(keyword);
      }}
      data-testid="main-navigation"
    >
      <Base>
        <div className={classes.CategoryWrapperDiv}>
          <Stack gap={1}>
            <h6>Search By Category</h6>
            <CategorySelect
              onChangeCategory={(category) => setSelectedCategory(category)}
              className={classes.CategorySelectDropdown}
            />
          </Stack>
        </div>
        <div className="row">
          <CustomizedTables
            product={productsToDisplay}
            changeCount={(count) => setCount(count)}
            onAddToCart={() => setAddToCartSwitch(!addToCartSwitch)}
          />
        </div>
      </Base>
    </MainNavigation>
  );
}

export default Home;
