import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import PageFooter from "../core/PageFooter";

test("page footer renders correctly", () => {
  const { getByTestId } = render(<PageFooter />);
  const moreInfo = getByTestId("more-info");

  expect(moreInfo.textContent).toBe(
    "© Copyright 2021 - Company Name. All rights reserved."
  );
});
