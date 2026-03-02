require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const userRoutes = require("./route/userRoutes");
const sliderImageRoutes = require("./route/sliderImageRoutes");
const testimonialRoutes = require("./route/testimonialRoutes");
const projectRoutes = require("./route/projectRoutes");

const app = express();

app.set("trust proxy", 1);

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  }),
);

app.use("/api/auth", userRoutes);
app.use("/api/slider-images", sliderImageRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
