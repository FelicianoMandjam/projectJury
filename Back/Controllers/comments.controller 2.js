import { Comment } from "../Models/index.js";

const add = async (req, res, next) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json("A New status has been created !");
    if (!comment) res.status(404).json("No comment added ! ");
  } catch (error) {
    console.log(error);
    res.status(500).json("Problem to create a new comment!");
    next();
  }
};

const getAll = async (req, res, next) => {
  try {
    const comment = await Comment.findAll();
    console.log(comment);
    if (!comment) res.status(404).json("No category find!");
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json("Problem to find catergories!");
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findByPk(id);
    if (!comment) res.status(404).json("comment not found!");
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json("Problem to get the comment!");
    next();
  }
};

const deletebyId = async (req, res, next) => {
  try {
    const comment = await Comment.destroy({ where: { id: req.params.id } });
    console.log(comment);
    if (!comment) res.status(404).json("comment not found!");
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
  getById,
  deletebyId,
};
