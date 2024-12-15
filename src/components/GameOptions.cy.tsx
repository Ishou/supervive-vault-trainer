import GameOptions from "./GameOptions";

describe("<GameOptions />", () => {
  it("renders", () => {
    cy.mount(
      <GameOptions
        difficulty={{ speed: 2, level: 5, size: 100, perfectMultiplier: 200 }}
        changeHandler={() => {}}
      />,
    );

    cy.get("[data-cy=game-difficulty-reset]");

    // TODO values
    // TODO events => changeHandler
  });
});
