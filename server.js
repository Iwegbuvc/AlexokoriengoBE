require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const userRoutes = require("./route/userRoutes");
const sliderImageRoutes = require("./route/sliderImageRoutes");
const testimonialRoutes = require("./route/testimonialRoutes");
const projectRoutes = require("./route/projectRoutes");
const statRoutes = require("./route/statRoutes");
const contactRoutes = require("./route/contactRoutes");

const newsletterRoutes = require("./route/newsletterRoutes");

const app = express();

app.set("trust proxy", 1);

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "https://ngo-platform-a5xw.onrender.com",
      "https://alexokoriengofoundation.vercel.app",
      "https://www.alexokoriengo.com",
    ],
    credentials: true,
  }),
);

app.use("/api/auth", userRoutes);
app.use("/api/slider-images", sliderImageRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/stats", statRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/newsletters", newsletterRoutes);
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
