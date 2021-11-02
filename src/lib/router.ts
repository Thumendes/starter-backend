import { Handler, NextFunction } from "express";
import {
  RouterDefine,
  RouterGroup,
  RouterMethods,
  RouterRoute,
  RouterType,
} from "../types";

class Route {
  group(path: string, ...methods: RouterDefine[]): RouterGroup {
    const group: RouterGroup = {
      path,
      type: RouterType.GROUP,
      nested: methods,
      handlers: [],
      middlewares: (...handlers: Handler[]) => {
        group.handlers = handlers;

        return group;
      },
    };

    return group;
  }

  get(path: string, ...handlers: Handler[]): RouterRoute {
    return {
      handlers,
      method: RouterMethods.GET,
      path,
      type: RouterType.ROUTE,
    };
  }

  post(path: string, ...handlers: Handler[]): RouterRoute {
    return {
      handlers,
      method: RouterMethods.POST,
      path,
      type: RouterType.ROUTE,
    };
  }

  put(path: string, ...handlers: Handler[]): RouterRoute {
    return {
      handlers,
      method: RouterMethods.PUT,
      path,
      type: RouterType.ROUTE,
    };
  }

  delete(path: string, ...handlers: Handler[]): RouterRoute {
    return {
      handlers,
      method: RouterMethods.DELETE,
      path,
      type: RouterType.ROUTE,
    };
  }
}

export default Route;
