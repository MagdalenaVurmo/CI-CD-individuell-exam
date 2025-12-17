import "./Confirmation.scss";
import { useLocation } from "react-router-dom";

import Top from "../components/Top/Top";
import Navigation from "../components/Navigation/Navigation";
import Input from "../components/Input/Input";

function Confirmation() {
  const { state } = useLocation();

  const confirmation =
    state?.confirmationDetails ||
    JSON.parse(sessionStorage.getItem("confirmation"));

  return (
    //added 'name' on input to get correkt between label and input
    <section className="confirmation">
      <Navigation />
      <Top title="See you soon!" />
      {state || confirmation ? (
        <form className="confirmation__details">
          <Input
            label="When"
            type="text"
            customClass="confirmation__input"
            name='when'
            defaultValue={confirmation.when.replace("T", " ")}
            disabled="disabled"
          />
          <Input
            label="Who"
            type="text"
            customClass="confirmation__input"
            name='people'
            defaultValue={confirmation.people}
            disabled="disabled"
          />
          <Input
            label="Lanes"
            type="text"
            customClass="confirmation__input"
            name='lanes'
            defaultValue={confirmation.lanes}
            disabled="disabled"
          />
          <Input
            label="Booking number"
            type="text"
            customClass="confirmation__input"
            name='bookingId'
            defaultValue={confirmation.bookingId}
            disabled="disabled"
          />
          <article className="confirmation__price">
            <p>Total:</p>
            <p>{confirmation.price} sek</p>
          </article>
          <button className="button confirmation__button">
            Sweet, let's go!
          </button>
        </form>
      ) : (
        <h2 className="confirmation__no-booking">Inga bokning gjord!</h2>
      )}
    </section>
  );
}

export default Confirmation;