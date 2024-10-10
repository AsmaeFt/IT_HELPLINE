const mongoose = require("mongoose");
const { schema } = require("./incidents");

const categorySchema = new schema({
  category: {
    type: String,
    required: [true, "category is required"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

const Category = mongoose.model("category", categorySchema);
module.exports = Category;
