import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
// import "../App.css";

function ManagerHome() {
    const [ username, setUsername ] = useState("");
    const [ planners, setPlanners ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch("home/username");
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
        const fetchPlanners = async () => {
            try {
                const response = await fetch("manager_home/get_planners");
                const data = await response.json();
                setPlanners(data);
                setLoading(false);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchPlanners();
    }, []);

    if (loading) return <p>Loading information...</p>

    async function handleViewPlannerSubmit(event, id_val) {
        event.preventDefault();
        console.log("Inside handleViewPlannerSubmit");

        const body = JSON.stringify( { id: id_val } );
        const response = await fetch( "/manager_home/viewPlanner", {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body
        })
        if (response.status === 204) {
            navigate("/manager_home/view_planner");
        }

    }

    async function handleNewPlannerSubmit(event) {
        event.preventDefault();
        console.log("Inside handleNewPlannerSubmit");
        navigate("/manager_home/new_planner");
    }

    return (
        <section className="px-10 mt-4">
            <h1 className="text-3xl mb-6">Welcome, {username}</h1>
            <div id="planners" className="w-full">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl">Add Availability</h2>
                    <button
                        className="flex items-center justify-center w-36 cursor-pointer bg-blue-light hover:bg-blue-light-hover text-black py-1 px-4 rounded"
                        onClick={(e) => handleNewPlannerSubmit(e)}>
                        New Planner
                    </button>
                </div>
                <div className="flex flex-wrap gap-0.5 p-1 rounded-md bg-blue-light mb-6">
                    {planners.map((planner) => (
                        <div
                            className="
                                relative flex flex-col items-center justify-start
                                w-46 h-36 p-6 m-2
                                bg-white border border-gray-300 rounded-md shadow-sm
                                "
                            key={planner.id}
                        >
                            <h3 className="font-semibold text-center">{planner.title}</h3>
                            <button
                                className="absolute bottom-3 w-40 cursor-pointer bg-blue-dark hover:bg-blue-dark-hover text-black py-1 px-4 rounded mt-4"
                                onClick={(e) => handleViewPlannerSubmit(e, planner.id)}>
                                View
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ManagerHome;