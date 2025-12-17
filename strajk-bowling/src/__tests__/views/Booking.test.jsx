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
  // render router, and get all elements needed in the tests
  const renderBooking = () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Booking />;
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
      submitButton: () => screen.getByRole("button", { name: /striiiiiike/i }),

    };
  };

  describe("US1: As a user I want to be able to book a date and time, and state number of players so I can reserve one or more lanes", () => {
    it("should be able to choose date and time (AC1)", async () => {
      // Arrange
      const { user, dateInput, timeInput } = renderBooking();

      // Act
      // choose date and time
      await user.type(dateInput(), "2025-12-20");
      await user.type(timeInput(), "20:00");

      // Assert
      expect(dateInput().value).toBe("2025-12-20");
      expect(timeInput().value).toBe("20:00");
    });

    it("should be able to choose total number of players (minimum one)(AC2)", async () => {
      //Arrange
      const { user, playerInput } = renderBooking();

      // Act
      // choose number of players
      await user.type(playerInput(), "2");

      // Assert
      expect(playerInput().value).toBe("2");
    });

    it("should be able to reserve one or more lanes depending on number of players(AC3)", async () => {
      // Arrange
      const { user, laneInput } = renderBooking();

      //Act
      // choose number of lanes
      await user.type(laneInput(), "2");

      // Assert
      expect(laneInput().value).toBe("2");
    });

    //ERROR TESTING
    it("should get an error message if  date is missing (AC4)", async () => {
      // Arrange
      const { user, timeInput, playerInput, laneInput, submitButton } =
        renderBooking();

      // Exclude date input
      await user.type(timeInput(), "20:00");
      await user.type(playerInput(), "2");
      await user.type(laneInput(), "2");

      //Act
      await user.click(submitButton());

      // Assert
      expect(
        screen.getByText(/alla fälten måste vara ifyllda/i)
      ).toBeInTheDocument();
    });

    it("should get an error message if  time is missing (AC4)", async () => {
      // Arrange
      const { user, dateInput, playerInput, laneInput, submitButton } =
        renderBooking();

      // Exclude time input
      await user.type(dateInput(), "2025-12-20");
      await user.type(playerInput(), "2");
      await user.type(laneInput(), "2");

      // Act
      await user.click(submitButton());

      // Assert
      expect(
        screen.getByText(/alla fälten måste vara ifyllda/i)
      ).toBeInTheDocument();
    });

    it("should get an error message if number of players is missing (AC4)", async () => {
      // Arrange
      const { user, dateInput, timeInput, laneInput, submitButton } =
        renderBooking();

      // Exclude number of players
      await user.type(dateInput(), "2025-12-20");
      await user.type(timeInput(), "20:00");
      await user.type(laneInput(), "2");

      // Act
      await user.click(submitButton());

      // Assert
      expect(
        screen.getByText(/alla fälten måste vara ifyllda/i)
      ).toBeInTheDocument();
    });

    it("should get an error message if number of lanes is missing (AC4)", async () => {
      // Arrange
      const { user, dateInput, timeInput, playerInput, submitButton } =
        renderBooking();

      // Exclude number of lanes
      await user.type(dateInput(), "2025-12-20");
      await user.type(timeInput(), "20:00");
      await user.type(playerInput(), "2");

      // Act
      await user.click(submitButton());

      // Assert
      expect(
        screen.getByText(/alla fälten måste vara ifyllda/i)
      ).toBeInTheDocument();
    });

    it("should get an error message if multipe fields are missing (AC4)", async () => {
      // Arrange
      const { user, submitButton } = renderBooking();

      // Exclude all input fields

      // Act
      await user.click(submitButton());

      // Assert
      expect(
        screen.getByText(/alla fälten måste vara ifyllda/i)
      ).toBeInTheDocument();
    });

    it("should get an error message when there are too many players(max 4) on a lane(AC5)", async () => {
      //Arrange
      const { user, submitButton } = renderBooking();

      // Tries to book 5 player on one lane
      await fillBookingFormWithoutShoes(user, 5, 1);
      await addShoes(user, ["36", "39", "36", "38", "35"]);

      //Act
      await user.click(submitButton());

      //Assert
      expect(
        screen.getByText(/det får max vara 4 spelare per bana/i)
      ).toBeInTheDocument();
    });
  });

  describe("US2: As a user I want to be able to choose shoe size for each player", () => {
    it("should be able to choose shoe size for each player in the reservation (AC1, AC3, AC6)", async () => {
      // Arrange
      const { user, playerInput, addShoeButton, shoeInputs } = renderBooking();

      // Add players and shoe fields
      await user.type(playerInput(), "2");
      await user.click(addShoeButton());
      await user.click(addShoeButton());

      const inputs = shoeInputs();
      expect(inputs).toHaveLength(2);

      // Act
      // Choose sizes for each player
      await user.type(inputs[0], "36");
      await user.type(inputs[1], "42");

      // Assert
      expect(inputs[0]).toHaveValue("36");
      expect(inputs[1]).toHaveValue("42");
    });

    it("should be able to change shoe size for each player (AC2)", async () => {
      // Arrange
      const { user, playerInput, addShoeButton, shoeInputs } = renderBooking();

      // Add players and shoe fields
      await user.type(playerInput(), "2");
      await user.click(addShoeButton());
      await user.click(addShoeButton());

      // Choose size on first pair of shoes
      const inputs = shoeInputs();
      await user.type(inputs[0], "36");
      expect(inputs[0]).toHaveValue("36");

      // Act
      //Update size on first pair of shoes
      await user.clear(inputs[0]);
      await user.type(inputs[0], "42");
      expect(inputs[0]).toHaveValue("42");

      //Choose size on second pair of shoes
      await user.type(inputs[1], "40");

      //Assert that shoesizes are correct
      expect(inputs[0]).toHaveValue("42");
      expect(inputs[1]).toHaveValue("40");
    });

    it("should show error 'Alla skor måste vara ifyllda' when shoe size field is empty(AC4)", async () => {
      //Arrange
      const { user, addShoeButton, submitButton } = renderBooking();

      // Fill booking form without shoes
      await fillBookingFormWithoutShoes(user, 2, 1);

      // Add shoe fields (but not fill shoe sizes)
      await user.click(addShoeButton());
      await user.click(addShoeButton());

      // Act
      await user.click(submitButton());

      //Assert
      expect(
        screen.getByText(/alla skor måste vara ifyllda/i)
      ).toBeInTheDocument();
    });

    it("should get an error 'Antalet skor måste stämma överens med antal spelare' when MORE shoes than players (AC5)", async () => {
      //Arrange
      const { user, submitButton } = renderBooking();

      // Fill booking form without shoes with 2 players
      await fillBookingFormWithoutShoes(user, 2, 1);

      // Add shoes for 3 players
      await addShoes(user, ["36", "36", "36"]);

      //Act
      await user.click(submitButton());

      //Assert
      expect(
        screen.getByText(/antalet skor måste stämma överens/i)
      ).toBeInTheDocument();
    });

    it("should get an error 'Antalet skor måste stämma överens med antal spelare' when FEWER shoes than players (AC5)", async () => {
      //Arrange
      const { user, submitButton } = renderBooking();

      // Fill booking form without shoes with 2 players
      await fillBookingFormWithoutShoes(user, 4, 1);

      // Add shoes for 3 players
      await addShoes(user, ["36", "36", "36"]);

      //Act
      await user.click(submitButton());

      //Assert
      expect(
        screen.getByText(/antalet skor måste stämma överens/i)
      ).toBeInTheDocument();
    });
  });

  describe("US3: As a user I want to be able to remove a shoe size field if I accidently book more shoes than necessary", () => {
    it("should be able to remove existing shoe size field and updating the bookning(AC1, AC2)", async () => {
      //Arrange
      const { user, playerInput, addShoeButton, shoeInputs, removeShoeButton } = renderBooking();

      // Choose 3 players and add add shoe input field
      await user.type(playerInput(), "2");
      await user.click(addShoeButton());
      await user.click(addShoeButton());

      expect(shoeInputs()).toHaveLength(2);

      //Act
      // Remove input field
      await user.click(removeShoeButton()[0]);

      //Assert
      // Should only be one shoe input field
      expect(shoeInputs()).toHaveLength(1);
    });
  });

  describe("US4: As a user I want to be able to send my reservation request and get a bookning number and total amount", () => {
    it("should be able to complete bookingby clicking booking button (AC1)", async () => {
      //Arrange
      const { user, submitButton } = renderBooking();

      // Fill complete booking form
      await fillBookingForm(user, 2, 1);

      // Act
      await user.click(submitButton());

      //Assert
      await waitFor(() => {
        expect(
          screen.queryByText(/alla fälten måste vara ifyllda/i)
        ).not.toBeInTheDocument();
      });
    });
  });
});