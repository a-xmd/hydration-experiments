import express from "express";
import { readFile } from "node:fs/promises";
import { build } from "./build";
import { renderToString } from "react-dom/server";
import { App } from "../src/app";

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const html = await readFile("./index.html", "utf8");

  const htmlWithReact = html.replace("[react-hook]", renderToString(App()));

  res.send(htmlWithReact);
});

app.listen(port);

app.use("/build", build);

app.all("*", (req, res) => {
  res.json({ msg: `🔴 unhandled: [${req.method}] ${req.url}` });
});
