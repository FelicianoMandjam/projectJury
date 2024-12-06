import { Comment, User } from "../Models/index.js";

const add = async (req, res, next) => {
  try {
    const { postId, content, userId } = req.body;
    const comment = await Comment.create({ postId, content, userId });
    res.status(201).json("A New comment has been created !");
    if (!comment) res.status(404).json("No comment added ! ");
  } catch (error) {
    console.log(error);
    res.status(500).json("Problem to create a new comment!");
    next();
  }
};

//////// NEW ADD /////////::
// const add = async (req, res, next) => {
//   try {
//     const { postId, content } = req.body;
//     const userId = req.user?.id; // Assurez-vous que l'utilisateur est inclus dans la requête (via middleware auth)

//     if (!userId) {
//       return res.status(401).json("Utilisateur non authentifié !");
//     }

//     const comment = await Comment.create({ postId, content, userId });
//     if (!comment) return res.status(400).json("Aucun commentaire ajouté !");

//     res.status(201).json("Un nouveau commentaire a été créé !");
//   } catch (error) {
//     console.log(error);
//     res.status(500).json("Problème lors de la création d'un commentaire !");
//     next();
//   }
// };

// const getAll = async (req, res, next) => {
//   try {
//     const comment = await Comment.findAll({
//       include: [
//         {
//           model: Comment,
//           as: "comments",
//           include: [
//             {
//               model: User, // Relation avec le modèle User
//               as: "user",
//               attributes: ["id", "name"], // Inclure uniquement l'id et le nom
//             },
//           ],
//         },
//       ],
//       order: [["createdAt", "DESC"]],
//     });
//     console.log(comment);
//     if (!comment) res.status(404).json("No category find!");
//     res.status(200).json(comment);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json("Problem to find catergories!");
//   }
// };

///////////////////// NEW GETALL //////////////////////////////
const getAll = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User, // Relation avec le modèle User
          as: "user",
          attributes: ["id", "name"], // Inclure uniquement l'id et le nom
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
