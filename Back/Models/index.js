import { Sequelize } from "sequelize";
import connection from "../Config/db.js";
// Models
import userModel from "./user.model.js";
import contactModel from "./contact.model.js";
import categoryModel from "./category.model.js";
import productModel from "./product.model.js";
import postModel from "./post.model.js";
import commentsModel from "./comments.model.js";

try {
  await connection.authenticate();
  console.log("Connexion à la BDD OK");
} catch (error) {
  console.error("Probleme lors de la connexion à la BDD", error);
}

userModel(connection, Sequelize);
productModel(connection, Sequelize);
categoryModel(connection, Sequelize);
contactModel(connection, Sequelize);
postModel(connection, Sequelize);
commentsModel(connection, Sequelize);

const { User, Product, Contact, Category, Post, Comment } = connection.models;

// Les relations

Category.hasMany(Post, { foreignKey: "categoryId", as: "posts" });
Post.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

Post.hasMany(Comment, { foreignKey: "postId", as: "comments" });
Comment.belongsTo(Post, { foreignKey: "postId", as: "post" });

User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "author" });

User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Comment.belongsTo(User, { foreignKey: "userId", as: "author" });

await connection.sync({ alter: false, force: false });
console.log("Synchro Ok INDEx.js");

// export default connection.models
export { User, Product, Contact, Category, Post, Comment };
