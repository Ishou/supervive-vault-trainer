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
    cy.get("@speedOption").click().type("{rightarrow}");
    cy.get("@speedOption").get("input").should("have.value", 1.25);
  });

  it("plays a game", () => {
    cy.visit("/");

    cy.get("[data-cy=lock-picker]").click();
    cy.document().trigger("keydown", { code: "KeyE" });
    cy.document().wait(500);
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
    cy.document().wait(200);
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

  // Need a way to fake timer of requestAnimationFrame for following tests

  it.skip("picks with perfect result", () => {
    cy.visit("/");

    cy.get("[data-cy=lock-picker]").click();
    cy.document().trigger("keydown", { code: "KeyE" });
    cy.document().wait(500);
    cy.document().trigger("keydown", { code: "KeyE" });

    cy.get("[data-cy=lock-picker-result]")
      .should("have.text", "Perfect!... % accuracy")
      .and("have.class", "!bg-success");
  });

  it.skip("picks with OK result", () => {
    cy.visit("/");

    cy.get("[data-cy=lock-picker]").click();
    cy.document().trigger("keydown", { code: "KeyE" });
    cy.document().wait(425);
    cy.document().trigger("keydown", { code: "KeyE" });

    cy.get("[data-cy=lock-picker-result]")
      .should("have.text", "OK!...° or ...ms from Perfect!")
      .and("have.class", "!bg-success");
  });

  it.skip("picks with failed result", () => {
    cy.visit("/");

    cy.get("[data-cy=lock-picker]").click();
    cy.document().trigger("keydown", { code: "KeyE" });
    cy.document().wait(200);
    cy.document().trigger("keydown", { code: "KeyE" });

    cy.get("[data-cy=lock-picker-result]")
      .should("have.text", "Fail!...° or ...ms from OK!")
      .and("have.class", "!bg-danger");
  });
});
