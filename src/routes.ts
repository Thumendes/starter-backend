import UsersController from "./controllers/UsersController";
import Route from "./lib/router";

const router = new Route();

const usersController = new UsersController();

export const UsersRoutes = router.group(
  "/users",
  router.get("/", usersController.index),
  router.post("/", usersController.create),
  router.get("/:id", usersController.show),
  router.put("/:id", usersController.update),
  router.delete("/:id", usersController.delete),
  router.group(
    "/pass",
    router.post("/forget", usersController.forgetPassword),
    router.post("/reset", usersController.resetPassword)
  )
);

export const ProductsRoutes = router.group(
  "/products",
  router.get("/", (req, res) => {
    return res.json({ hello: "world" });
  })
);
