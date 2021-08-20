import express, { Request, Response, NextFunction } from "express";
const app = express();

app.get("./", (req: Request, res: Response): void => {
  const age: number = 39;
  res.json({ message: "Please Like this" });
});

app.listen("3001", (): void => {
  console.log("Server Running!");
});
