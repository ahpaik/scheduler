import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function ManagerCreatedPlanner() {
    const [obj, setObj] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchObj = async () => {
            try {
                const response = await fetch("/manager_home/created_planner/get_id");
                const data = await response.json();
                setObj(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchObj();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Inside handleSubmit");
        navigate("/manager_home");
    }

    return (
        <section className="pt-10">
            <div className="flex flex-col items-center gap-2 justify-center">
                <h1 className="text-2xl mt-8">{obj.title} planner created!</h1>
                <button
                    className="cursor-pointer bg-blue-light hover:bg-blue-light-hover text-black py-1 px-4 rounded mt-4"
                    onClick={(e) => handleSubmit(e)}>
                    Return Home
                </button>
            </div>
        </section>
    );
}

export default ManagerCreatedPlanner;