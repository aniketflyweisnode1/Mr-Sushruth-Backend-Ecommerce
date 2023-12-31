const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    { img: { type: String, default:"" } }
  ],
  // images: [
  //   {
  //     img: {
  //       type: String,
  //       default:""
  //       // default: 'https://res.cloudinary.com/dtijhcmaa/image/upload/v1687429143/product-images/plbhsjutcjkawqv4onal.jpg', // Provide the default image path here
  //     },
  //   },
  // ],
  
  size: {
    type: String

  },
  colors: {
    type: String
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: [true, "Please Enter Product Category"],
  },
  subCategory: {
    type: mongoose.Schema.ObjectId,
    ref: "SubCategory",
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: ["Stock cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
productSchema.plugin(mongoosePaginate);
productSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model("Product", productSchema);
