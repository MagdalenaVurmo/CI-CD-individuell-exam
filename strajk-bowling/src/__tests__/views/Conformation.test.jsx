import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Confirmation from "../../views/Confirmation";
import userEvent from "@testing-library/user-event";
import { afterEach, expect } from "vitest";

describe("Confirmation view", () => {
 
  const mockConfirmation = {
    when: "2025-12-20T20:00",
    people: 2,
    lanes: 1,
    bookingId: "STR1234ABC",
    price: 340,
  };

 
  const renderConfirmation = () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

    return { user };
  };

 
  afterEach(() => {
    sessionStorage.clear();
  });

  describe("US5: As a user I want to be able to navigate between the booking view and the confirmation view ", () => {
    it("should show message 'Inga bokningar' if session storage is empty (AC2)", async () => {
    
      renderConfirmation();
      expect(screen.getByText(/inga bokning gjord/i)).toBeInTheDocument();
    });

    it("should show bookning if a booking exist in session storage (AC3)", async () => {
    
      sessionStorage.setItem("confirmation", JSON.stringify(mockConfirmation));
      renderConfirmation();

      
      expect(screen.getByText(/340 sek/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/who/i)).toHaveValue("2");
      expect(screen.getByLabelText(/lanes/i)).toHaveValue("1");
      expect(screen.getByLabelText(/booking number/i)).toHaveValue(
        "STR1234ABC"
      );
      expect(screen.queryByText(/inga bokning gjord/i)).not.toBeInTheDocument();
    });
  });
});