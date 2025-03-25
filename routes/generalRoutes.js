const express = require("express");
const router = express.Router();
const hbs = require("hbs");
const { propertyModel } = require("../model/property-model");
const {authMiddleware } =require("../middlewares/authmiddleware"); 


router.get("/home",authMiddleware, async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get page number from URL
  const itemsPerPage = 10; // Number of items per page
  const skip = (page - 1) * itemsPerPage; // Calculate the number of items to skip
  const maxPrice = req.query.price
    ? parseInt(req.query.price)
    : null;

  try {
    let query = {};
    if (maxPrice) {
      query.price = {
        $lte: maxPrice
      }; // Add price filter if provided
    }
    const totalItems = await propertyModel.countDocuments(query); // Get total number of items
    const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages

    const paginatedData = await propertyModel.find(query).skip(skip).limit(itemsPerPage); // Get data for the current page
    if (paginatedData.length === 0) {
      return res.render("index.hbs", {error: "Please increas your budget,sir!!"});
    }
    res.render("index.hbs", {
      layout:"layouts/layout.hbs",
      data: paginatedData,
      currentPage: page,
      totalPages: totalPages
    });
  } catch (error) {
    res.status(500).send("Error loading data");
  }
});

router.get('/contact',authMiddleware,async(req,res)=>{
  return res.render("contact.hbs",{
    layout:"layouts/layout.hbs",
    isDetailPage: true,
  });
});


hbs.registerHelper("range", function (start, end) {
  let range = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
});


module.exports = router;