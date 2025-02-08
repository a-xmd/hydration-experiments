import { readFile } from "node:fs/promises";
import * as esbuild from "esbuild";
import express from "express";

export const build = express.Router();

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
