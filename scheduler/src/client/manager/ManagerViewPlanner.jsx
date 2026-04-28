import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ManagerModifyScheduleLogic from "./ManagerModifyScheduleLogic.jsx"

const DAYS = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'];
const HOURS = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6] // 8am to 6pm

const availability = {
    // Monday: Worker A (10-2), Worker B (1-4)
    'Mon-10:00': ['WorkerA'], 'Mon-10:30': ['WorkerA'],
    'Mon-11:00': ['WorkerA'], 'Mon-11:30': ['WorkerA'],
    'Mon-12:00': ['WorkerA'], 'Mon-12:30': ['WorkerA'],
    'Mon-1:00': ['WorkerA', 'WorkerB'], // Overlap
    'Mon-1:30': ['WorkerA', 'WorkerB'], // Overlap
    'Mon-2:00': ['WorkerB'], 'Mon-2:30': ['WorkerB'],
    'Mon-3:00': ['WorkerB'], 'Mon-3:30': ['WorkerB'],
    // Wednesday: Worker A (9-10)
    'Wed-9:00': ['WorkerA'], 'Wed-9:30': ['WorkerA'],
};

function ManagerViewPlanner() {
    const [obj, setObj] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    // useEffect to get the manager_planner_id to set the title of the planner
    // default data for rest of page will be the same for all planners
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

    const renderCellContent = (timeId) => {
        const workers = availability[timeId] || [];
        if (workers.length === 0) return null;

        return (
            <div className="flex flex-row h-full w-full"> {/* Changed to flex-row for vertical split */}
                {workers.map((worker, idx) => (
                    <div
                        key={idx}
                        className={`h-full flex-1 ${
                            worker === 'WorkerA' ? 'bg-pink' : 'bg-green'
                        } ${workers.length > 1 && idx === 0 ? 'border-r border-black/10' : ''}`}
                        title={worker}
                    />
                ))}
            </div>
        );
    };

    const handlePress = () => {
        setIsSubmitted(true);
    };

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Inside handleSubmit for ManagerViewPlanner page");
        navigate("/manager_home/saved_planner");
    }

    return (
        <section className="px-10 mt-4 select-none pb-20">
            <h1 className="text-3xl mb-8">{obj.title} Planner</h1>
            <div className="flex flex-row gap-6 mb-6">
                <h1 className="text-xl">View All Worker Availabilities:</h1>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-pink border border-black"></div>
                    <span>Sophie</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green border border-black"></div>
                    <span>Parker</span>
                </div>
            </div>

            <div className="max-w-4xl">
                <div className="grid grid-cols-[80px_repeat(5,1fr)] border-t-2 border-l-2 border-black bg-gray-100 shadow-sm">
                    {/* Header Row */}
                    <div className="border-r-2 border-b-2 border-black bg-blue-light" />
                    {DAYS.map(day => (
                        <div key={day} className="border-r-2 border-b-2 border-black bg-blue-light p-2 font-bold text-center">
                            {day}
                        </div>
                    ))}

                    {/* Time Rows */}
                    {HOURS.map((hour) => (
                        <React.Fragment key={hour}>
                            {/* :00 Block */}
                            <div className="border-r-2 border-b border-black p-2 text-right text-sm font-semibold bg-blue-light h-10">
                                {hour}:00
                            </div>
                            {DAYS.map(day => (
                                <div key={`${day}-${hour}:00`} className="border-r-2 border-b border-black h-10">
                                    {renderCellContent(`${day}-${hour}:00`)}
                                </div>
                            ))}

                            {/* :30 Block */}
                            <div className="border-r-2 border-b-2 border-black p-1 text-right text-xs text-gray-400 bg-blue-light h-10">
                                :30
                            </div>
                            {DAYS.map(day => (
                                <div key={`${day}-${hour}:30`} className="border-r-2 border-b-2 border-black h-10">
                                    {renderCellContent(`${day}-${hour}:30`)}
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="mt-12 select-none max-w-4xl">
                {!isSubmitted ? (
                    /* The Div with the Button (disappears after click) */
                    <div className="p-4 rounded-md gap-4 flex-row">
                        <p className="text-3xl mb-6">Generate a schedule</p>
                        <div className="flex flex-row items-center mb-4 gap-6">
                            <div className="flex flex-row items-center gap-2 mb-4">
                                <label htmlFor="title" className="text-lg whitespace-nowrap">Min hours/worker</label>
                                <input
                                    type="number"
                                    id="title"
                                    className="border border-black rounded-md h-10 w-20"
                                    name="title"
                                    placeholder="1-40"
                                />
                            </div>
                            <div className="flex flex-row items-center gap-2 mb-4">
                                <label htmlFor="title" className="text-lg whitespace-nowrap">Max hours/worker</label>
                                <input
                                    type="number"
                                    id="title"
                                    className="border border-black rounded-md h-10 w-20"
                                    name="title"
                                    placeholder="1-40"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handlePress}
                            className="cursor-pointer bg-blue-light px-6 py-2 rounded-md hover:bg-blue-light-hover transition-colors"
                        >
                            Generate
                        </button>
                    </div>
                ) : (
                    /* The New Div (appears after click) */
                    <div className="animate-fade-in">
                        <p className="text-2xl mb-2">Schedule</p>
                        <p className="text-base text-gray-500 italic mb-6">Select a worker, then click and drag to change scheduled hours</p>
                        <ManagerModifyScheduleLogic />
                        <div className="flex flex-row gap-4">
                            <button
                                className="cursor-pointer w-50 bg-blue-light px-6 py-2 rounded-md hover:bg-blue-light-hover transition-colors"
                                onClick={(e) => handleSubmit(e)}
                            >
                                Save for Later
                            </button>
                            <button
                                className="w-50 bg-blue-light px-6 py-2 rounded-md transition-colors"
                            >
                                Share with Workers
                            </button>
                            <button
                                className="w-50 bg-blue-light px-6 py-2 rounded-md"
                            >
                                Download Schedule
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ManagerViewPlanner;