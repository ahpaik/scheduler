import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.svg";
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
                <div className="flex flex-rows gap-2 items-center mb-12">
                    <div className="flex">
                        <img
                            src={logo}
                            alt={"logo"}
                            style={{ width: '60px', height: 'auto' }}
                        />
                    </div>
                    <div className="flex">
                        <h1 className="flex text-5xl font-bold tracking-tight text-blue-dark justify-center">Scheduler</h1>
                    </div>
                </div>
                <div className="flex flex-rows gap-6">
                    <div>
                        <h2 className="text-xl flex justify-center mb-4">Manager Login</h2>
                        <form id="login" className="flex flex-col w-110 justify-center items-center">
                            <div className="mb-4">
                                <input
                                    type="text"
                                    id="user"
                                    className="border border-black rounded-md mb-2 h-10 w-80"
                                    name="user"
                                    value={ managerUsername }
                                    onChange={(e) => setManagerUsername(e.target.value)}
                                    placeholder="username"
                                />
                            </div>
                            <div className="mb-0">
                                <input
                                    type="text"
                                    id="pw"
                                    className="border border-black rounded-md h-10 mb-4 w-80"
                                    name="pw"
                                    placeholder="password"/><br/>
                            </div>
                            <div id="loginButton" className="mb-8">
                                <button
                                    className="flex items-center justify-center w-60 cursor-pointer bg-blue-light hover:bg-blue-light-hover text-black py-2 px-6 rounded transition"
                                    onClick={(e) => handleSubmitManager(e)}>
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <h2 className="text-xl flex justify-center mb-4">Worker Login</h2>
                        <form id="workerLogin" className="flex flex-col w-110 justify-center items-center">
                            <div className="mb-4">
                                <input
                                    type="text"
                                    id="user"
                                    className="border border-black rounded-md h-10 mb-2 w-80"
                                    name="user"
                                    value={ workerUsername }
                                    onChange={(e) => setWorkerUsername(e.target.value)}
                                    placeholder="username"/><br/>
                            </div>
                            <div className="mb-0">
                                <input
                                    type="text"
                                    id="pw"
                                    className="border border-black rounded-md h-10 mb-4 w-80"
                                    name="pw"
                                    placeholder="password"/><br/>
                            </div>
                            <div id="loginButton">
                                <button
                                    className="flex items-center justify-center w-60 cursor-pointer bg-blue-light hover:bg-blue-light-hover text-black py-2 px-6 rounded transition"
                                    onClick={(e) => handleSubmitWorker(e)}>
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div id="error"></div>
        </section>
    );
}

export default Login;