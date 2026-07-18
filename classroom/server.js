const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");

app.use (cookieParser("secretcode"));

app.get("/getsignedcookie", (req, res) => {
    res.cookie("Made-In", "India", { signed: true });
    res.send("Signed cookie sent");
});

app.get("/verify", (req, res) => {
    console.log(req.signedCookies);
    res.send("verified");
});

app.get("/getcookies", (req, res) => {
    res.cookie("great", "Namaste");
    res.cookie("MadeIn", "India");
    res.send("Sent you some cookies!");
});

app.get("/greet", (req, res) => {
    let { Name = "anonymous" } = req.cookies;
    res.send(`Hi, ${Name}`);
});

app.get("/", (req, res) => {
    console.dir(req.cookies);
    res.send("Hii, I am root!");
});

app.use("/users", users);
app.use("/posts", posts);

app.listen(3000, () => {
    console.log("Server is listening to 3000");
});