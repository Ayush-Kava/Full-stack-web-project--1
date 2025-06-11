const express = require("express");
const router = express.Router();

const {authMiddleware} = require("../middlewares/authmiddleware");
const upload = require("../middlewares/multer.js");
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
});

router.get('/addproperty',authMiddleware,async(req,res)=>{
  return res.render("add-property.hbs",{
    layout:"layouts/layout.hbs",
    isDetailPage: true,
  });
});

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
});

router.post(
  '/addproperty',
  authMiddleware,
  upload.single('image'),      // ← this handles the file from <input name="image">
  async (req, res) => {
    try {
      // 1) Extract fields
      const { address, price, beds, baths, size } = req.body;

      // 2) Get the saved file path
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

      // 3) Build the document
      const newProperty = new propertyModel({
        displayAddress: address,
        price: Number(price),
        bedrooms: Number(beds),
        bathrooms: Number(baths),
        size: Number(size),
        images: imagePath ? [imagePath] : [],
        title: address,             // or any title you want
        addedOn: new Date().toISOString(),
      });

      // 4) Save to MongoDB
      await newProperty.save();

      // 5) Redirect or render success
      res.redirect('/general/home');
    } catch (err) {
      console.error('Error adding property:', err);
      res.status(500).render('add-property', {
        error: 'Could not save property, please try again.',
      });
    }
  }
);

router.get("/delete/:id",authMiddleware,async(req,res)=>{
  try {
    const data = await propertyModel.findByIdAndDelete(req.params.id);
    if(!data){
      return res.status(404).send("Property not found");
    }
    return res.redirect("/general/home");
  } catch (error) {
    console.log("error in deleting property");
    return res.status(500).send("Error in deleting property");
  }
});


module.exports = router;
