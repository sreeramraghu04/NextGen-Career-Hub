import express from "express";
import BodyParser from "body-parser";
import routes from "./src/routes/hireDevRoutes";
import cors from "cors";
import { connectDatabase } from "./dbAuth";
const logger = require("morgan");

const app = express();

app.use(logger("dev"));
//bodyparser setup
app.use(
  BodyParser.urlencoded({
    extended: true,
  })
);
app.use(BodyParser.json());

//Allowing cross origin requests
app.use(cors());

//serving static files
app.use(express.static("public/images"));

// connecting the app to our routes
routes(app);

//Connecting to the database
(async () => {
  try {
    await connectDatabase();
  } catch (error) {
    console.error("error in the main function:", error);
  }
})();

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server listening at ${PORT}`);
});
