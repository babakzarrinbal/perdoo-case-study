import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

const mocks: MockedResponse[] = [];

test("renders learn react link", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
