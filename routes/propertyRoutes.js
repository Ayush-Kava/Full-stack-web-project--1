const express = require("express");
const router = express.Router();

const {authMiddleware} = require("../middlewares/authmiddleware");
const {propertyModel} = require("../model/property-model");



router.get("/home/:id", authMiddleware, async (req, res) => {
  try {
    const data = await propertyModel.findById(req.params.id);
    const formattedData = {
      ...data.toObject(), // Convert Mongoose document to plain object
      updatedAtFormatted: new Date(data.updatedAt * 1000).toLocaleDateString(),
      addedOnFormatted: new Date(data.addedOn * 1000).toLocaleDateString(),
    };
    
    res.render("detail.hbs", {layout:"layouts/layout.hbs", data: formattedData ,isDetailPage: true});
  } catch (error) {
    res.status(500).send("Property not found,Bruhhhhhhh!");
    console.log("error in ifnding home detail");
  }
});

router.get("/edit/:id",authMiddleware, async(req,res)=>{
  const data = await propertyModel.findById(req.params.id);
  if(!data){
    console.log("property not available");
    return res.status(404).send("Property not available")
  }
  return res.render("edit.hbs",{layout: "layouts/layout.hbs",isDetailPage: true, data: data});
})

router.post("/update-user/:id",authMiddleware,async(req,res)=>{
  try {
    const updateUser = await propertyModel.findByIdAndUpdate(
      req.params.id,
      {
        price: req.body.price,
        displayAddress: req.body.Address,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        size: req.body.size
      }

    );
    return res.redirect(`/property/home/${req.params.id}`)
  } catch (error) {
    res.status(400).json({error: "Error in updating user"})
  }
})

module.exports = router;
