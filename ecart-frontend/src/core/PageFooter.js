import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import RedditIcon from "@mui/icons-material/Reddit";

import classes from "./styles/PageFooter.module.css";

function PageFooter() {
  // Footer section of the web app.

  return (
    <footer className={classes.footer}>
      <div className={classes.footerItems}>
        <h4>Follow us</h4>
        <div className={classes.navlinks}>
          <ul className={classes.socialsList}>
            <li className={classes.social}>
              <FacebookIcon />
            </li>
            <li className={classes.social}>
              <LinkedInIcon />
            </li>
            <li className={classes.social}>
              <InstagramIcon />
            </li>
            <li className={classes.social}>
              <TwitterIcon />
            </li>
            <li className={classes.social}>
              <RedditIcon />
            </li>
          </ul>
          <p data-testid="more-info">
            &#169; Copyright 2021 - Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default PageFooter;
