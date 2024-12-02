import React from "react";
import LockPickerOptionList from "./LockPickerOptionList";

describe("<LockPickerOptionList />", () => {
  it("renders", () => {
    cy.mount(<LockPickerOptionList />);
  });
});
