const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const propertyRoutes = require("./propertyRoutes");
const generalRoutes = require("./generalRoutes");

// Add base paths
router.use("/auth", authRoutes);
router.use("/property", propertyRoutes);
router.use("/general", generalRoutes);
router.get("/", (req, res) => {
    res.redirect("/auth/login");
});

module.exports = router;
