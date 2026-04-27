import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
// import "../App.css";

function WorkerHome() {
    const [ username, setUsername ] = useState("");
    const [ availabilities, setAvailabilities ] = useState([]);
    const [ completed, setCompleted ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch("worker_home/username");
                const data = await response.json();
                setUsername(data.username);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchUsername();
    }, []);

    useEffect(() => {
        const fetchAvailabilities = async () => {
            try {
                const response = await fetch("worker_home/availabilities");
                const data = await response.json();
                console.log("Available: ")
                console.log(data)
                setAvailabilities(data);
                setLoading(false);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchAvailabilities();
    }, []);

    useEffect(() => {
        const fetchCompleted = async () => {
            try {
                const response = await fetch("worker_home/completed");
                const data = await response.json();
                console.log(data)
                setCompleted(data);
                setLoading(false);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchCompleted();
    }, []);

    if (loading) return <p>Loading information...</p>

    async function handleAvailabilitySubmit(event) {
        event.preventDefault();
        console.log("Inside handleAvailabilitySubmit");
        navigate("/worker_home/add_availability");
    }

    async function handleCompletedSubmit(event) {
        event.preventDefault();
        console.log("Inside handleCompletedSubmit");
        navigate("/worker_home/completed_schedule");
    }

    return (
        <section className="px-10 mt-8">
            <h1 className="text-3xl mb-6">Welcome, {username}</h1>
            <div id="availabilities">
                <h2 className="text-xl">Add Availability</h2>
                <div className="relative flex flex-wrap p-1 rounded-md bg-amber-100 mb-6">
                    {availabilities.map((availability) => (
                        <div
                            className="
                                flex flex-col items-center justify-start
                                w-46 h-36 p-6 m-2
                                bg-white border border-gray-300 rounded-md shadow-sm
                                "
                            key={availability.id}
                        >
                            <h3 className="font-semibold">{availability.title}</h3>
                            <p>Due: {availability.due}</p>
                            <button
                                className="absolute bottom-6 w-40 cursor-pointer bg-amber-400 hover:bg-amber-500 text-black py-1 px-4 rounded mt-4"
                                onClick={(e) => handleAvailabilitySubmit(e)}>
                                Add
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div id="completed">
                <h2 className="text-xl">View Completed Availabilities and Schedules</h2>
                <div className="relative flex flex-wrap p-1 rounded-md bg-amber-100 mb-6">
                    {completed.map((schedule) => (
                        <div
                            className="
                                flex flex-col items-center justify-start
                                w-46 h-36 p-6 m-2
                                bg-white border border-gray-300 rounded-md shadow-sm
                                "
                            key={schedule.id}
                        >
                            <h3 className="font-semibold">{schedule.title}</h3>
                            <button
                                className="absolute bottom-6 w-40 cursor-pointer bg-amber-400 hover:bg-amber-500 text-black py-1 px-4 rounded mt-4"
                                onClick={(e) => handleCompletedSubmit(e)}>
                                View
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WorkerHome;