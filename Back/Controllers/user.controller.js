import jwt from "jsonwebtoken";
import { User } from "../Models/index.js";
import { env } from "../Config/env.js";
import bcrypt from "bcrypt";

// GET : allUsers
export const getAll = async (req, res) => {
  try {
    // recherche l'user dans la base de données par son email
    const users = await User.findAll();
    res.status(200).json(users);
    console.table(users);
  } catch (error) {
    console.log(error);
    res.status(500).json("Not User Found.");
  }
};

const register = async (req, res, next) => {
  //  Début du bloc try pour la gestion des erreurs
  try {
    //  Je crypte (haché) le mdp avec bcrypt, 10 est est le nombre de tours de salage
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Création d'un nouveau user dans la bdd , avec les info réçues et le mdp haché
    await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // Envoi d'une réponse avec le status 201 (crée) et un message de confirmation
    res.status(201).json("User has been created!");
  } catch (error) {
    // Si une erreur se produit, passez-la au prochain middleware pour la gestion des erreurs
    console.log(error);
    res.status(400).json("The registration faild.");
    next(error);
  }
};

const login = async (req, res) => {
  try {
    // Recherche l'user dans la base de données par son email
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    // Si l'user n'est pas trouvé , renvoie error 404
    if (!user) return res.status(404).json("User not found");
    /* Je compare le mdp de la rêquete avec celui dans la bdd*/
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // Si le mdp est incorrect je renvoie une error 400.
    if (!comparePassword) return res.status(400).json("Wrong Credentials !! ");
    // Crée un jeton JWT pour l'utilisateur avec son ID
    const token = jwt.sign(
      // Le 1 arg = la charge utile du token.
      // Ici , nous incluons l'ID de l'utilisateur
      { id: user.id },
      // Le 2 arg = clé secrète, qui est utilisée pour signer le token.
      // On le récupére à partir des variables d'environnement
      env.TOKEN,
      // Le 3 arg = un objet qie contient les oprions du token , dans ce cas je définis la durée de 24 h du token
      { expiresIn: "24h" }
    );
    // Envoie le jeton (token) JWT sous forme de cookie HTTPOnly
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(user);
    console.log("Login reussie");
  } catch (e) {
    res.status(400).json(e.message);
  }
};

export default { getAll, register, login };
