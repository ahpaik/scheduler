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
const workerAvailabilities = [
  { id: 1, title: "Tutoring", due: "6/10/2026" },
  { id: 2, title: "Work Sched.", due: "8/22/2026" },
]
let worker_availability_id = ""

const workerCompleted = [
  { id: 3, title: "Shifts", due: "6/10/2026" },
]

app.post("/login", async (req, res) => {
  username = req.body.username;
  console.log(username);
  res.status(204).send();
})

app.get("/worker_home/username", async (req, res) => {
  try {
    res.status(200).json({ username: username });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching data" });
  }
})

app.get("/worker_home/availabilities", async (req, res) => {
  try {
    res.status(200).json( workerAvailabilities );
  } catch (error) {
    res.status(500).json({ message: "Server error fetching data" });
  }
})

app.post("/worker_home/submitAvailability", async (req, res) => {
  worker_availability_id = req.body.id;
  res.status(204).send();
})

app.get("/worker_home/completed", async (req, res) => {
  try {
    res.status(200).json( workerCompleted );
  } catch (error) {
    res.status(500).json({ message: "Server error fetching data" });
  }
})

app.get("/worker_home/worker_add_availability/get_id", async (req, res) => {
  try {
    let availability_obj = workerAvailabilities.find(item => item.id === worker_availability_id)
    console.log("HERE")
    res.status(200).json( availability_obj );
  } catch (error) {
    res.status(500).json({ message: "Server error fetching data" });
  }
})

app.post("worker_home/availabilities_submit", async (req, res) => {
  // remove availabilities id=1
  // add the object to completed
  // note: might want to disable button feature on schedule id=2??
})

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);

