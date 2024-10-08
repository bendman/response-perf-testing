import express from "express";
import http2Express from "http2-express-bridge";
import http2 from "http2";

import home from "./pages/home.js";
import streamRoute from "./pages/stream.js";
import earlyHintsRoute from "./pages/early-hints.js";
import { readFileSync } from "fs";
import path from "path";

const app = http2Express(express);
const PORT = 3000;
const sleep = (ms = 3000) =>
  new Promise((resolve) => setTimeout(resolve, 3000));

const log = (...args) =>
  console.log(`[${new Date().toLocaleTimeString()}]`, ...args);

const serverOptions = {
  key: readFileSync("./ssl/key.pem"),
  cert: readFileSync("./ssl/cert.pem"),
  allowHTTP1: true,
};

// Logger
app.use("*", (req, res, next) => {
  log(`received request for ${req.originalUrl}`);
  next();
});
app.get("/", home);
app.get("/stream", streamRoute);
app.get("/early-hints", earlyHintsRoute);
// app.get("/normal", normalRoute);
// app.get("/raw-async-await", rawAsyncAwaitRoute);
// app.get("/wrapped-async-await", wrappedAsyncAwaitRoute);

// Slow down some requests for perf testing slow files
const slowStatic = (req, res) => {
  // Early hints use browser cache internally, so make assets cacheable
  res.set({
    "Cache-Control": "max-age=30",
  });
  sleep().then(() => res.sendFile(path.resolve(`.${req.path}`)));
};
app.get("/public/script.js", slowStatic);
app.get("/public/style.css", slowStatic);
app.get("/public/img.png", slowStatic);

// Normal server for non-slow static files
app.use("/public", express.static("public"));

const server = http2.createSecureServer(serverOptions, app);
server.listen(PORT);
