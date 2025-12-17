import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Booking from "../../views/Booking";
import {
  addShoes,
  fillBookingForm,
  fillBookingFormWithoutShoes,
} from "../helpers/testHelpers";
import userEvent from "@testing-library/user-event";

describe("Booking", () => {
  // Helper that renders the Booking view with routing
  // and returns commonly used inputs and buttons for the tests
  const renderBooking = () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    return {
      user,
      dateInput: () => screen.getByLabelText(/date/i),
      timeInput: () => screen.getByLabelText(/time/i),
      playerInput: () => screen.getByLabelText(/bowlers/i),
      laneInput: () => screen.getByLabelText(/lanes/i),
      shoeInputs: () => screen.getAllByLabelText(/shoe size/i),
      addShoeButton: () => screen.getByRole("button", { name: "+" }),
      removeShoeButton: () => screen.getAllByRole("button", { name: "-" }),
      submitButton: () =>
        screen.getByRole("button", { name: /striiiiiike/i }),
    };
  };

  describe("US1 – Booking date, time, players and lanes", () => {
    it("allows the user to select a date and time (AC1)", async () => {
      const { user, dateInput, timeInput } = renderBooking();

      // User selects a valid date and time for the booking
      await user.type(dateInput(), "2025-12-20");
      await user.type(timeInput(), "20:00");

      expect(dateInput().value).toBe("2025-12-20");
      expect(timeInput().value).toBe("20:00");
    });

    it("allows the user to enter number of players (minimum one) (AC2)", async () => {
      const { user, playerInput } = renderBooking();

      // User enters number of players
      await user.type(playerInput(), "2");

      expect(playerInput().value).toBe("2");
    });

    it("allows the user to reserve lanes based on number of players (AC3)", async () => {
      const { user, laneInput } = renderBooking();

      // User selects number of lanes
      await user.type(laneInput(), "2");

      expect(laneInput().value).toBe("2");
    });

    it("shows an error when date is missing (AC4)", async () => {
      const { user, timeInput, playerInput, laneInput, submitButton } =
        renderBooking();

      // Date is intentionally left empty to trigger validation
      await user.type(timeInput(), "20:00");
      await user.type(playerInput(), "2");
      await user.type(laneInput(), "2");

      await user.click(submitButton());

      expect(
        screen.getByText(/alla fälten måste vara ifyllda/i)
      ).toBeInTheDocument();
    });

    it("shows an error when time is missing (AC4)", async () => {
      const { user, dateInput, playerInput, laneInput, submitButton } =
        renderBooking();

      // Time is intentionally left empty
      await user.type(dateInput(), "2025-12-20");
      await user.type(playerInput(), "2");
      await user.type(laneInput(), "2");

      await user.click(submitButton());

      expect(
        screen.getByText(/alla fälten måste vara ifyllda/i)
      ).toBeInTheDocument();
    });

    it("shows an error when number of players is missing (AC4)", async () => {
      const { user, dateInput, timeInput, laneInput, submitButton } =
        renderBooking();

      // Number of players is intentionally left empty
      await user.type(dateInput(), "2025-12-20");
      await user.type(timeInput(), "20:00");
      await user.type(laneInput(), "2");

      await user.click(submitButton());

      expect(
        screen.getByText(/alla fälten måste vara ifyllda/i)
      ).toBeInTheDocument();
    });

    it("shows an error when number of lanes is missing (AC4)", async () => {
      const { user, dateInput, timeInput, playerInput, submitButton } =
        renderBooking();

      // Number of lanes is intentionally left empty
      await user.type(dateInput(), "2025-12-20");
      await user.type(timeInput(), "20:00");
      await user.type(playerInput(), "2");

      await user.click(submitButton());

      expect(
        screen.getByText(/alla fälten måste vara ifyllda/i)
      ).toBeInTheDocument();
    });

    it("shows an error when multiple required fields are missing (AC4)", async () => {
      const { user, submitButton } = renderBooking();

      // User submits the form without filling in any required fields
      await user.click(submitButton());

      expect(
        screen.getByText(/alla fälten måste vara ifyllda/i)
      ).toBeInTheDocument();
    });

    it("shows an error when too many players are booked on one lane (AC5)", async () => {
      const { user, submitButton } = renderBooking();

      // Attempt to book more players than allowed on a single lane
      await fillBookingFormWithoutShoes(user, 5, 1);
      await addShoes(user, ["36", "39", "36", "38", "35"]);

      await user.click(submitButton());

      expect(
        screen.getByText(/det får max vara 4 spelare per bana/i)
      ).toBeInTheDocument();
    });
  });

  describe("US2 – Shoe size selection", () => {
    it("allows the user to select shoe size for each player (AC1, AC3, AC6)", async () => {
      const { user, playerInput, addShoeButton, shoeInputs } =
        renderBooking();

      // User adds players and corresponding shoe input fields
      await user.type(playerInput(), "2");
      await user.click(addShoeButton());
      await user.click(addShoeButton());

      const inputs = shoeInputs();
      expect(inputs).toHaveLength(2);

      // User enters shoe sizes
      await user.type(inputs[0], "36");
      await user.type(inputs[1], "42");

      expect(inputs[0]).toHaveValue("36");
      expect(inputs[1]).toHaveValue("42");
    });

    it("allows the user to change shoe size for a player (AC2)", async () => {
      const { user, playerInput, addShoeButton, shoeInputs } =
        renderBooking();

      await user.type(playerInput(), "2");
      await user.click(addShoeButton());
      await user.click(addShoeButton());

      const inputs = shoeInputs();

      // User changes previously entered shoe size
      await user.type(inputs[0], "36");
      await user.clear(inputs[0]);
      await user.type(inputs[0], "42");

      await user.type(inputs[1], "40");

      expect(inputs[0]).toHaveValue("42");
      expect(inputs[1]).toHaveValue("40");
    });

    it("shows an error when shoe size fields are left empty (AC4)", async () => {
      const { user, addShoeButton, submitButton } = renderBooking();

      // Shoe fields are added, but no sizes are entered
      await fillBookingFormWithoutShoes(user, 2, 1);
      await user.click(addShoeButton());
      await user.click(addShoeButton());

      await user.click(submitButton());

      expect(
        screen.getByText(/alla skor måste vara ifyllda/i)
      ).toBeInTheDocument();
    });

    it("shows an error when more shoes than players are selected (AC5)", async () => {
      const { user, submitButton } = renderBooking();

      await fillBookingFormWithoutShoes(user, 2, 1);
      await addShoes(user, ["36", "36", "36"]);

      await user.click(submitButton());

      expect(
        screen.getByText(/antalet skor måste stämma överens/i)
      ).toBeInTheDocument();
    });

    it("shows an error when fewer shoes than players are selected (AC5)", async () => {
      const { user, submitButton } = renderBooking();

      await fillBookingFormWithoutShoes(user, 4, 1);
      await addShoes(user, ["36", "36", "36"]);

      await user.click(submitButton());

      expect(
        screen.getByText(/antalet skor måste stämma överens/i)
      ).toBeInTheDocument();
    });
  });

  describe("US3 – Removing shoe size fields", () => {
    it("allows the user to remove a shoe input field (AC1, AC2)", async () => {
      const {
        user,
        playerInput,
        addShoeButton,
        shoeInputs,
        removeShoeButton,
      } = renderBooking();

      await user.type(playerInput(), "2");
      await user.click(addShoeButton());
      await user.click(addShoeButton());

      expect(shoeInputs()).toHaveLength(2);

      // User removes one shoe input field
      await user.click(removeShoeButton()[0]);

      expect(shoeInputs()).toHaveLength(1);
    });
  });

  describe("US4 – Completing the booking", () => {
    it("allows the user to submit a complete booking (AC1)", async () => {
      const { user, submitButton } = renderBooking();

      // User completes the entire booking flow
      await fillBookingForm(user, 2, 1);
      await user.click(submitButton());

      await waitFor(() => {
        expect(
          screen.queryByText(/alla fälten måste vara ifyllda/i)
        ).not.toBeInTheDocument();
      });
    });
  });
});
