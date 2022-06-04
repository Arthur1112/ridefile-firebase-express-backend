import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { profile } from "./src/getProfile.js";
import { dbConnect } from "./src/connectDB.js";

const app = express();
app.use(cors());
app.use(express.json());

const db = dbConnect();

app.get("/test", (req, res) => {
  res.send("Yaaay we are connected!!!");
});

app.get("/profile", profile);

app.post("/addNewProfile", async (req, res) => {
  await db.collection("UserProfiles").add(req.body);
  res.status(201).send("New profile added to database");
});

export const api = functions.https.onRequest(app);
