import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Home from "../Home";
import TEST_ID_HOME from "../Home.testid";

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse(JSON.stringify({ success: true, result: [] }));
});

describe("Home", () => {
  it("Renders without a problem", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(TEST_ID_HOME.container)).toBeInTheDocument();
  });
});
