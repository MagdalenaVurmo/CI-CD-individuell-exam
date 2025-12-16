import { screen } from "@testing-library/react";

// helper to fill complete booking form
export const fillBookingForm = async (user, players, lanes) => {
  await user.type(screen.getByLabelText(/date/i), "2025-12-20");
  await user.type(screen.getByLabelText(/time/i), "20:00");
  await user.type(screen.getByLabelText(/bowlers/i), players.toString());
  await user.type(screen.getByLabelText(/lanes/i), lanes.toString());

  const addShoeButton = screen.getByRole("button", { name: "+" });
  for (let i = 0; i < players; i++) {
    await user.click(addShoeButton);
  }

  const shoeInputs = screen.getAllByLabelText(/shoe size/i);
  for (const input of shoeInputs) {
    await user.type(input, "36");
  }
};

// helper to fill booking form without shoes
export const fillBookingFormWithoutShoes = async (
  user,
  players,
  lanes
) => {
  await user.type(screen.getByLabelText(/date/i), "2025-12-20");
  await user.type(screen.getByLabelText(/time/i), "20:00");
  await user.type(screen.getByLabelText(/bowlers/i), players.toString());
  await user.type(screen.getByLabelText(/lanes/i), lanes.toString());
};

// helper to add shoes
export const addShoes = async (user, shoeSizes) => {
  const addShoeButton = screen.getByRole("button", { name: "+" });

  for (let i = 0; i < shoeSizes.length; i++) {
    await user.click(addShoeButton);
  }

  const shoeInputs = screen.getAllByLabelText(/shoe size/i);
  for (let i = 0; i < shoeSizes.length; i++) {
    await user.type(shoeInputs[i], shoeSizes[i]);
  }
};

import { test, expect } from "vitest";

test("BookingFlow test file loads", () => {
  expect(true).toBe(true);
});