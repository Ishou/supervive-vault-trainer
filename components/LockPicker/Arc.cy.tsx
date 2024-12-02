import React from "react";
import Arc, { ArcProps } from "@/components/LockPicker/Arc";

const props: ArcProps = {
  offset: 0,
  angle: 0,
  radius: 50,
  width: 10,
};

describe("<Arc />", () => {
  it("renders a path", () => {
    cy.mount(
      <svg>
        <Arc {...props} />
      </svg>,
    );

    cy.get("path").should("eq", "");
  });
});
