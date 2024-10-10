const Category = require("../models/categoriesF");

exports.postCategory = async (req, res) => {
  const { category } = req.body;

  try {
    const existCategory = await Category.findOne({ category });
    if (existCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }
    const newCategory = new Category({ category });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(201).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
