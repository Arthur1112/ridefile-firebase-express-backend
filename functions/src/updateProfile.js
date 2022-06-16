export default function updateProfile(req, res) {
  const { id } = user;
  if (!id) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
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
