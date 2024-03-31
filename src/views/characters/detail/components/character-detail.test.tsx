import CharacterDetail from "./character-detail";
import { characters as charactersQueries } from "../../../../gql/queries";
import React from "react";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const mocks = [
  {
    request: {
      query: charactersQueries.GET_CHARACTER_DETAILS,
      variables: { id: "1" },
    },
    result: {
      data: {
        character: {
          id: "1",
          name: "Rick Sanchez",
          status: "Alive",
          species: "Human",
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          origin: { name: "Earth (C-137)" },
          location: { name: "Earth (Replacement Dimension)" },
          episode: [{ name: "Pilot", episode: "S01E01" }],
        },
      },
    },
  },
];

describe("<CharacterDetail />", () => {
  it("renders character details successfully", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/characters/1"]}>
          <Routes>
            <Route path="/characters/:id" element={<CharacterDetail />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    // Instead of checking for a loading state, directly check for the appearance of content.
    // The query `findByText` is inherently asynchronous and will wait for the element to appear.
    await screen.findByText("Rick Sanchez"); // This line implies the loading state has passed.

    // Additional assertions to verify the character details
    expect(screen.getByText("Alive")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
    expect(
      screen.getByText("Earth (Replacement Dimension)")
    ).toBeInTheDocument();
    expect(screen.getByText("Pilot")).toBeInTheDocument();
  });
});
