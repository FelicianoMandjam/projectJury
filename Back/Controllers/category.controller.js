import { Category } from "../Models/index.js";

// POST
const add = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json("New category has been created");
    console.log(category);
  } catch (error) {
    console.log(error);
    res.status(500).json("Problem to create the category.");
    next();
  }
};

// GET
const getAll = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    console.log(categories);
    if (!categories) res.status(404).json("No category find!");
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json("Problem to find catergories!");
  }
};

const getOne = async (req, res, next) => {
  try {
    const category = await Category.findOne({ where: { name: req.body.name } });
    console.log(category);
    if (!category) res.status(404).json("Category not found!");
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json("Problem to get the Category!");
    next();
  }
};

const getById = async (req, res, next) => {
  try {
    const category = await Category.findByPk(res.params.id);

    if (!category) res.status(404).json("Category not found!");
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json("Problem to get the category!");
    next();
  }
};

// PUT
const updateById = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    await category.update(req.body);

    if (!category) res.status(404).json("Category not found !");

    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json("Problem to update the category");
    next();
  }
};

const deletebyId = async (req, res, next) => {
  try {
    const category = await Category.destroy({ where: { id: req.params.id } });
    console.log(category);
    if (!category) res.status(404).json("Category not found!");
    res.status(200).json("Category deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json("The delete has not work!");
    next();
  }
};

export default {
  add,
  getAll,
  getOne,
  getById,
  updateById,
  deletebyId,
};
