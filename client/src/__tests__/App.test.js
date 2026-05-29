import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "../App";
import TEST_ID_HOME from "../pages/Home/Home.testid";

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse(JSON.stringify({ success: true, result: [] }));
});

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

describe("Routing", () => {
  it("Path '/' should render the start page", async () => {
    renderAt("/");
    expect(
      await screen.findByText(/your favorite food, just a tap away/i),
    ).toBeInTheDocument();
  });

  it("Path '/home' should render the home page", async () => {
    renderAt("/home");
    expect(
      await screen.findByTestId(TEST_ID_HOME.container),
    ).toBeInTheDocument();
  });

  it("Path '/about-us' should render the about page", async () => {
    renderAt("/about-us");
    expect(
      await screen.findByRole("heading", { name: /about us/i }),
    ).toBeInTheDocument();
  });

  it("Unknown path should render the not-found page", async () => {
    renderAt("/does-not-exist");
    expect(await screen.findByText(/page not found/i)).toBeInTheDocument();
  });
});
