import * as React from "react";

import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  CardMedia,
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import UsePagination from "./Pagination";

import addItemToCart, { totalItemsInCart } from "./helper/cartHelper";

import classes from "./styles/Table.module.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#627296",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "normal",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

let canAddToCart = true;

const CustomizedTables = ({ product, changeCount, onAddToCart }) => {
  const [page, setPage] = React.useState(null);
  const rowsPerPage = 4;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - product.length) : 0;

  const handleChangePage = (event, newPage) => {
    // set current page as newPage
    setPage(newPage - 1);
  };

  const addToCart = (currentItem) => {
    // adds an item to cart on clicing the Add button

    if (canAddToCart) {
      addItemToCart(currentItem, () => {});
    } else {
      console.log("login first");
    }
  };

  const showAddToCart = (addToCart, item) => {
    /** helper function for adding to cart.
     * Gets item as a parameter to get the selected item from an array.
     */

    let currentItem;
    currentItem = item;

    return (
      addToCart && (
        <Button
          variant="contained"
          onClick={() => {
            addToCart(currentItem);
            changeCount(totalItemsInCart());
            onAddToCart();
          }}
          data-testid="add-to-cart"
        >
          Add to Cart
        </Button>
      )
    );
  };

  return (
    <>
      <TableContainer
        component={Paper}
        style={{ padding: "0px", marginBottom: "10px" }}
      >
        <Table sx={{ minWidth: "500px" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left" className={classes.tableHeadCell}>
                <strong>Preview</strong>
              </StyledTableCell>
              <StyledTableCell align="left" className={classes.tableHeadCell}>
                <strong>Name</strong>
              </StyledTableCell>
              <StyledTableCell align="left" className={classes.tableHeadCell}>
                <strong>Description</strong>
              </StyledTableCell>
              <StyledTableCell align="left" className={classes.tableHeadCell}>
                <strong>Price</strong>
              </StyledTableCell>
              <StyledTableCell align="left" className={classes.tableHeadCell}>
                <strong>Status</strong>
              </StyledTableCell>
              <StyledTableCell
                align="left"
                className={classes.tableHeadCell}
              ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? product.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : product
            ).map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell
                  scope="row"
                  align="left"
                  sx={{ padding: 0, width: "100px" }}
                  className={classes.tableBodyCell}
                >
                  <div className={classes.tableImageContainer}>
                    <CardMedia
                      component="img"
                      height="100%"
                      width="50%"
                      image={item.image}
                      alt={item.name}
                      style={{ margin: "10px" }}
                      className={classes.productImage}
                    />
                  </div>
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  className={classes.tableBodyCell}
                  data-testid="product-name"
                >
                  {item.name}
                </StyledTableCell>
                <StyledTableCell align="left" className={classes.tableBodyCell}>
                  {item.description}
                </StyledTableCell>
                <StyledTableCell align="left" className={classes.tableBodyCell}>
                  ${item.price}
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  style={{
                    padding: "10px",
                  }}
                  className={classes.tableBodyCell}
                >
                  <p className={classes.availableBadge}>Available</p>
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  id={index}
                  className={classes.tableBodyCell}
                >
                  {showAddToCart(addToCart, item)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 79 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.paginationDiv}>
        <UsePagination
          pageCount={Math.ceil(product.length / 4)}
          onChangeHandler={handleChangePage}
          variant={"text"}
          className={classes.paginationLinks}
          component="tbody"
        />
      </div>
    </>
  );
};

export default CustomizedTables;
