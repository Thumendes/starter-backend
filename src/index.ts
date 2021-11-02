import db from "./lib/database";
import Server from "./lib/server";
import { ProductsRoutes, UsersRoutes } from "./routes";

async function main() {
  const server = new Server(4000, {
    version: "0.1.0",
    name: "Backend Starter",
  });

  server.register(UsersRoutes, ProductsRoutes);

  // server.printRoutes();

  await server.start();
  await db.$connect();
}

main().catch(console.error);
