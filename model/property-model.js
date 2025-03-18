const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    images: {type: Array},
    price: { type: Number,required: true},
    bedrooms: {type: Number},
    bathrooms: {type: Number},
    size: {type: Number},
    displayAddress: {type: String, required: true},
    title:{type: String,required: true},
    type: {type: String},
    purpose: {type: String},
    property_age: {type: String},
    furnished: {type: String},
    updatedAt: {type: String},
    completionStatus: {type: String},
    description: {type: String},
    addedOn: {type: String},
    amenities: {type: Array},
    developer: {type: Array},
    buildingInfo: {type: Array},
    agent_profile_pic: {type: String},
    agent_name: { type: String},
    agency_name: {type: String},
    permit_number: {type: String},
    ded: {type: String},
    rera: {type: String},
    refer_id: {type: String},
    brn: {type: String},
    // agency_name: {type: String},
    // agency_name: {type: String},

    // uuuuuuuuuuuu
    // coordinates: {type: Object},
    // agent: {type: String},
    // agencyName: {type: String},
    // agencyEmail: {type: String},
    // agentPhone: {type: String},
    // agentWhatsapp: {type: String},
    // agentEmail: {type: String},
    // propertyType: {type: String},
    // buildingInfo: {type: String},
    // validatedInfo: {type: String},
    // reraDedLicenceNo: {type: String},
    // propertyReference: {type: String},
    // id: {type: String},
});

const propertyModel = mongoose.model("propertys",propertySchema);

module.exports = {
    propertyModel
}