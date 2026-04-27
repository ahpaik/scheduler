import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Account() {
    const [obj, setObj] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchObj = async () => {
            try {
                const response = await fetch("/worker_home/worker_submitted_availability/get_id");
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
        navigate("/worker_home");
    }

    return (
        <section className="pt-10">
            <div className="flex flex-col items-center gap-2 justify-center">
                <h1>Availability for {obj.title} submitted!</h1>
                <button
                    className="cursor-pointer bg-amber-400 hover:bg-amber-500 text-black py-1 px-4 rounded mt-4"
                    onClick={(e) => handleSubmit(e)}>
                    Return Home
                </button>
            </div>
        </section>
    );
}

export default Account;