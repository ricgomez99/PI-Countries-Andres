import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="Navbar">
      <span className="logo">TRAVELRY</span>
      <div className={`items ${isOpen && "open"}`}>
        <Link to="/" className="link">
          HOME
        </Link>
        <Link to="/about" className="link">
          ABOUT
        </Link>
        <Link to="/contact" className="link">
          CONTACT
        </Link>
      </div>
      <div className={`toggle ${isOpen && "open"}`} onClick={handleClick}>
        <div className="bar"></div>
      </div>
    </div>
  );
}
