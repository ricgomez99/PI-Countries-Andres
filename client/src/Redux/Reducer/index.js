import {
  FILTER_COUNTRIES,
  FILTER_BY_ACTIVITIES,
  GET_COUNTRIES,
  GET_COUNTRIES_BY_NAME,
  GET_ACTIVITIES,
  ORDER_COUNTRIES_ALF,
  ORDER_COUNTRIES_POP,
  GET_COUNTRY_DETAIL,
  ADD_ACTIVITIES,
  GET_COUNTRIES_QUERY,
} from "../Action-types/action-types";

const initialState = {
  countries: [],
  allCountries: [],
  allActivities: [],
  activities: [],
  detail: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };
    case FILTER_COUNTRIES:
      const allCountries = state.allCountries;
      console.log(action.payload);
      const filteredContinent =
        action.payload === "All"
          ? allCountries
          : allCountries.filter((e) => e.continent === action.payload);

      return {
        ...state,
        countries: filteredContinent,
      };
    case ORDER_COUNTRIES_ALF:
      let sorted =
        action.payload === true
          ? state.countries?.sort((a, b) => a.name.localeCompare(b.name))
          : state.countries?.sort((a, b) => b.name.localeCompare(a.name));
      console.log(sorted);
      return {
        ...state,
        countries: sorted,
      };
    case ORDER_COUNTRIES_POP:
      let popSorted =
        action.payload === true
          ? state.countries.sort((a, b) => {
              if (a.population > b.population) return 1;
              if (b.population > a.population) return -1;

              return 0;
            })
          : state.countries.sort((a, b) => {
              if (a.population > b.population) return -1;
              if (b.population > a.population) return 1;

              return 0;
            });

      return {
        ...state,
        countries: popSorted,
      };
    case GET_COUNTRY_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case ADD_ACTIVITIES:
      return { ...state };

    case GET_ACTIVITIES:
      return { ...state, allActivities: action.payload };

    case GET_COUNTRIES_QUERY:
      return { ...state, countries: action.payload };

    case GET_COUNTRIES_BY_NAME:
      console.log(action.payload);
      let name =
        action.payload === ""
          ? state.allCountries
          : state.countries.filter((e) =>
              e.name.toLowerCase().includes(action.payload.toLowerCase())
            );
      console.log(action.payload);
      return {
        ...state,
        countries: name,
      };

    case FILTER_BY_ACTIVITIES:
      const countries = state.allCountries;
      const filteredActivity =
        action.payload === "All"
          ? countries
          : countries
              .map((e) => {
                let info;
                for (let key in e.Activities) {
                  if (e.Activities[key].name === action.payload) {
                    info = e;
                  }
                }
                return info;
              })
              .filter((e) => e);

      console.log(filteredActivity);
      return {
        ...state,
        countries: filteredActivity,
      };

    default:
      return state;
  }
}
