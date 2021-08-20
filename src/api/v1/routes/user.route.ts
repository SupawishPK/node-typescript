import { Express } from "express";
import { createUserSchema } from "../../../schema/user.schema";
import { createUserHandler } from "../controllers/user.controller";
import validateRequest from "../middlewares/validateRequest";

export default function (app: Express) {
  //Register User
  app.post("/register", validateRequest(createUserSchema), createUserHandler);

  //Login User
  app.post("/sessions", validateRequest(createUserSchema), createUserHandler);
}
