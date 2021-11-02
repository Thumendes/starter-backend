import { Application } from "express";
import express from "express";
import morgan from "morgan";
import chalk from "chalk";
import { RouterGroup, RouterMethods, RouterType } from "../types";

class Server {
  public app!: Application;
  public routes: { method: RouterMethods; path: string }[] = [];

  constructor(
    public port: number,
    public config?: { version: string; name: string }
  ) {
    this.create();
  }

  private create() {
    this.app = express();
    this.app.use(morgan("dev"));

    if (this.config) {
      this.app.get("/", (req, res) => res.json(this.config));
    }
  }

  private router(group: RouterGroup, parentPath: string = "") {
    for (const item of group.nested) {
      switch (item.type) {
        case RouterType.ROUTE:
          const path = group.path + parentPath + item.path;
          this.routes.push({ method: item.method, path });
          this.app[item.method](path, ...group.handlers, ...item.handlers);
          break;
        case RouterType.GROUP:
          this.router(item, parentPath + item.path);
          break;
      }
    }
  }

  public printRoutes() {
    for (const { method, path } of this.routes) {
      console.log(chalk`{yellow.bold ${method}} {gray.bold ${path}}`);
    }
  }

  public register(...groups: RouterGroup[]) {
    for (const group of groups) {
      this.router(group);
    }
  }

  public start(): Promise<void> {
    return new Promise((resolve) => {
      this.app.listen(this.port, () => {
        resolve();

        console.log(
          chalk`{green.bold Application running} {gray.bold :${this.port}}`
        );
      });
    });
  }
}

export default Server;
