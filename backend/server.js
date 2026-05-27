const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();


// MIDDLEWARE
app.use(cors());
app.use(express.json());


// ROUTES
const leadRoutes = require("./routes/leadRoutes");

app.use("/api/leads", leadRoutes);


// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});