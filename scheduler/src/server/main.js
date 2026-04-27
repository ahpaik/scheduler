import express from "express";
import ViteExpress from "vite-express";
import fs from "node:fs";
import * as path from "node:path";

const app = express();
const __dirname = path.resolve();

// app.get("/hello", (req, res) => {
//   res.send("Hello Vite + React!");
// });

// Middleware is app.use()
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());
// Serve static files (like style.css) within folder
app.use(express.static('public'))

let username = ""

app.post("/login", async (req, res) => {
  username = req.body.username;
  res.status(204).send();
})

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);

