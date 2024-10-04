import express from "express";

import home from "./pages/home.js";
import streamRoute from "./pages/stream.js";

const app = express();
const port = 3000;

app.get("/", home);
app.get("/stream", streamRoute);
// app.get("/normal", normalRoute);
// app.get("/raw-async-await", rawAsyncAwaitRoute);
// app.get("/wrapped-async-await", wrappedAsyncAwaitRoute);

app.use("/public", express.static("public"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
