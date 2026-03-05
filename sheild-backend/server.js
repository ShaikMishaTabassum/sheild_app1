const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const sosRoute = require("./routes/sos");
const healthRoute = require("./routes/health");

app.use("/api/sos", sosRoute);
app.use("/api/health", healthRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`SHEild backend running on port ${PORT}`);
});