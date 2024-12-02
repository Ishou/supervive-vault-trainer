import React from "react";
import AppNav from "./AppNav";

describe("<AppNav />", () => {
  it("renders the app toolbar", () => {
    cy.mount(<AppNav />);

    cy.get("[role=banner]").should("have.text", "Supervive Vault Trainer");
    cy.get("[role=link]")
      .should("have.text", "GitHub")
      .and("have.attr", "href", "");
  });
});
