import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

var userIsAuthorized = false;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// CUSTOM Middleware
function passChecker(req, res, next) {
    var password = req.body["pazxcword"];
    if (password === "ILoveProgrammingJade!"){
        userIsAuthorized = true;
    } else {
        userIsAuthorized = false;
    }
    next();
}

// Using my Custom Middleware
app.use(passChecker);

// Routes
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
    if (userIsAuthorized){
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.redirect("/");
        // res.sendFile(__dirname + "/public/index.html");
    }
});

app.listen(PORT, () => {
    console.log(`The server is runnning in port: ${PORT}`);
});