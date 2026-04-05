import app from "./app.js";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import cloudinary from "cloudinary";

dotenv.config();

// ✅ DB CONNECT
dbConnection();

// ✅ CLOUDINARY
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/test", (req, res) => {
  res.send("Backend working");
});


app.get("/api/v1/user/test", (req, res) => {
  res.send("User route working");
});
// ✅ ADD THIS
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});



// ✅ START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("User route loaded");
});

