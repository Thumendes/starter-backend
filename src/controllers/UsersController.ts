import { Handler } from "express";
import db from "../lib/database";

class UsersController {
  create: Handler = async ({ body }, res) => {
    const newUser = await db.user.create({ data: body });

    return res.json(newUser);
  };

  index: Handler = async (req, res) => {
    const users = await db.user.findMany();

    return res.json(users);
  };

  show: Handler = async ({ params }, res) => {
    const user = await db.user.findFirst({ where: { id: params.id } });

    return res.json(user);
  };

  update: Handler = async ({ params, body }, res) => {
    const newUser = await db.user.update({
      where: { id: params.id },
      data: body,
    });

    return res.json(newUser);
  };

  delete: Handler = async ({ params }, res) => {
    const deletedUser = await db.user.delete({ where: { id: params.id } });

    return res.json(deletedUser);
  };

  forgetPassword: Handler = async () => {};

  resetPassword: Handler = async () => {};
}

export default UsersController;
