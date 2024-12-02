import React from "react";
import LockPicker from "@/components/LockPicker/LockPicker";

describe("<LockPicker />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LockPicker options={{ speed: 1, size: 2, perfectSize: 3 }} />);
  });
});
