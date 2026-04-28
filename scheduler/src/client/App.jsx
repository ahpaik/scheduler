import { useState } from "react";
import reactLogo from "./assets/react.svg";
// import "./App.css";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./Login.jsx";
import ManagerHome from "./manager/ManagerHome.jsx"
import WorkerHome from "./worker/WorkerHome.jsx"
import Account from "./Account.jsx";
import WorkerLayout from "./worker/WorkerLayout.jsx";
import ManagerLayout from "./manager/ManagerLayout.jsx";
import WorkerAddAvailability from "./worker/WorkerAddAvailability.jsx";
import WorkerCompletedSchedule from "./worker/WorkerCompletedSchedule.jsx";
import WorkerSubmittedAvailability from "./worker/WorkerSubmittedAvailability.jsx";
import ManagerViewPlanner from "./manager/ManagerViewPlanner.jsx";
import ManagerNewPlanner from "./manager/ManagerNewPlanner.jsx";
import ManagerCreatedPlanner from "./manager/ManagerCreatedPlanner.jsx"
import ManagerSavedPlanner from "./manager/ManagerSavedPlanner.jsx"

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
          {/* Redirect root path to /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path={"/login"} element={<Login />} />

          <Route path={"/account"} element={<Account />} />

          <Route element={<ManagerLayout />}>
              <Route path={"/manager_home"} element={<ManagerHome />} />
              <Route path={"/manager_home/view_planner"} element={<ManagerViewPlanner />} />
              <Route path={"/manager_home/new_planner"} element={<ManagerNewPlanner />} />
              <Route path={"/manager_home/created_planner"} element={<ManagerCreatedPlanner />} />
              <Route path={"/manager_home/saved_planner"} element={<ManagerSavedPlanner />} />
          </Route>

          <Route element={<WorkerLayout />}>
              <Route path={"/worker_home"} element={<WorkerHome />} />
              <Route path={"/worker_home/add_availability"} element={<WorkerAddAvailability />} />
              <Route path={"/worker_home/completed_schedule"} element={<WorkerCompletedSchedule />} />
              <Route path={"/worker_home/submitted_availability"} element={<WorkerSubmittedAvailability />} />
          </Route>


      </Routes>
    </div>
  );
}

export default App;
