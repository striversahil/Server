import express, { application } from "express";
import cors from "cors";
import { createServer } from "http";
import cookieparser from "cookie-parser";
const app = express();
const httpServer = createServer(app);
// Keep this http Server at the top so to Implement Middlewares
import userRoute from "./routes/user.routes";
import workspaceRoute from "./routes/workspace.routes";
import projectRoute from "./routes/project.routes";
import bucketRoute from "./routes/bucket.routes";
import codeBlockRoute from "./routes/codeBlock.routes";
import stepBlockRoute from "./routes/stepBlock.routes";
import componentRoute from "./routes/component.routes";
import sectionRoute from "./routes/section.routes";
import { authenticate } from "./middleware/auth.middleware";
// import bodyParser from "body-parser";

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json()); // for parsing application/json

app.use(cookieparser()); // for parsing cookies

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/user", userRoute);
app.use("/workspace", authenticate, workspaceRoute);
app.use("/project", authenticate, projectRoute);
app.use("/bucket", authenticate, bucketRoute);

app.use("/codeblock", authenticate, codeBlockRoute);
app.use("/stepblock", authenticate, stepBlockRoute);
app.use("/component", authenticate, componentRoute);
app.use("/section", authenticate, sectionRoute);

export default httpServer;
