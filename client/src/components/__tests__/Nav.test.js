import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

/**
 * We render the App so the Nav is exercised through real routing,
 * keeping the test user-centric. The Nav lives on the Menu page,
 * which needs the CartProvider.
 */
import App from "../../App";
import { CartProvider } from "../../context/CartContext";
import TEST_ID_HOME from "../../pages/Home/Home.testid";
import TEST_ID_NAV from "../Nav.testid";

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse(JSON.stringify({ success: true, result: [] }));
});

const renderAt = (path) =>
  render(
    <CartProvider>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </CartProvider>,
  );

describe("Navigation", () => {
  it("Clicking the About Us link should go to the About page", async () => {
    renderAt("/menu");

    fireEvent.click(await screen.findByTestId(TEST_ID_NAV.linkToAboutUs));

    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /about us/i }),
      ).toBeInTheDocument(),
    );
  });

  it("Clicking the Home link should go to the Home page", async () => {
    renderAt("/menu");

    fireEvent.click(await screen.findByTestId(TEST_ID_NAV.linkToHome));

    await waitFor(() =>
      expect(screen.getByTestId(TEST_ID_HOME.container)).toBeInTheDocument(),
    );
  });
});
