import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/logo.svg";
import React, {useEffect} from "react";

const WorkerNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const showBack = location.pathname !== '/worker_home' && location.pathname !== '/worker_home/submitted_availability';

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await fetch( "/navRestart", {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.status === 204) {
            navigate("/login");
        }
    }

    return (
        <nav className="navbar w-full mt-5 flex flex-col gap-y-2 px-10">
            <div className="flex items-center justify-between w-full mb-6">
                <Link to="/worker_home" className="flex flex-row items-center gap-x-2">
                    <div className="flex">
                        <img
                            src={logo}
                            alt={"logo"}
                            style={{ width: '40px', height: 'auto' }}
                        />
                    </div>
                    <div className="flex">
                        <h1 className="text-3xl font-bold tracking-tight text-blue-dark hover:text-blue-dark-hover duration-200">Scheduler</h1>
                    </div>
                </Link>
                <ul className="nav-links flex items-center list-none gap-x-8 ">
                    <li className="hover:text-blue-dark"><Link to="/worker_home">Home</Link></li>
                    <li className="hover:text-blue-dark"><Link to="/account">Account</Link></li>
                    <li className="hover:text-blue-dark">
                        <button
                            className="cursor-pointer hover:text-blue-dark"
                            onClick={(e) => handleSubmit(e)}
                        >Logout
                        </button>
                    </li>
                </ul>
            </div>

            <div className="flex flex-start">
                {showBack && (
                    <button onClick={() => navigate(-1)} className="back-button">
                        <span className="font-bold cursor-pointer bg-blue-light hover:bg-blue-light-hover text-black py-1 px-4 rounded mt-4">&larr;</span>
                    </button>
                )}
            </div>
        </nav>
    );
};

export default WorkerNavbar;