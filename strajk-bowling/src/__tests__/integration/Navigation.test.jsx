import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Booking from "../../views/Booking";
import Confirmation from "../../views/Confirmation";
import userEvent from "@testing-library/user-event";

describe("Navigation", () => {
  // render router, and return userEvent and all elements needed in the tests
  const renderNavigation = () => {
    const user = userEvent.setup();

    // create a router to be able to navigate between views
    const router = createMemoryRouter(
      [
        { path: "/", element: <Booking /> },
        { path: "/confirmation", element: <Confirmation /> },
      ],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={router} />);

    return {
      user,
      navElement: () => screen.getByRole("navigation"),
      navIcon: () => screen.getAllByRole("img")[0],
      bookingLink: () => screen.getByRole("link", { name: /booking/i }),
      confirmationLink: () =>
        screen.getByRole("link", { name: /confirmation/i }),
    };
  };
  
  describe("US5: Navigation functionality", () => {
    it("should show navigation links when menu icon is clicked (AC1)", async () => {
      // Arrange
      const { user, navElement, navIcon } = renderNavigation();

      // navElement should be hidden initially
      expect(navElement()).not.toHaveClass("show-menu");

      // Act
      await user.click(navIcon());
      
      // Assert
      // when navicon is clicked, navElement should be visible
      expect(navElement()).toHaveClass("show-menu");
    });

    it("should be able navigate between booking and confirmation view (AC1)", async () => {
      // Arrange
      const { user, navIcon, confirmationLink, bookingLink } =
        renderNavigation();

      //should render bookingsite initially
      expect(screen.getByText(/when, what & who/i)).toBeInTheDocument();

      // Act
      // navigate to confirmation
      await user.click(navIcon());
      await user.click(confirmationLink());

      // Assert
      expect(screen.getByText(/see you soon/i)).toBeInTheDocument();

      // Act
      // navigate to booking
      await user.click(navIcon());
      await user.click(bookingLink());

      // Assert
      expect(screen.getByText(/when, what & who/i)).toBeInTheDocument();
    });
  });
});