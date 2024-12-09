import React from "react";
import LockPicker from "./LockPicker";

describe("<LockPicker />", () => {
  it.skip("renders", () => {
    cy.mount(<LockPicker />);

    cy.get("[role=alert]").should("have.text", "Perfect!... % accuracy");
  });

  it.skip("picks with perfect result", () => {
    cy.mount(<LockPicker />);

    cy.get("[data-cy=lock-picker]").click();
    cy.document().trigger("keydown", { code: "KeyE" });
    cy.document().wait(500);
    cy.document().trigger("keydown", { code: "KeyE" });

    cy.get("[data-cy=lock-picker-result]")
      .should("have.text", "Perfect!... % accuracy")
      .and("have.class", "!bg-success");
  });

  it.skip("picks with OK result", () => {
    cy.mount(<LockPicker />);

    cy.get("[data-cy=lock-picker]").click();
    cy.document().trigger("keydown", { code: "KeyE" });
    cy.document().wait(425);
    cy.document().trigger("keydown", { code: "KeyE" });

    cy.get("[data-cy=lock-picker-result]")
      .should("have.text", "OK!...° or ...ms from Perfect!")
      .and("have.class", "!bg-success");
  });

  it.skip("picks with failed result", () => {
    cy.mount(<LockPicker />);

    cy.get("[data-cy=lock-picker]").click();
    cy.document().trigger("keydown", { code: "KeyE" });
    cy.document().wait(200);
    cy.document().trigger("keydown", { code: "KeyE" });

    cy.get("[data-cy=lock-picker-result]")
      .should("have.text", "Fail!...° or ...ms from OK!")
      .and("have.class", "!bg-danger");
  });
});
