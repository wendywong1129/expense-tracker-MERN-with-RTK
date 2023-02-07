const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/connection");

dotenv.config({ path: "./config.env" });

connectDB();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(require("./routes/route"));

app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});
