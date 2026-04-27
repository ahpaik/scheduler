import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
// import "../App.css";

function ManagerHome() {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Inside Login handleSubmit");

        const body = JSON.stringify( { username: username, password: password } );
        //console.log("BODY: "+body);
        const response = await fetch( "/login", {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body
        })

        const text = await response.json()
        console.log( "text:", text )
        //window.location.href = "/home";
        if (response.ok) {
            console.log("HERE")
            navigate("/");
        }
    }

    return (
        <section>
            <div className="flex flex-col items-center gap-2 justify-center">
                <div>
                    <h1 className="text-4xl font-bold mb-6 flex justify-center">Login</h1>
                    <p className="flex justify-center mb-4">Welcome to the To Do List Tracker!</p>
                    <p className="flex justify-center mb-4">Please note: if the user account doesn't exist, this form
                        creates a new user.</p>
                </div>
                <form id="login" className="flex flex-col w-110 justify-center items-center">
                    <div className="mb-4">
                        <label htmlFor="user">Username</label><br/>
                        <input
                            type="text"
                            id="user"
                            className="border border-amber-300 bg-amber-100"
                            name="user"
                            value={ username }
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder=""/><br/>
                    </div>
                    <div className="mb-0">
                        <label htmlFor="pw">Password</label><br/>
                        <input
                            type="text"
                            id="pw"
                            className="border border-amber-300 bg-amber-100"
                            name="pw"
                            value={ password }
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=""/><br/>
                    </div>
                    <div id="loginButton">
                        <button
                            className="cursor-pointer bg-amber-400 hover:bg-amber-500 text-black py-1 px-4 rounded mt-4"
                            onClick={(e) => handleSubmit(e)}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <div id="error"></div>
        </section>
    );
}

export default ManagerHome;