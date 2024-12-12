import GameOptionSlider from "@/components/GameOptionSlider";

describe("<GameOptionSlider />", () => {
  it("renders", () => {
    const changeSpy = cy.spy();

    cy.mount(
      <GameOptionSlider
        id="speed"
        value={100}
        isDisabled={false}
        label="Speed Slider"
        format={(v) => `Slider Format >${v}<`}
        min={0}
        default={50}
        max={100}
        changeHandler={changeSpy}
      />,
    );

    cy.get("[data-cy=game-option-speed]").should(
      "have.text",
      "Speed SliderSlider Format >100<Slider Format >0<Slider Format >50<Slider Format >100<",
    );
    cy.get("[data-cy=game-option-speed] input").should(
      "have.attr",
      "value",
      100,
    );
  });

  it("handles value change", () => {
    const changeSpy = cy.spy();

    cy.mount(
      <GameOptionSlider
        id="speed"
        value={98}
        isDisabled={false}
        label="Speed Slider"
        format={(v) => `Slider Format >${v}<`}
        min={0}
        step={7}
        default={50}
        max={200}
        changeHandler={changeSpy}
      />,
    );

    cy.get("[data-cy=game-option-speed]").click();
    cy.get("[data-cy=game-option-speed] [data-focused=true]");
    cy.get("[data-cy=game-option-speed]").type("{rightarrow}");
    cy.wrap(changeSpy).should("have.been.calledOnceWithExactly", "speed", 105);
  });
});
