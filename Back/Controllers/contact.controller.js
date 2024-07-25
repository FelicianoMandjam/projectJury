import { Contact } from "../Models/index.js";

export const sendMail = async (req, res) => {
  console.log(req.body);

  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    console.log(error);
    res.status(500).json("Probleme envoie de message!");
  }

  res.json(true);
};
