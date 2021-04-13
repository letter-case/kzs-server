require("dotenv").config();

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const CronJob = require("cron").CronJob;
const cors = require("cors");
const logger = require("morgan");

const kzs = require("./routes/kzs");
const { schema, root } = require("./graphql");
// const { Kzs, sequelize } = require("./database/models");
// const { Op } = require("sequelize");


const corrsOptions = {
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin:
        process.env.NODE_ENV === "production"
            ? "https://xn--80aaaiojamk8cnkaej1f8d.xn--p1ai"
            : "http://localhost:3000",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
};


const app = express();

app.use(logger("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors(corrsOptions));

app.use("/", kzs);

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true, // Если true, то отображает GraphiQL
    })
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: "Some server error, plese, write to horse" });
});


// const job = new CronJob("0 */1 * * * *", async function () {
//     //TODO: db backup
//     console.log("Fireee");
// });
// job.start();

module.exports = app;
