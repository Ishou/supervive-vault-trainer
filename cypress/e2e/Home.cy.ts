describe("HomePage", () => {
  it("passes", () => {
    cy.visit("/");

    cy.get("header").should("exist");
  });
});
