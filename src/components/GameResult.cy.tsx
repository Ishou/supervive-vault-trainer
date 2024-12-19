import GameResult from "./GameResult";
import { GameOptionsProvider } from "./GameOptions/GameOptionsContext";

describe("<GameResult />", () => {
  it("renders start info", () => {
    cy.mount(
      <GameOptionsProvider gameStateOverride={{ state: "start" }}>
        <GameResult />
      </GameOptionsProvider>,
    );

    cy.get("[role=alert]").should("have.text", "GL & HF!Try your best!");
  });

  it("renders perfect result", () => {
    cy.mount(
      <GameOptionsProvider gameStateOverride={{ state: "perfect" }}>
        <GameResult />
      </GameOptionsProvider>,
    );

    cy.get("[role=alert]").should(
      "have.text",
      "Perfect!6125 damage to the vault gate and a red pylon spawned.",
    );
  });

  it("renders ok result", () => {
    cy.mount(
      <GameOptionsProvider gameStateOverride={{ state: "ok" }}>
        <GameResult />
      </GameOptionsProvider>,
    );

    cy.get("[role=alert]").should(
      "have.text",
      "OK!3063 damage to the vault gate.",
    );
  });

  it("renders fail result", () => {
    cy.mount(
      <GameOptionsProvider gameStateOverride={{ state: "fail" }}>
        <GameResult />
      </GameOptionsProvider>,
    );

    cy.get("[role=alert]").should("have.text", "Fail!You spawned blue orbs.");
  });
});
