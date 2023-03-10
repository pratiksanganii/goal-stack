const path = require("path");
const express = require("express");
const { errorHandler } = require("./middlewares/errorMiddleware");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/api",(req,res)=>res.json("Welcome to the api."))
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// server frontend
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => 
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) =>
    res.send("You are in development mode, switch to production mode....")
  );
}

app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
