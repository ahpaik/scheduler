import { useState } from "react";
import reactLogo from "./assets/react.svg";
// import "./App.css";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./Login.jsx";
import ManagerHome from "./manager/ManagerHome.jsx"
import WorkerHome from "./worker/WorkerHome.jsx"

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
          {/* Redirect root path to /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path={"/login"} element={<Login />} />

          <Route path={"/manager_home"} element={<ManagerHome />} />
          <Route path={"/worker_home"} element={<WorkerHome />} />
      </Routes>
    </div>
  );
}

export default App;
