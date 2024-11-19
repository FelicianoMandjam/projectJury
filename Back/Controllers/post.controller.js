import { Post } from "../Models/index.js";
import { io } from "../Services/socket.js";

// POST
const add = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    console.log(post);
    // Emet un évenement websocvket pour le client
    io.emit("newPublication", post);
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json("Problem to create the post.");
    next();
  }
};

// GET
const getAll = async (req, res, next) => {
  try {
    const posts = await Post.findAll();
    console.log(posts);
    if (!posts) res.status(404).json("No Post find!");
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json("Problem to find posts!");
  }
};

const getOne = async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { title: req.body.title } });
    console.log(Post);
    if (!post) res.status(404).json("Pospost not found!");
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json("Problem to get the post!");
    next();
  }
};

const getById = async (req, res, next) => {
  try {
    const post = await Post.findByPk(res.params.id);

    if (!post) res.status(404).json("Post not found!");
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json("Problem to get the post!");
    next();
  }
};

const updateById = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    await post.update(req.body);

    if (!post) res.status(404).json("User not found !");

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json("Problem to update the Post");
    next();
  }
};

const deletebyId = async (req, res, next) => {
  try {
    const post = await Post.destroy({ where: { id: req.params.id } });
    console.log(post);
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
