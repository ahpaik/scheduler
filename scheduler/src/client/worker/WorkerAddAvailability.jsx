import {useEffect, useState} from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const HOURS = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6] // 8am to 6pm


function WorkerAddAvailability() {
    const [obj, setObj] = useState("");
    const [selected, setSelected] = useState(new Set());
    const [isDragging, setIsDragging] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchObj = async () => {
            try {
                const response = await fetch("/worker_home/worker_add_availability/get_id");
                const data = await response.json();
                setObj(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchObj();
    }, []);

    const toggleCell = (id) => {
        setSelected((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) newSet.delete(id);
            else newSet.add(id);
            return newSet;
        });
    };

    const handleMouseEnter = (id) => {
        if (isDragging) toggleCell(id);
    };

    // Reusable Single Day Column Component
    const SingleDayGrid = ({ dayName, label }) => (
        <div className="mt-10 w-full max-w-62.5">
            <h3 className="text-xl font-bold mb-4">{label}</h3>
            <div className="grid grid-cols-[80px_1fr] border-t-2 border-l-2 border-black bg-white shadow-sm"
                 onMouseLeave={() => setIsDragging(false)}
                 onMouseUp={() => setIsDragging(false)}>

                {/*<div className="border-r-2 border-b-2 border-black bg-gray-100 p-2 font-bold">Time</div>*/}
                {/*<div className="border-r-2 border-b-2 border-black bg-gray-100 p-2 font-bold text-center">{dayName}</div>*/}

                {HOURS.map((hour) => (
                    <React.Fragment key={hour}>
                        {/* :00 Slot */}
                        <div className="border-r-2 border-b border-black p-2 text-right text-sm font-semibold bg-gray-50 h-10">
                            {hour}:00
                        </div>
                        <div
                            onMouseDown={() => { setIsDragging(true); toggleCell(`${dayName}-spec-${hour}:00`); }}
                            onMouseEnter={() => handleMouseEnter(`${dayName}-spec-${hour}:00`)}
                            className={`border-r-2 border-b border-black cursor-pointer 
                                ${selected.has(`${dayName}-spec-${hour}:00`) ? 'bg-green-500' : 'hover:bg-green-50'}`}
                        />
                        {/* :30 Slot */}
                        <div className="border-r-2 border-b-2 border-black p-1 text-right text-xs text-gray-400 bg-gray-50 h-10">:30</div>
                        <div
                            onMouseDown={() => { setIsDragging(true); toggleCell(`${dayName}-spec-${hour}:30`); }}
                            onMouseEnter={() => handleMouseEnter(`${dayName}-spec-${hour}:30`)}
                            className={`border-r-2 border-b-2 border-black cursor-pointer 
                                ${selected.has(`${dayName}-spec-${hour}:30`) ? 'bg-green-500' : 'hover:bg-green-50'}`}
                        />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Inside handleSubmit for WorkerAddAvaialbility page");

        const response = await fetch( "/worker_home/submitAddAvailability", {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: obj.id })
        })
        if (response.ok) {
            navigate("/worker_home/submitted_availability");
        }
    }

    return (
        <section className="px-10 mt-8 select-none pb-20">
            <h1 className="text-3xl mb-6">Add Availability for {obj.title}</h1>

            <div className="mb-4">
                <h2 className="text-lg font-semibold">Weekly Overview</h2>
                <p className="text-sm text-gray-500 italic">Main grid (Monday - Friday)</p>
            </div>

            {/* --- MAIN WEEKLY GRID --- */}
            <div className="max-w-4xl">
                <div
                    className="grid grid-cols-[80px_repeat(5,1fr)] border-t-2 border-l-2 border-black bg-white shadow-sm"
                    onMouseLeave={() => setIsDragging(false)}
                    onMouseUp={() => setIsDragging(false)}
                >
                    <div className="border-r-2 border-b-2 border-black bg-gray-100 p-2" />
                    {DAYS.map(day => (
                        <div key={day} className="border-r-2 border-b-2 border-black bg-gray-100 p-2 font-bold text-center">
                            {day}
                        </div>
                    ))}

                    {HOURS.map((hour) => (
                        <React.Fragment key={hour}>
                            <div className="border-r-2 border-b border-black p-2 text-right text-sm font-semibold bg-gray-50 h-10">{hour}:00</div>
                            {DAYS.map(day => (
                                <div key={`${day}-${hour}:00`}
                                     onMouseDown={() => { setIsDragging(true); toggleCell(`${day}-${hour}:00`); }}
                                     onMouseEnter={() => handleMouseEnter(`${day}-${hour}:00`)}
                                     className={`border-r-2 border-b border-black cursor-pointer ${selected.has(`${day}-${hour}:00`) ? 'bg-blue-500' : 'hover:bg-blue-100'}`}
                                />
                            ))}
                            <div className="border-r-2 border-b-2 border-black p-1 text-right text-xs text-gray-400 bg-gray-50 h-10">:30</div>
                            {DAYS.map(day => (
                                <div key={`${day}-${hour}:30`}
                                     onMouseDown={() => { setIsDragging(true); toggleCell(`${day}-${hour}:30`); }}
                                     onMouseEnter={() => handleMouseEnter(`${day}-${hour}:30`)}
                                     className={`border-r-2 border-b-2 border-black cursor-pointer ${selected.has(`${day}-${hour}:30`) ? 'bg-blue-500' : 'hover:bg-blue-100'}`}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* --- SPECIFIC DAY GRIDS --- */}
            <div className="flex flex-wrap gap-10">
                <SingleDayGrid dayName="Monday" label="Specific Date: May 1st" />
                <SingleDayGrid dayName="Friday" label="Specific Date: May 5th" />
            </div>

            <button
                className="w-60 cursor-pointer bg-amber-400 hover:bg-amber-500 text-black py-1 px-4 rounded mt-4 mb-8"
                onClick={(e) => handleSubmit(e)}>
                Submit Availability
            </button>
        </section>
    );
}

export default WorkerAddAvailability;