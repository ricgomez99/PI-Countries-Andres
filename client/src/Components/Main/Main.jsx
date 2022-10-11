import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  filterByActivities,
  orderByName,
  filterByContinents,
  orderPop,
} from "./../../Redux/Actions/index";
import Navbar from "../Navbar/Navbar";
import SearchBar from "../SearchBar/SearchBar";
import "./Main.css";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";

export default function Main() {
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState(true);
  const [popOrder, setPopOrder] = useState(true);
  let shownCountries = 10;
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);

  if (currentPage === 1) shownCountries = 9;

  const lastCountryIndex = currentPage * shownCountries;
  const firstCountryIndex = lastCountryIndex - shownCountries;
  const currentCountries = allCountries.slice(
    firstCountryIndex,
    lastCountryIndex
  );

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handleFilteredByContinent = (e) => {
    const { value } = e.target;
    dispatch(filterByContinents(value));
  };

  const handleFilteredActivity = (e) => {
    const { value } = e.target;
    dispatch(filterByActivities(value));
  };

  function handleSortByName(e) {
    setOrder(!order);
    dispatch(orderByName(order));
  }

  function handleSortPop(e) {
    setPopOrder(!popOrder);
    dispatch(orderPop(popOrder));
  }

  //  Activities  filter

  const allActivities = [];
  for (let i = 0; i < allCountries.length; i++) {
    if (allCountries[i].Activities[i] !== []) {
      allActivities.push(allCountries[i].Activities);
    }
  }

  const uniqueActivities = allActivities.filter((e) => e.length);

  const filteredActivities = [];

  for (const e of uniqueActivities) {
    for (let i = 0; i < e.length; i++) {
      filteredActivities.push(e[i].name);
    }
  }

  //   console.log(filteredActivities);

  //Continent Filter

  const uniqueContinent = [];
  for (let i = 0; i < allCountries.length; i++) {
    uniqueContinent.push(allCountries[i].continent);
  }
  const newContinent = [...new Set(uniqueContinent)];

  return (
    <div>
      <Navbar />
      <div className="main">
        <div className="search-container">
          <SearchBar />
        </div>
        <div className="filters">
          <button className="alpha" onClick={(e) => handleSortByName(e)}>
            {order ? (
              <i className="fa-solid fa-arrow-up-a-z"></i>
            ) : (
              <i className="fa-solid fa-arrow-down-z-a"></i>
            )}
          </button>
          <button className="pop-btn" onClick={(e) => handleSortPop(e)}>
            {popOrder ? (
              <i className="fa-solid fa-sort-up"></i>
            ) : (
              <i className="fa-solid fa-sort-down"></i>
            )}
          </button>

          <select
            className="selector"
            onChange={(e) => handleFilteredByContinent(e)}
          >
            <option value="All">CONTINENTS</option>
            <option value={newContinent[0]}>{newContinent[0]}</option>
            <option value={newContinent[1]}>{newContinent[1]}</option>
            <option value={newContinent[2]}>{newContinent[2]}</option>
            <option value={newContinent[3]}>{newContinent[3]}</option>
            <option value={newContinent[4]}>{newContinent[4]}</option>
            <option value={newContinent[5]}>{newContinent[5]}</option>
            <option value={newContinent[6]}>{newContinent[6]}</option>
          </select>

          <select
            className="selector"
            onChange={(e) => handleFilteredActivity(e)}
          >
            <option value="All">ACTIVITIES</option>
            {filteredActivities &&
              filteredActivities.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
          </select>
        </div>
        <div className="container">
          {currentCountries?.map((e) => {
            return (
              <div key={e.id} className="wrapper">
                <Card
                  image={e.flagImg}
                  name={e.name}
                  continent={e.continent}
                  key={e.id}
                  id={e.id}
                />
              </div>
            );
          })}
        </div>

        <div className="footer">
          <Paginate
            shownCountries={shownCountries}
            allCountries={allCountries.length}
            pagination={pagination}
          />
        </div>
      </div>
    </div>
  );
}
