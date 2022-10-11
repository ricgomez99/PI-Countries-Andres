const { Op, Country, Activity } = require("../db");

const getCountries = async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      const countries = await Country.findAll({
        include: [
          {
            model: Activity,
            attributes: ["name", "difficulty", "duration", "season"],
            through: { attributes: [] },
          },
        ],
      });

      if (countries) {
        return res.status(200).json(countries);
      } else {
        return res.status(404).send("Unable to find countries");
      }
    } else {
      const country = await Country.findAll({
        where: {
          name: { [Op.substring]: name },
        },
        include: [
          {
            model: Activity,
            attributes: ["name", "difficulty", "duration", "season"],
            through: { attributes: [] },
          },
        ],
      });
      if (country) {
        return res.status(200).json(country);
      } else {
        return res.status(404).send("Unable to find the country");
      }
    }
  } catch (err) {
    console.log(err);
    res.json({
      message: "Something went wrong :c",
    });
  }
};

const getCountiesById = async (req, res) => {
  const { id } = req.params;
  try {
    const country = await Country.findOne({
      where: {
        id: id.toUpperCase(),
      },
      include: [
        {
          model: Activity,
          attributes: ["name", "difficulty", "duration", "season"],
          through: { attributes: [] },
        },
      ],
    });
    if (country) {
      return res.status(200).json(country);
    } else {
      return res.status(404).send("Country not found");
    }
  } catch (err) {
    console.log(err);
    res.json({
      message: "Something went wrong :c",
    });
  }
};

module.exports = {
  getCountries,
  getCountiesById,
};
