import React from "react";
import AppNav from "./AppNav";

describe("<AppNav />", () => {
  it("renders the app toolbar", () => {
    cy.mount(<AppNav />);

    cy.get("header").should("have.text", "Supervive Vault TrainerGitHub");
    cy.get("a")
      .should("have.text", "GitHub")
      .and(
        "have.attr",
        "href",
        "https://github.com/Ishou/supervive-vault-trainer",
      );
  });
});
