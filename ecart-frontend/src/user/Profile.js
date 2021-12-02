import React from "react";

import MainNavigation from "../core/MainNavigation";
import PageFooter from "../core/PageFooter";

import classes from "./styles/Profile.module.css";

const Profile = () => {
  // profile page
  return (
    <MainNavigation>
      <div className={classes.profileBody}>
        <h1>coming soon...</h1>
      </div>
      <PageFooter />
    </MainNavigation>
  );
};

export default Profile;
