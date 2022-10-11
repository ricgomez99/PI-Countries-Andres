import { React, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesDetail } from "../../Redux/Actions";
import Navbar from "../Navbar/Navbar";
import "./CountryDetails.css";

export default function CountryDetails(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const detail = useSelector((state) => state.detail);
  const { id } = props.match.params;

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/main");
  };

  useEffect(() => {
    dispatch(getCountriesDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <Navbar />
      <div className="card_container">
        <div className="card">
          <div className="card_body">
            <img src={detail.flagImg} className="card_image" />
            <h2 className="card_title">{detail.name}</h2>
            <div className="card_description">
              <p>{detail.continent}</p>
              <p>
                <span className="detail_title id">{detail.id}</span>
              </p>
              <p>
                <span className="detail_title">Capital:</span> {detail.capital}
              </p>
              <p>
                <span className="detail_title">Region:</span> {detail.subregion}
              </p>
              <p>
                <span className="detail_title">Area:</span> {detail.area}
              </p>
              <p>
                <span className="detail_title">Pop:</span> {detail.population}
              </p>
            </div>
            <div className="activities">
              <h2 className="activity_title">Activities</h2>
              <ul>
                {detail.Activities && detail.Activities.length ? (
                  detail.Activities.map((e) => {
                    return (
                      <div className="list_items">
                        <li>
                          <span className="act">{e.name}</span>
                        </li>
                        <li>
                          <span className="detail_title">Difficulty:</span>{" "}
                          {e.difficulty}
                        </li>
                        <li>
                          <span className="detail_title">Duration:</span>{" "}
                          {e.duration}
                        </li>
                        <li>
                          <span className="detail_title">Season:</span>{" "}
                          {e.season}
                        </li>
                      </div>
                    );
                  })
                ) : (
                  <p className="no-act">Activities Not Available</p>
                )}
              </ul>
            </div>
          </div>
          <Link to="/main">
            <button className="card_btn" onClick={(e) => handleClick(e)}>
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
