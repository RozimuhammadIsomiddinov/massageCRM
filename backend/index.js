require("dotenv").config();
const express = require("express");
const cors = require("cors");

const superAdminRouter = require("./routers/superAdmin");
const adminRouter = require("./routers/admin");
const operatorRouter = require("./routers/operator");
const offerRouter = require("./routers/offer");
const branchRouter = require("./routers/branch");
const workerRouter = require("./routers/worker");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use("/super-admin", superAdminRouter);
app.use("/admin", adminRouter);
app.use("/operator", operatorRouter);
app.use("/offer", offerRouter);
app.use("/branch", branchRouter);
app.use("/worker", workerRouter);
app.listen(process.env.PORT);
