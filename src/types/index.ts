import { Handler } from "express";

export enum RouterType {
  GROUP = "group",
  ROUTE = "route",
}

export enum RouterMethods {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

export type RouterRoute = {
  type: RouterType.ROUTE;
  path: string;
  method: RouterMethods;
  handlers: Handler[];
};

export type RouterGroup = {
  type: RouterType.GROUP;
  path: string;
  nested: RouterDefine[];
  handlers: Handler[];
  middlewares: (...handlers: Handler[]) => RouterGroup;
};

export type RouterDefine = RouterGroup | RouterRoute;
