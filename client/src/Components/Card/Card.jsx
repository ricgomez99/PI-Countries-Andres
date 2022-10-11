import { React } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card(props) {
  return (
    <div className="card">
      <div className="card_body">
        <img src={props.image} className="card_image" />
        <h2 className="card_title">{props.name}</h2>
        <p className="card_description">{props.continent}</p>
      </div>
      <Link to={`/countries/${props.id}`}>
        <button className="card_btn">View More</button>
      </Link>
    </div>
  );
}
