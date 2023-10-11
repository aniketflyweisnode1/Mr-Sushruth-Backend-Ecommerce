const Faq = require("../Model/faqModel");
// const { createResponse } = require("../utils/response");

// Get all FAQs
const getAllFaqs = async (req, res) => {
    const faqs = await Faq.find();
  
    res.status(200).json({
      success: true,
      faqs,
    });
  };

// Get a specific FAQ by ID
const getFaqById = async (req, res) => {
    const { id } = req.params;
    try {
        const faq = await Faq.findById(id);
        if (!faq) {
            return res.status(404).json( "Not Found");
        }
        return res.status(200).json( "faqs retrieved successfully", faq);
    } catch (err) {
        console.log(err);
        return res.status(500).json( "Error", err.message);
    }
};

// Create a new FAQ
const createFaq = async (req, res) => {
    console.log("hi");
    const { question, answer } = req.body;
    // try {
        if (!question || !answer) {
            return res.status(404).json(
                "questions and answers cannot be blank"
            );
        }
        const faq = await Faq.create(req.body);
        console.log("hi");
        res.status(201).json({
            success: true,
            faq,
          });
        };
      

// Update an existing FAQ by ID
const updateFaq = async (req, res) => {
    const { id } = req.params;
    //     const { question, answer } = req.body;
    try {
        const faq = await Faq.findByIdAndUpdate(id, req.body, { new: true });
        if (!faq) {
            return res.status(200).json( "Not Found");
        }
        return res.status(200).json( "FAQ Updated Successfully", faq);
    } catch (err) {
        console.log(err);
        return res.status(500).json( "Something went wrong", err.message);
    }
};

// Delete an existing FAQ by ID
const deleteFaq = async (req, res) => {
    const { id } = req.params;
    try {
        const faq = await Faq.findByIdAndDelete(id);
        if (!faq) {
            return res.status(404).json( "Not Found");
        }
        return res.status(200).json( "FAQ Deleted Successfully", faq);
    } catch (err) {
        console.log(err);
        return res.status(500).json( "Something went wrong", err.message);
    }
};

module.exports = {
    getAllFaqs,
    getFaqById,
    createFaq,
    updateFaq,
    deleteFaq,
};
