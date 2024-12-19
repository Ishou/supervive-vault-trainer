import Arc, { ArcProps } from "./Arc";

const arc1: ArcProps = {
  offset: 0,
  size: 0,
  radius: 50,
  width: 10,
};
const arc2: ArcProps = {
  offset: 0,
  size: 225,
  radius: 50,
  width: 10,
};

describe("<Arc />", () => {
  it("renders a path", () => {
    cy.mount(
      <svg>
        <Arc {...arc1} />
      </svg>,
    );

    cy.get("svg").should(
      "include.html",
      `<path d="M 0 -50 A 50 50 0 0 1 0 -50" fill="none" stroke-width="10"></path>`,
    );
  });

  it("renders a flipped path", () => {
    cy.mount(
      <svg>
        <Arc {...arc2} />
      </svg>,
    );

    cy.get("svg").should(
      "include.html",
      `<path d="M 0 -50 A 50 50 0 1 1 -35.35533905932737 35.355339059327385" fill="none" stroke-width="10"></path>`,
    );
  });
});
