const ContactUs = require("../Model/contactUs");
// const { createResponse } = require("../utils/response");

// Get the about us information
const create = async (req, res) => {
    try {
        const contactUs = await ContactUs.create(req.body);
        res.status(200).json({
            details: contactUs,
          });
      
    } catch (err) {
        console.error(err);
        return res.status(500).json( "Server error");
    }
};
const getContactUs = async (req, res) => {
    try {
        const data = await ContactUs.find();
        // console.log(data);
        res.status(200).json({
            contactus : data
        })
        
    }catch(err)
    {
        res.status(400).send({mesage : err.mesage});
    }
}
module.exports = { create, getContactUs};