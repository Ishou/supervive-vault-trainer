import React from "react";
import LockPickerAlert from "./LockPickerAlert";

describe("<LockPickerAlert />", () => {
  it("renders alert depending on type", () => {
    cy.mount(<LockPickerAlert type="perfect" />);

    cy.get("[role=alert]").should("have.text", "Perfect!... % accuracy");
  });
});
