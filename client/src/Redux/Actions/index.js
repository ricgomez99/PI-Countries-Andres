import axios from "axios";
import {
  FILTER_COUNTRIES,
  FILTER_BY_ACTIVITIES,
  GET_ACTIVITIES,
  GET_COUNTRIES,
  GET_COUNTRIES_BY_NAME,
  GET_COUNTRIES_QUERY,
  GET_COUNTRY_DETAIL,
  ORDER_COUNTRIES_ALF,
  ORDER_COUNTRIES_POP,
} from "../Action-types/action-types";

export function getCountries() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/countries", {});
    return dispatch({
      type: GET_COUNTRIES,
      payload: json.data,
    });
  };
}

export function filterByContinents(payload) {
  return {
    type: FILTER_COUNTRIES,
    payload,
  };
}

export function orderByName(payload) {
  console.log(payload);
  return {
    type: ORDER_COUNTRIES_ALF,
    payload,
  };
}

export function orderPop(payload) {
  return {
    type: ORDER_COUNTRIES_POP,
    payload,
  };
}

export function getCountriesByName(name) {
  console.log(name);
  return {
    type: GET_COUNTRIES_BY_NAME,
    payload: name,
  };
}

export function getCountriesDetail(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/countries/${id}`);
      return dispatch({
        type: GET_COUNTRY_DETAIL,
        payload: json.data,
      });
    } catch (err) {
      console.log(`Found error type ${err}`);
    }
  };
}

export function searchCountries(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        "http://localhost:3001/countries?name=" +
          name.charAt(0).toUpperCase() +
          name.slice(1)
      );
      return dispatch({
        type: GET_COUNTRIES_QUERY,
        payload: json.data,
      });
    } catch (err) {
      console.log(`Found error type ${err}`);
    }
  };
}

export function filterByActivities(activity) {
  return {
    type: FILTER_BY_ACTIVITIES,
    payload: activity,
  };
}

export function getActivities() {
  return async function (dispatch) {
    return axios
      .get(`http://localhost:3001/activities`)
      .then((info) => {
        return dispatch({
          type: GET_ACTIVITIES,
          payload: info.data,
        });
      })
      .catch((err) => console.log(`Error type ${err}`));
  };
}

export function createActivity(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/activities",
      payload
    );
    console.log(response);
    return response;
  };
}
