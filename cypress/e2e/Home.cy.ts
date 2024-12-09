describe("HomePage", () => {
  it("renders", () => {
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

    cy.get("[data-cy=lock-picker-result]")
      .should("have.text", "GL & HF!Try your best!")
      .and("have.class", "!bg-primary");
  });

  it("allows to change options", () => {
    cy.visit("/");

    cy.get("[data-cy=lock-picker-option-speed]")
      .as("speedOption")
      .get("input")
      .should("have.value", 1.2);
    cy.get("@speedOption").click();
    cy.get("@speedOption").get("[data-focused=true]");
    cy.get("@speedOption").type("{rightarrow}");
    cy.get("@speedOption").get("input").should("have.value", 1.25);
  });

  it("plays a game", () => {
    cy.visit("/");

    cy.get("[data-cy=lock-picker]").click();
    cy.document().trigger("keydown", { code: "KeyE" });
    cy.document().wait(100);
    cy.document().trigger("keydown", { code: "KeyE" });

    cy.get("[data-cy=lock-picker-result]").should(
      "not.have.text",
      "GL & HF!Try your best!",
    );
  });

  it("starts a new game after a try", () => {
    cy.visit("/");

    cy.get("[data-cy=lock-picker]").click();
    cy.document().trigger("keydown", { code: "KeyE" });
    cy.document().wait(100);
    cy.document().trigger("keydown", { code: "KeyE" });
    cy.get("[data-cy=lock-picker-result]").should(
      "not.have.text",
      "GL & HF!Try your best!",
    );
    cy.document().trigger("keydown", { code: "KeyE" });

    cy.get("[data-cy=lock-picker-result]")
      .should("have.text", "GL & HF!Try your best!")
      .and("have.class", "!bg-primary");
  });
});
