import PlayStopTrigger from "./PlayStopTrigger";
import { GameOptionsProvider } from "./GameOptions/GameOptionsContext";

describe("<PlayStopTrigger />", () => {
  it("renders", () => {
    cy.mount(
      <GameOptionsProvider>
        <PlayStopTrigger />
      </GameOptionsProvider>,
    );

    cy.get("[data-cy=play-stop-trigger]").should("have.text", "Press E or Tap");
  });

  it("triggers on touchend", () => {
    const gameDispatchSpy = cy.spy();
    cy.mount(
      <GameOptionsProvider gameDispatchOverride={gameDispatchSpy}>
        <PlayStopTrigger />
      </GameOptionsProvider>,
    );

    cy.get("[data-cy=play-stop-trigger]").trigger("touchend");

    cy.wrap(gameDispatchSpy).should("have.been.calledOnceWithExactly", {
      type: "pressOrTap",
    });
  });

  it("triggers on KeyE keydown", () => {
    const gameDispatchSpy = cy.spy();
    cy.mount(
      <GameOptionsProvider gameDispatchOverride={gameDispatchSpy}>
        <PlayStopTrigger />
      </GameOptionsProvider>,
    );

    cy.get("[data-cy=play-stop-trigger]"); // wait for render

    cy.document().trigger("keydown", { code: "KeyE" });

    cy.wrap(gameDispatchSpy).should("have.been.calledOnceWithExactly", {
      type: "pressOrTap",
    });
  });

  it("does NOT trigger on other keydown", () => {
    const gameDispatchSpy = cy.spy();
    cy.mount(
      <GameOptionsProvider gameDispatchOverride={gameDispatchSpy}>
        <PlayStopTrigger />
      </GameOptionsProvider>,
    );

    cy.get("[data-cy=play-stop-trigger]"); // wait for render

    cy.document().trigger("keydown", { code: "KeyG" });

    cy.wrap(gameDispatchSpy).should("not.have.been.called");
  });
});
