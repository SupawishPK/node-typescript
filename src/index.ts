import express, { Request, Response } from "express";
import config from "config";
import log from "./config/logger";
import connect from "./config/DatabaseConfig";
import routes from "./routes";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("./", (req: Request, res: Response): void => {
  const age: number = 39;
  res.json({ message: "Please Like this" });
});

//middleware
app.use("/api/users", routes);

app.listen(port, host, (): void => {
  log.info(`Server listing at http://${host}:${port}`);
  connect();
  routes(app);
});
