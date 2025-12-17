import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Booking from "../../views/Booking";
import Confirmation from "../../views/Confirmation";
import userEvent from "@testing-library/user-event";

describe("Navigation", () => {
  
  const renderNavigation = () => {
    const user = userEvent.setup();

    
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
     
      const { user, navElement, navIcon } = renderNavigation();

      
      expect(navElement()).not.toHaveClass("show-menu");

     
      await user.click(navIcon());
      
      
      expect(navElement()).toHaveClass("show-menu");
    });

    it("should be able navigate between booking and confirmation view (AC1)", async () => {
     
      const { user, navIcon, confirmationLink, bookingLink } =
        renderNavigation();

      
      expect(screen.getByText(/when, what & who/i)).toBeInTheDocument();

      
      await user.click(navIcon());
      await user.click(confirmationLink());

      
      expect(screen.getByText(/see you soon/i)).toBeInTheDocument();

      
      await user.click(navIcon());
      await user.click(bookingLink());

     
      expect(screen.getByText(/when, what & who/i)).toBeInTheDocument();
    });
  });
});