require("dotenv").config();
const express = require("express");
const cors = require("cors");

const adminRouter = require("./routers/admin");
const operatorRouter = require("./routers/operator");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/admin", adminRouter);
app.use("/operator", operatorRouter);

app.listen(process.env.PORT);
