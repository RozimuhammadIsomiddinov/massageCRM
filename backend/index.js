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

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MassageCRM API",
      version: "1.0.0",
      description: "This is the API documentation for CreditSale.",
    },
    servers: [
      {
        url: "http://213.139.210.248:3001/",
      },
    ],
  },
  apis: ["./routers/*.js"],
};

const specs = swaggerJsdoc(options);

app.use("/super-admin", superAdminRouter);
app.use("/admin", adminRouter);
app.use("/operator", operatorRouter);
app.use("/offer", offerRouter);
app.use("/branch", branchRouter);
app.use("/worker", workerRouter);

app.use("/api-swagger", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(process.env.PORT);
