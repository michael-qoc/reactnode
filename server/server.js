const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const path = require("path");
const compression = require("compression");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// create server
const app = express();

// Load models //this is optional when you want to create any data from constructor
// require("./models/User");
// require("./models/Article");

// Body parser middleware (should be before other app.use())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

///MongoDB config
const db = keys.mongoURI;

///connect to MongoDB through mongoose
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.log(error));

////configure session
app.use(
  session({
    // store: new RedisStore({
    //   url: process.env.REDIS_URL,
    //   secure: process.env.NODE_ENV=='production'
    // }),
    /// uncomment the above lines if your are using redis to store session
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
    /// uncomment the above lines if your are using MongoDB to store session
    resave: false,
    saveUninitialized: false,
    name: "myconnect.sid",
    secret: keys.sessionSecret,
    cookie: { maxAge: 60 * 60 * 1000 }
  })
);

// Use Routes
app.use(require("./routes"));

// Serve static assets if in production
///compress
app.use(compression());

// Set static folder
app.use(express.static(path.resolve(__dirname, "../", "build")));

// Serve static assets
app.get("*", (request, response) => {
  response.sendFile(path.resolve(__dirname, "../", "build", "index.html"));
});

/////PORT config and listening
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
