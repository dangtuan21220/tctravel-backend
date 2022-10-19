import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
import initAPIRoute from "./route/api";
import cors from "cors";


require("dotenv").config();

const app = express();
const port = process.env.PORT || 3030;

app.use(cors({ origin: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setup view engine
configViewEngine(app);

// init web route
initWebRoute(app);
// init api route
initAPIRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
