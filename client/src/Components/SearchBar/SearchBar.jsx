import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "./../../Redux/Actions/index";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    dispatch(getCountriesByName(e));
  };

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleChange = (e) => {
    let value = e.target.value;
    setName(value);
    handleInputChange(value);
  };

  const handleClear = () => {
    setName("");
  };
  return (
    <div className={`search ${isActive && "active"}`}>
      <div className="icon" onClick={handleClick}></div>
      <div className="input">
        <input
          type="text"
          placeholder="Search a Country"
          id="mysearch"
          value={name}
          onChange={handleChange}
        />
      </div>
      <span className="clear" onClick={handleClear}></span>
    </div>
  );
}
