const { Router } = require("express");
const axios = require("axios");
const { Country } = require("../db");
const router = Router();
const {
  getCountries,
  getCountiesById,
} = require("../controllers/routes.controllers");

const getApiInfo = async () => {
  const response = await axios.get("https://restcountries.com/v3/all");
  //console.log(response);
  const info = await response.data.map((e) => {
    const country = {
      id: e.cca3,
      name: e.name.common,
      flagImg: e.flags[1],
      continent: e.continents[0],
      capital: e.capital != null ? e.capital[0] : "Data Not Found",
      subregion: e.subregion,
      area: e.area,
      population: e.population,
    };
    return country;
  });
  console.log(info.length);
  return info;
};

const countryIntoDb = async () => {
  try {
    const countries = await Country.findAll(); // SELECT * from countries
    //console.log("paises database", countries);
    if (!countries.length) {
      const info = await getApiInfo();
      await Country.bulkCreate(info);
      //console.log("RESULTADO", result);
    }
  } catch (err) {
    console.log(err);
  }
};

const loadCountry = async () => {
  await countryIntoDb();
};

loadCountry();

router.get("/countries", getCountries);

router.get("/countries/:id", getCountiesById);

module.exports = router;
