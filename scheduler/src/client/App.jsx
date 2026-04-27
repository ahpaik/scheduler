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
          </Route>

          <Route element={<WorkerLayout />}>
              <Route path={"/worker_home"} element={<WorkerHome />} />
              <Route path={"/worker_home/add_availability"} element={<WorkerAddAvailability />} />
              <Route path={"/worker_home/completed_schedule"} element={<WorkerCompletedSchedule />} />
          </Route>


      </Routes>
    </div>
  );
}

export default App;
