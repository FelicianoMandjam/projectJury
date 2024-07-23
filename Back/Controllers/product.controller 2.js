import { Product } from "../Models/index.js";

// POST
const add = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json("New product has been created");
    console.log(product);
  } catch (error) {
    console.log(error);
    res.status(500).json("Problem to create the product.");
    next();
  }
};

// GET
const getAll = async (req, res, next) => {
  try {
    const categories = await Product.findAll();
    console.log(categories);
    if (!categories) res.status(404).json("No product find!");
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json("Problem to find catergories!");
  }
};

const getOne = async (req, res, next) => {
  try {
    const product = await Product.findOne({ where: { name: req.body.name } });
    console.log(product);
    if (!product) res.status(404).json("product not found!");
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json("Problem to get the product!");
    next();
  }
};

const getById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(res.params.id);

    if (!product) res.status(404).json("product not found!");
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json("Problem to get the product!");
    next();
  }
};

const updateById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.update(req.body);

    if (!product) res.status(404).json("User not found !");

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json("Problem to update the product");
    next();
  }
};

const deletebyId = async (req, res, next) => {
  try {
    const product = await Product.destroy({ where: { id: req.params.id } });
    console.log(product);
    if (!product) res.status(404).json("product not found!");
    res.status(200).json("User deleted");
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
