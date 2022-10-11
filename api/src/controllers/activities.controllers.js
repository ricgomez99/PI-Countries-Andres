const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

const getActivities = async (req, res) => {
  const activities = await Activity.findAll();
  try {
    if (activities) return res.status(200).json(activities);
    else
      return res
        .status(404)
        .json(activities.length ? activities : "Unable to find activities");
  } catch (err) {
    console.log(err);
    res.json({ message: "Something went wrong" });
  }
};

const createActivity = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  try {
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });
    const country = await Country.findAll({
      where: {
        id: countries,
      },
    });
    for (const i of country) {
      await i.addActivity(newActivity.dataValues.id);
    }
    res.status(201).send("Actividad Creada");
  } catch (err) {
    res.status(404).send(`Error type ${err}`);
  }
  // try {
  //   if (name && difficulty && duration && season && countries) {
  //     const activity = await Activity.create({
  //       name,
  //       difficulty,
  //       duration,
  //       season,
  //     });

  //     countries.forEach(async (id) => {
  //       const country = await Country.findOne({
  //         where: {
  //           id: { [Op.iLike]: `%${id}%` },
  //         },
  //       });
  //       await country?.addActivity(activity);
  //     });
  //     await activity.addCountry(countries);
  //     return res.json(activity);
  //   } else {
  //     return res.status(404).send("No data found");
  //   }
  // } catch (err) {
  //   console.log(err);
  //   res.json({ message: "Something went wrong" });
  // }
};

module.exports = {
  getActivities,
  createActivity,
};
