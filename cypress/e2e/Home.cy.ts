describe("HomePage", () => {
  it("passes", () => {
    cy.visit("/");

    cy.get("header").should("exist");
    cy.get("header [role=link]")
      .should(
        "have.attr",
        "href",
        "https://github.com/Ishou/supervive-vault-trainer",
      )
      .and("have.attr", "target", "_blank");
    cy.get("footer").should("exist");
  });
});
