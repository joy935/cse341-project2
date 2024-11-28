const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const mongodb = require("./data/database");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");
const routes = require('./routes');

const PORT = process.env.PORT || 3030;
const app = express();

app 
    .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(express.json())
    .use(session({ 
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    // basic express session({...}) initialization
    .use(passport.initialize()) // init passport on every route call
    .use(passport.session()) // allow passport to use "express-session"
    .use((req, res, next) => { 
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Z-key, Authorization"
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, PUT, DELETE, OPTIONS"
        );
        next();
    })
    .use(cors({ methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"] }))
    .use(cors({ origin: "*" }))
    .use('/', routes);

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
    },
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

// check the session 
app.get("/", (req, res) => { 
    res.send(req.session.user != undefined ? 
        `Logged in as ${req.session.user.displayName}` : "Logged out"
    )});

// login with github
app.get("/github/callback", passport.authenticate("github", { 
    failureRedirect: "/api-docs", session: false }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect("/");
    }
);

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  });

mongodb.initDb((error) => {
    if (error) {
        console.log("Error connecting to database");
    } else {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
});