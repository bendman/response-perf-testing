import express from "express";
import http2Express from "http2-express-bridge";
import http2 from "http2";

import home from "./pages/home.js";
import streamRoute from "./pages/stream.js";
import earlyHintsRoute from "./pages/early-hints.js";
import { readFileSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";

const app = http2Express(express);
const PORT = 3000;
const sleep = (ms = 3000) =>
  new Promise((resolve) => setTimeout(resolve, 3000));

const serverOptions = {
  key: readFileSync("./ssl/key.pem"),
  cert: readFileSync("./ssl/cert.pem"),
  allowHTTP1: true,
};

app.get("/", home);
app.get("/stream", streamRoute);
app.get("/early-hints", earlyHintsRoute);
// app.get("/normal", normalRoute);
// app.get("/raw-async-await", rawAsyncAwaitRoute);
// app.get("/wrapped-async-await", wrappedAsyncAwaitRoute);

app.get("/public/script.js", (req, res) => {
  sleep().then(() => res.sendFile(path.resolve("./public/script.js")));
});
app.get("/public/style.css", (req, res) => {
  sleep().then(() => res.sendFile(path.resolve("./public/style.css")));
});
app.get("/public/img.png", (req, res) => {
  sleep().then(() => res.sendFile(path.resolve("./public/img.png")));
});

app.use("/public", express.static("public"));

const server = http2.createSecureServer(serverOptions, app);
server.listen(PORT);
