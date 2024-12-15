describe("HomePage", () => {
  function verifyOptions(size: string, perfectMultiplier: string) {
    cy.get("[data-cy=game-option-size] input").should("have.value", size);
    cy.get("[data-cy=game-option-perfectMultiplier] input").should(
      "have.value",
      perfectMultiplier,
    );
  }

  function playSequence(ticks: number[]) {
    ticks.map((tick) => {
      cy.tick(tick);
      cy.get("[data-cy=play-stop-trigger]").trigger("touchend");
    });
  }

  it("renders", () => {
    cy.clock();
    cy.visit("/");

    cy.get("[data-cy=lock-picker]").should("exist");

    cy.get("header").should("exist");
    cy.get("header [role=link]")
      .should(
        "have.attr",
        "href",
        "https://github.com/Ishou/supervive-vault-trainer",
      )
      .and("have.attr", "target", "_blank");
    cy.get("footer").should("exist");

    cy.get("[data-cy=game-result]").should(
      "have.text",
      "GL & HF!Try your best!",
    );
    cy.get("[data-cy=fps-counter]").should("have.text", "FPS: 000");
  });

  it("plays and gets perfect score", () => {
    cy.clock();
    cy.visit("/");

    cy.get("[data-cy=lock-picker]").should("exist");

    playSequence([0, 650]);

    cy.get("[data-cy=game-result]").should("contain.text", "Perfect!");
  });

  it("plays and gets ok score", () => {
    cy.clock();
    cy.visit("/");

    cy.get("[data-cy=lock-picker]").should("exist");

    playSequence([0, 550]);

    cy.get("[data-cy=game-result]").should("contain.text", "OK!");
  });

  it("plays and fails", () => {
    cy.clock();
    cy.visit("/");

    cy.get("[data-cy=lock-picker]").should("exist");

    playSequence([0, 0]);

    cy.get("[data-cy=game-result]").should("contain.text", "Fail!");
  });

  it("resets difficulty", () => {
    cy.clock();
    cy.visit("/");

    cy.get("[data-cy=lock-picker]").should("exist");

    // Level 1
    playSequence([0, 0, 0]);
    cy.get("[data-cy=game-difficulty-reset]").click();
    verifyOptions("140", "50");
  });

  it("keeps same options if not auto difficulty", () => {
    cy.clock();
    cy.visit("/");

    cy.get("[data-cy=lock-picker]").should("exist");

    cy.get("[data-cy=game-auto-difficulty-toggle]").click();

    // Level 1
    playSequence([0, 0, 0]);
    verifyOptions("140", "50");
  });

  it("resets options if going back to auto difficulty", () => {
    cy.clock();
    cy.visit("/");

    cy.get("[data-cy=lock-picker]").should("exist");

    // Level 1
    playSequence([0, 0, 0]);
    verifyOptions("70", "25");

    cy.get("[data-cy=game-auto-difficulty-toggle]").click();
    cy.get("[data-cy=game-auto-difficulty-toggle]").click();

    verifyOptions("140", "50");
  });

  it("increases difficulty each game by default", () => {
    cy.clock();
    cy.visit("/");

    cy.get("[data-cy=lock-picker]").should("exist");

    // Level 0
    verifyOptions("140", "50");

    // Level 1
    playSequence([0, 0, 0]);
    verifyOptions("70", "25");

    // Level 2
    playSequence([0, 0, 0]);
    verifyOptions("20", "12");

    // Level 3
    playSequence([0, 0, 0]);
    verifyOptions("10", "12");

    // Final level
    playSequence([0, 0, 0]);
    verifyOptions("10", "12");
  });

  it("allows to change options", () => {
    cy.clock();
    cy.visit("/");

    cy.get("[data-cy=lock-picker]").should("exist");

    cy.get("[data-cy=game-auto-difficulty-toggle]").click();
    cy.get("[data-cy=game-option-speed][data-disabled=false]")
      .as("speedOption")
      .find("[data-slot=value]")
      .should("have.text", "1RPS");
    cy.get("@speedOption").find("[data-slot=label]").click();
    cy.get("@speedOption").find("[data-slot=label]").type("{rightarrow}");
    cy.get("@speedOption")
      .find("[data-slot=value]")
      .should("have.text", "1.05RPS");
  });
});
