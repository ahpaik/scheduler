import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
// import "./App.css";

function Login() {
    const [ managerUsername, setManagerUsername ] = useState("");
    const [ workerUsername, setWorkerUsername ] = useState("");
    const navigate = useNavigate();

    async function handleSubmitManager(event) {
        event.preventDefault();
        console.log("Inside Login handleSubmitManager");

        const body = JSON.stringify( { username: managerUsername } );
        //console.log("BODY: "+body);
        const response = await fetch( "/login", {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body
        })
        if (response.status === 204) {
            navigate("/manager_home");
        }
    }

    async function handleSubmitWorker(event) {
        event.preventDefault();
        console.log("Inside Login handleSubmitWorker");

        const body = JSON.stringify( { username: workerUsername } );
        //console.log("BODY: "+body);
        const response = await fetch( "/login", {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body
        })
        if (response.status === 204) {
            navigate("/worker_home");
        }
    }

    return (
        <section className="pt-10">
            <div className="flex flex-col items-center gap-2 justify-center">
                <div>
                    <h1 className="text-4xl font-bold mb-8 flex justify-center">Welcome to the Scheduler</h1>
                </div>
                <h2 className="text-2xl flex justify-center mb-1">Manager Login</h2>
                <form id="login" className="flex flex-col w-110 justify-center items-center">
                    <div className="mb-4">
                        <input
                            type="text"
                            id="user"
                            className="border border-amber-300 bg-amber-100 rounded-md"
                            name="user"
                            value={ managerUsername }
                            onChange={(e) => setManagerUsername(e.target.value)}
                            placeholder="username"/><br/>
                    </div>
                    <div className="mb-0">
                        <input
                            type="text"
                            id="pw"
                            className="border border-amber-300 bg-amber-100 rounded-md"
                            name="pw"
                            placeholder="password"/><br/>
                    </div>
                    <div id="loginButton" className="mb-8">
                        <button
                            className="cursor-pointer bg-amber-400 hover:bg-amber-500 text-black py-1 px-4 rounded mt-4"
                            onClick={(e) => handleSubmitManager(e)}>
                            Login
                        </button>
                    </div>
                </form>
                <h2 className="text-2xl flex justify-center mb-1">Worker Login</h2>
                <form id="workerLogin" className="flex flex-col w-110 justify-center items-center">
                    <div className="mb-4">
                        <input
                            type="text"
                            id="user"
                            className="border border-amber-300 bg-amber-100 rounded-md"
                            name="user"
                            value={ workerUsername }
                            onChange={(e) => setWorkerUsername(e.target.value)}
                            placeholder="username"/><br/>
                    </div>
                    <div className="mb-0">
                        <input
                            type="text"
                            id="pw"
                            className="border border-amber-300 bg-amber-100 rounded-md"
                            name="pw"
                            placeholder="password"/><br/>
                    </div>
                    <div id="loginButton">
                        <button
                            className="cursor-pointer bg-amber-400 hover:bg-amber-500 text-black py-1 px-4 rounded mt-4"
                            onClick={(e) => handleSubmitWorker(e)}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <div id="error"></div>
        </section>
    );
}

export default Login;