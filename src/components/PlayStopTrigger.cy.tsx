import React from "react";
import PlayStopTrigger from "@/components/PlayStopTrigger";

describe("<PlayStopTrigger />", () => {
  it("renders", () => {
    cy.mount(<PlayStopTrigger toggleHandler={cy.spy()} />);

    cy.get("[data-cy=play-stop-trigger]").should("have.text", "Press E or Tap");
  });

  it("triggers on touchend", () => {
    const toggleSpy = cy.spy();
    cy.mount(<PlayStopTrigger toggleHandler={toggleSpy} />);

    cy.get("[data-cy=play-stop-trigger]").trigger("touchend");

    cy.wrap(toggleSpy).should("have.been.calledOnce");
  });

  it("triggers on KeyE keydown", () => {
    const toggleSpy = cy.spy();
    cy.mount(<PlayStopTrigger toggleHandler={toggleSpy} />);
    cy.get("[data-cy=play-stop-trigger]"); // wait for render

    cy.document().trigger("keydown", { code: "KeyE" });

    cy.wrap(toggleSpy).should("have.been.calledOnce");
  });

  it("does NOT trigger on other keydown", () => {
    const toggleSpy = cy.spy();
    cy.mount(<PlayStopTrigger toggleHandler={toggleSpy} />);
    cy.get("[data-cy=play-stop-trigger]"); // wait for render

    cy.document().trigger("keydown", { code: "KeyG" });

    cy.wrap(toggleSpy).should("not.have.been.called");
  });
});
