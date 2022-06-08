import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { profile } from "./src/getProfile.js";
import { dbConnect } from "./src/connectDB.js";
import jwt from "jsonwebtoken";
import mySecretKey from "./secret.js";

const app = express();
app.use(cors());
app.use(express.json());

const db = dbConnect();

app.get("/test", (req, res) => {
  res.send("Yaaay we are connected!!!");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  let user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) {
    res
      .status(400)
      .send({ error: "Invalid Email or Password, please try again." });
    return;
  }
  user.password = undefined;
  const token = jwt.sign(user, mySecretKey, { expiresIn: "1d" });
  res.send({ token });
});

app.get("/private", (req, res) => {
  const token = req.headers.authorization || "";
  if (!token) {
    res.status(401).send({ error: "You must be logged in access this page." });
    return;
  }
  jwt.verify(token, mySecretKey, (err, decoded) => {
    if (err) {
      res
        .status(401)
        .send({
          error: "You must use a valid authentication token to see this" + err,
        });
      return;
    }
    res.send({ message: `Welcome ${decoded.rideOwner}!` });
  });
});

app.get("/profile", profile);

app.post("/addNewProfile", async (req, res) => {
  await db.collection("UserProfiles").add(req.body);
  res.status(201).send("New profile added to database");
});

export const api = functions.https.onRequest(app);
