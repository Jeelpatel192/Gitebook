// import { log } from "console";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import path from "path";

import "./passport/github.auth.js";

import userRoutes from "./routes/user.route.js";
import exploreRoutes from "./routes/explore.route.js";
import authRoutes from "./routes/auth.route.js";

import connectMongoDB from "./db/connectMongoDB.js";
import { log } from "console";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();  // run the server and client at same domain

console.log("dirname", __dirname);  // print the directory path in terminal


app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());


// app.get("/", (req, res) => {
//     res.send("Server is ready");
// });

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); 
app.use("/api/explore", exploreRoutes);



app.use(express.static(path.join(__dirname, "/frontend/dist")));


app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


// http://localhost:5000 both run the client and the server

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
    connectMongoDB();
})