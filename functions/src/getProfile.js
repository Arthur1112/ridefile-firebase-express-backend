import { dbConnect } from "./connectDB.js";

export const profile = async (req, res) => {
  const db = dbConnect();
  const profile = await db.collection("UserProfiles").get();
  const profileArray = profile.docs.map((doc) => doc.data());
  res.status(200).send(profileArray);
};
