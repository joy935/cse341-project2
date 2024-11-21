const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const mongodb = require("./data/database");

const PORT = process.env.PORT || 3030;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
const routes = require('./routes');
app.use('/', routes);

mongodb.initDb((error) => {
    if (error) {
        console.log("Error connecting to database");
    } else {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
});