import { Contact } from "../Models/index.js";
import nodemailer from "nodemailer";
import { env } from "../Config/env.js";

const transport = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: env.MAIL_PORT,
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASSWORD,
  },
});

export const sendMail = async (req, res, next) => {
  console.log(req.body);

  try {
    const contact = await Contact.create(req.body);

    await transport.sendMail({
      from: env.MAIL_FROM, // sender address
      to: "ProjetBlog@mail.com", // list of receivers
      subject: "Nouvelle prise de contact.", // Subject line
      text: "Hello world?", // plain text body
      html: `<h1>Contact ProjetBlog</h1>
       <ul
      <li>Prénom : ${contact.firstname}</li>
      <li>Nom : ${contact.lastname}</li>
      <li>Tel : ${contact.phone}</li>
      <li>Message : ${contact.message}</li>
      </ul>`,
      // html body
    });

    res.status(201).json(contact);
  } catch (error) {
    console.log(error);
    res.status(500).json("Probleme envoie de message!");
    next(error);
  }
};
