import { React } from "react";
import "./Paginate.css";

export default function Paginate({ shownCountries, allCountries, pagination }) {
  const numOfPages = [];

  for (let i = 1; i <= Math.ceil(allCountries / shownCountries); i++) {
    numOfPages.push(i);
  }

  return (
    <div>
      <ul>
        {numOfPages &&
          numOfPages.map((number) => {
            return (
              <button
                key={number}
                className={`numOfPages`}
                onClick={() => {
                  pagination(number);
                }}
              >
                {number}
              </button>
            );
          })}
      </ul>
    </div>
  );
}
