import * as React from "react";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";

const List = styled("ul")({
  listStyle: "none",
  padding: "10px",
  marginLeft: "4px",
  marginRight: "4px",
  display: "flex",
  justifyContent: "center",
  borderWidth: 0,
  boxShadow: 0,

  "& li": {
    "& button": {
      marginLeft: 5,
      marginRight: 5,
      borderWidth: 0,
      boxShadow: "none",
    },
  },
});

const UsePagination = (props) => {
  /**
   * Custom component built on top of MUI pagination component.
   */

  const { items } = usePagination({
    count: props.pageCount,
    onChange: props.onChangeHandler,
    componentName: "tbody",
  });

  return (
    <nav>
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <button
                type="button"
                style={{
                  fontWeight: selected ? "bold" : undefined,
                }}
                {...item}
              >
                {page}
              </button>
            );
          } else {
            children = (
              <button type="button" {...item}>
                {type}
              </button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </List>
    </nav>
  );
};

export default UsePagination;
