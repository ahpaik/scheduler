import express from "express";
import ViteExpress from "vite-express";
import * as path from "node:path";

const app = express();
const __dirname = path.resolve();

// Middleware is app.use()
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());
// Serve static files (like style.css) within folder
app.use(express.static('public'))

let username = ""
let workerAvailabilities = [
  { id: 1, title: "Tutoring", due: "6/10/2026" },
  { id: 2, title: "Work", due: "8/22/2026" },
]
let worker_availability_id = 1;
let workerCompleted = [
  { id: 3, title: "Shifts", due: "6/10/2026" },
]
let managerPlanners = [
  { id: 1, title: "Tutors" },
  { id: 2, title: "Working" },
]
let manager_planner_id = 1;

app.post("/login", async (req, res) => {
  username = req.body.username;
  console.log(username);
  res.status(204).send();
})

app.get("/home/username", async (req, res) => {
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
    res.status(200).json( availability_obj );
  } catch (error) {
    res.status(500).json({ message: "Server error fetching data" });
  }
})

app.post("/worker_home/submitAddAvailability", async (req, res) => {
  worker_availability_id = Number(req.body.id);
  const itemToMove = workerAvailabilities.find(item => item.id === Number(worker_availability_id));
  try {
    if (itemToMove) {
      workerCompleted.push(itemToMove);
      await removeAvailability(worker_availability_id);
      res.status(200).json({success: true});
    } else {
      res.status(404).json({success: false});
    }
  }
  catch (error) {
    res.status(500).json({success: false});
  }

})

const removeAvailability = async (id) => {
  // Create a new array without the item that has the matching id
  workerAvailabilities = workerAvailabilities.filter((item) => item.id !== id);
};

app.get("/worker_home/worker_submitted_availability/get_id", async (req, res) => {
  try {
    let completed_obj = workerCompleted.find(item => item.id === worker_availability_id)
    res.status(200).json( completed_obj );
  } catch (error) {
    res.status(500).json({ message: "Server error fetching data" });
  }
})

app.get("/manager_home/get_planners", async (req, res) => {
  try {
    res.status(200).json( managerPlanners );
  } catch (error) {
    res.status(500).json({ message: "Server error fetching data" });
  }
})

app.post("/manager_home/viewPlanner", async (req, res) => {
  manager_planner_id = req.body.id;
  res.status(204).send();
})

app.post("/manager_home/submitNewPlanner", async (req, res) => {
  let id_val = managerPlanners.length + 1;
  manager_planner_id = id_val;
  managerPlanners.push({id: id_val, title: req.body.title});
  res.status(204).send();
})

app.get("/manager_home/created_planner/get_id", async (req, res) => {
  try {
    let completed_obj = managerPlanners.find(item => item.id === manager_planner_id)
    res.status(200).json( completed_obj );
  } catch (error) {
    res.status(500).json({ message: "Server error fetching data" });
  }
})

app.post("/navRestart", async (req, res) => {
  // Reset all the global vars to initialized values
  username = ""
  workerAvailabilities = [
    { id: 1, title: "Tutoring", due: "6/10/2026" },
    { id: 2, title: "Work", due: "8/22/2026" },
  ]
  worker_availability_id = 1;
  workerCompleted = [
    { id: 3, title: "Shifts", due: "6/10/2026" },
  ]
  managerPlanners = [
    { id: 1, title: "Tutors" },
    { id: 2, title: "Working" },
  ]
  manager_planner_id = 1;

  res.status(204).send();
})

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);

