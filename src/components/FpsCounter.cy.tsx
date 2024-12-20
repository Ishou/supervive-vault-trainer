import FpsCounter from "./FpsCounter";

describe("<FpsCounter />", () => {
  it("renders", () => {
    cy.clock();

    cy.mount(<FpsCounter />);
    cy.get("[data-cy=fps-counter]").should("exist");

    cy.tick(1000);

    cy.get("[data-cy=fps-counter]").should("have.text", "FPS: 500");
  });
});
