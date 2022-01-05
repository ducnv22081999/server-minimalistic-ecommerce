const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 6969;

const route = require("./routes/");
const db = require("./config/db");

// // Connect to DB
db.connect();

// Use static folder
// app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(methodOverride("_method"));

// HTTP loggers
// app.use(morgan("combined"));

// access cors
const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes init
route(app);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
