import { Sequelize } from "sequelize";
import connection from "../Config/db.js";
import userModel from "./user.model.js";


try {
  await connection.authenticate();
  console.log("Connexion à la BDD OK");
} catch (error) {
  console.error("Probleme lors de la connexion à la BDD", error);
}

userModel(connection, Sequelize);


const { User } = connection.models;


// Les relations


await connection.sync({ alter: false, force: false });
console.log("Synchro Ok ");

// export default connection.models
export { User };
