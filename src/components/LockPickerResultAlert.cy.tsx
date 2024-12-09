import React from "react";
import LockPickerResultAlert from "./LockPickerResultAlert";

describe("<LockPickerAlert />", () => {
  it("renders alert depending on type", () => {
    cy.mount(<LockPickerResultAlert type="perfect" />);

    cy.get("[role=alert]").should("have.text", "Perfect!... % accuracy");
  });
});
