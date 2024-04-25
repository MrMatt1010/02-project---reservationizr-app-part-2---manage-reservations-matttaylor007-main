import { Link } from "react-router-dom";
import "./CreateReservation";

const ReserveButton = () => {
  return (
    <p className="center">
      <Link to="./CreateReservation" className="btn btn-center">
        &larr; Create a reservation
      </Link>
    </p>
  );
};

export default ReserveButton;
