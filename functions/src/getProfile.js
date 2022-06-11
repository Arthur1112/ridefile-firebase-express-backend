import { dbConnect } from "./connectDB.js";

export const profile = async (req, res) => {
  const profileID = req.params.profileID;

  const db = dbConnect();
  const profile = await db.collection("UserProfiles").get();
  // .then((snapshot) => setUserDetails(snapshot.data()));
  const profileArray = profile.docs.map((doc) => doc.data());
  res.status(200).send(profileArray);
};
