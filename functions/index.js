import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { profile } from "./src/getProfile.js";
import { dbConnect } from "./src/connectDB.js";
import jwt from "jsonwebtoken";
import mySecretKey from "./secret.js";
import updateProfile from "./src/updateProfile.js";

const app = express();
app.use(cors());
app.use(express.json());

const db = dbConnect();

app.get("/test", (req, res) => {
  res.send("Yaaay we are connected!!!");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userCol = await db
    .collection("UserProfiles")
    .where("email", "==", email.toLowerCase())
    .where("password", "==", password)
    .get()
    .then((userCol) => {
      if (userCol.docs.length == 0) {
        res
          .status(401)
          .send({ error: "Invalid Email or Password, please try again." });
        return;
      }
      let user = userCol.docs[0].data();
      user.id = userCol.docs[0].id;
      user.password = undefined;
      const token = jwt.sign(user, mySecretKey, { expiresIn: "1d" });
      res.send({ token, user });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.patch("/updateProfile/:id", updateProfile);

app.post("/addNewProfile", async (req, res) => {
  await db.collection("UserProfiles").add(req.body);
  res.status(201).send("New profile added to database");
});

export const api = functions.https.onRequest(app);

// app.get("/profile", profile);
// app.listen(7050, () => {
//   console.log("Listening on 7050");
// });
