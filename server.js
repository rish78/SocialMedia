require("./configs/dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const api = require("./routes/api");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_PROD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

app.get('/', (req, res) =>{
    res.status(200).send("Let's go!");
})

app.use("/api", api);

app.listen(port, () => {                                           //Inititating server
    console.log(`Here we go, Engines started at ${port}.`);
  })