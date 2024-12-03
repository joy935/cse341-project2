const { Schema } = require("mongoose");

const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Books API",
    description: "Simple API to manage books",
  },
  host: "cse341-project2-mszp.onrender.com",
  schemes: ["https", "http"],
};

const outputFile = "./swagger.json";
const routes = ["./routes/index.js"];

swaggerAutogen(outputFile, routes, doc);
