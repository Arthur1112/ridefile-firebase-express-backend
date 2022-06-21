import { dbConnect } from "./src/connectDB.js";

export default function updateProfile(req, res) {
  const { id } = req.params;
  if (!id) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = dbConnect();
  db.collection("UserProfiles")
    .doc(id)
    .update(req.body)
    .then(() => {
      res.send("User updated.");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}
