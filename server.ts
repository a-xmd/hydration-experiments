import express from "express";
import { readFile } from "node:fs/promises";
import * as esbuild from "esbuild";

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const html = await readFile("./index.html", "utf8");
  res.send(html);
});

app.listen(port);

const build = express.Router();

build.all("*", async (req, res) => {
  try {
    // @todo: very very basic for now
    const fileName = req.url.replace(/\.mjs$/, "");
    const originalFile = await readFile(`./src${fileName}.tsx`, "utf-8");
    const file = await esbuild.transform(originalFile, { loader: "tsx" });
    res.set("content-type", "text/javascript; charset=utf-8");
    res.send(file.code);
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
});

app.use("/build", build);

app.all("*", (req, res) => {
  res.json({ msg: `🔴 unhandled: [${req.method}] ${req.url}` });
});
