import { Link } from "react-router-dom";
import "./Card.css";

function Card({ image, text }) {
  const identifier = text.match(/\b\w+\b/)[0].toLowerCase();
  return (
    <div className="card" id={`card-${identifier}`}>
      <Link to={identifier}>
        <img src={`/${image}`} alt={text} />
        <h1>{text}</h1>
      </Link>
    </div>
  );
}

export default Card;
