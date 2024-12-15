import { Comment, User, Post } from "../Models/index.js";
import { io } from "../Services/socket.js";

const add = async (req, res, next) => {
  try {
    const { postId, content, userId } = req.body;
    const comment = await Comment.create({ postId, content, userId });

    const updatedPost = await Post.findByPk(postId, {
      include: [{ model: Comment, as: "comments" }],
    });
    if (req.io) {
      req.io.emit("newComment", { postId, comment });
      console.log("Événement newComment émis :", { postId, comment });
    } else {
      console.log("Socket.io non attaché à req.");
    }

    res.status(201).json("A New comment has been created !", updatedPost);
    if (!comment) res.status(404).json("No comment added ! ");
  } catch (error) {
    console.log(error);
    res.status(500).json("Problem to create a new comment!");
    next();
  }
};

const getAll = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!comments || comments.length === 0) {
      return res.status(404).json("Aucun commentaire trouvé !");
    }

    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json("Problème lors de la récupération des commentaires !");
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
