import React from "react";

import Select from "react-select";

import { API } from "../../backend";

let arr1 = [{ value: "All", label: "All" }];

fetch(`${API}category/all_categories/names`)
  // get the categories after making an api call.
  .then((response) => response.json())
  .then((category) => {
    category.map((item) => {
      arr1.push({
        value: item["id"],
        label: item["name"],
      });
      return "";
    });
  });

const CategorySelect = (props) => {
  const handleSelectChange = (e) => {
    // handles change in the selected value from the select
    props.onChangeCategory(e.value);
  };

  return (
    <div
      style={{
        marginBottom: "5px",
        marginLeft: "720px",
        textAlign: "left",
        width: "80%",
      }}
    >
      <Select
        options={arr1}
        defaultValue={arr1[0]}
        width="30%"
        className="mt-3 col-md-5 col-offset-1"
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: "#0092ff",
          },
        })}
        onChange={handleSelectChange}
      />
    </div>
  );
};

export default CategorySelect;
