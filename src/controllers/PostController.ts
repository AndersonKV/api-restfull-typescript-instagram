import { Request, Response } from "express";
import User from "../models/User";
import Post from "../models/Post";

interface PostInterface {
  id_user: string;
  post_image: string;
  post_text: string;
}

export default {
  async store(req: Request, res: Response): Promise<Response> {
    const { id_user, post_text } = req.body;

    const imagemUpload = req.files as Express.Multer.File[];
    const post_image = imagemUpload.map((image) => {
      return { path: image.filename };
    });

    try {
      await User.findById({ _id: id_user });

      const data: any = {
        id_user,
        post_image,
        post_text,
      };

      const post = await Post.create(data);

      return res.status(200).json(post);
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  async index(req: Request, res: Response): Promise<Response> {
    const { _id } = req.params;

    try {
      const posts = await Post.findById(_id);
      return res.status(200).json(posts);
    } catch (err) {
      return res.status(400).json({ error: "Error ao encontrar posts" });
    }
  },
  async show(req: Request, res: Response): Promise<Response> {
    const posts = await Post.find();
    return res.status(200).json(posts);
  },
  async delete(req: Request, res: Response): Promise<Response> {
    const { _id } = req.params;

    try {
      const post = await Post.findById(_id);
      if (post === null) {
        return res.status(400).send({ error: "problema ao encontrar o post" });
      }

      post.remove();
      return res.status(200).send({ sucesso: "post deletado com sucesso" });
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  },
  async destroyer(req: Request, res: Response): Promise<Response> {
    try {
      const post = await Post.find().remove();
      return res.json(post);
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  },
};
