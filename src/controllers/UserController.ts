import { Request, Response } from "express";
import User from "../models/User";

export default {
  async store(req: Request, res: Response): Promise<Response> {
    const { email, user } = req.body;

    try {
      if (await User.findOne({ email })) {
        return res.status(400).json({ error: "Email já foi registrado" });
      }

      if (await User.findOne({ user })) {
        return res.status(400).json({ error: "Esse usuario já está em uso" });
      }

      const createUser = await User.create(req.body);

      return res.json(createUser);
    } catch (err) {
      return res.status(400).json({
        error: "ocorreu algum problema verifique se digitou tudo corretamente",
      });
    }
  },
  async index(req: Request, res: Response): Promise<Response> {
    const { _id } = req.params;
    try {
      const user = await User.findById(_id);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ error: "Error ao encontrar perfil" });
    }
  },
  async show(req: Request, res: Response): Promise<Response> {
    const users = await User.find();
    return res.status(200).json(users);
  },
  async delete(req: Request, res: Response): Promise<Response> {
    const { _id } = req.params;

    try {
      const user = await User.findById(_id);
      if (user === null) {
        return res
          .status(400)
          .send({ error: "problema ao encontrar o perfil" });
      }

      user.remove();
      return res.status(200).send({ sucesso: "perfil deletado com sucesso" });
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  },
  async destroyer(req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.find().remove();
      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  },
};
