import React from "react";

import PageFooter from "./PageFooter";

import classes from "./styles/Base.module.css";

const Base = ({ children }) => {
  return (
    <div>
      <div className={classes.homeComponent}>
        <div>{children}</div>
      </div>
      <PageFooter />
    </div>
  );
};

export default Base;
