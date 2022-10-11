const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const country = require("./country");
const activity = require("./activity");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", country);
router.use("/", activity);

// router.get("/countries", loadCountry);
// router.post("/activities", createActivity);

//router.get("/countries/:id", getCountiesById);

module.exports = router;
