import GameResult from "./GameResult";

describe("<GameResult />", () => {
  it("renders start info", () => {
    cy.mount(<GameResult result="start" />);

    cy.get("[role=alert]").should("have.text", "GL & HF!Try your best!");
  });

  it("renders perfect result", () => {
    cy.mount(<GameResult result="perfect" />);

    cy.get("[role=alert]").should(
      "have.text",
      "Perfect!6125 damage to the vault gate and a red pylon spawned.",
    );
  });

  it("renders ok result", () => {
    cy.mount(<GameResult result="ok" />);

    cy.get("[role=alert]").should(
      "have.text",
      "OK!3063 damage to the vault gate.",
    );
  });

  it("renders fail result", () => {
    cy.mount(<GameResult result="fail" />);

    cy.get("[role=alert]").should("have.text", "Fail!You spawned blue orbs.");
  });
});
