import {useEffect, useState} from "react";

function WorkerAddAvailability() {
    const [ obj, setObj ] = useState("");

    useEffect(() => {
        const fetchObj = async () => {
            try {
                const response = await fetch("/worker_home/worker_add_availability/get_id");
                const data = await response.json();
                setObj(data);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchObj();
    }, []);

    return (
        <section className="px-10 mt-8">
            <h1 className="text-3xl mb-6">Add Availability for {obj.title}</h1>
            <div>
                <h2 className="text-lg">Add your weekly availability</h2>
            </div>
        </section>
    );
}

export default WorkerAddAvailability;