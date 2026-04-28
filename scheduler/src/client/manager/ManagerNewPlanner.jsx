import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function ManagerNewPlanner() {
    const [ plannerTitle, setPlannerTitle ] = useState("");
    const [ isWeekly, setIsWeekly ] = useState("");
    const [ extraDates, setExtraDates ] = useState( [] );
    const [ email, setEmail ] = useState("");
    const [ allEmails, setAllEmails ] = useState( [] );
    const navigate = useNavigate();

    const addDateRow = () => {
        const newRow = {
            id: Date.now(),
            date: '',
            startTime: '',
            endTime: ''
        };
        setExtraDates([...extraDates, newRow]);
    };

    const removeDateRow = (id) => {
        setExtraDates(extraDates.filter(row => row.id !== id))
    }

    const handleAddEmail = (e) => {
        e.preventDefault();
        if (email.trim() === "") return;
        const newEmail = {
            id: Date.now(),
            text: email
        };
        setAllEmails([...allEmails, newEmail]);
        setEmail("");
    };

    const removeEmail = (id) => {
        setAllEmails(allEmails.filter(mail => mail.id !== id));
    };

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Inside handleSubmit for ManagerNewPlanner");

        const body = JSON.stringify( { title: plannerTitle } );
        const response = await fetch( "/manager_home/submitNewPlanner", {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body
        })
        if (response.status === 204) {
            navigate("/manager_home/created_planner");
        }

    }

    return (
        <section className="pt-10 px-10">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl justify-center mb-4">New Planner</h1>
                <form>
                    <label htmlFor="title" className="text-lg">Planner Title</label><br/>
                    <input
                        type="text"
                        id="title"
                        className="border border-black rounded-md h-10 mb-10 w-80"
                        name="title"
                        value={ plannerTitle }
                        onChange={(e) => setPlannerTitle(e.target.value)}
                        placeholder="Title"
                    />

                    <p className="text-lg mb-2">Choose Planner Date(s):</p>
                    <p className="text-base px-6 mb-2">Weekly dates? (Mon-Fri)</p>
                    <div className="flex items-center gap-4 px-6 mb-4">
                        <div className="flex items-center gap-2">
                            <input type="radio" id="yesWeekly" name="weekly" value="Yes"
                                    className="appearance-none w-5 h-5
                                    border-2 border-gray-400 rounded-full
                                    checked:border-blue-dark checked:bg-blue-dark
                                    focus:ring-4 focus:ring-blue-light
                                    transition-all duration-200 cursor-pointer"
                                   checked={isWeekly === "Yes"}
                                   onChange={(e => setIsWeekly(e.target.value))}
                                />
                            <label htmlFor="yesWeekly">Yes</label><br/>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="radio" id="noWeekly" name="weekly" value="No"
                                   className="appearance-none w-5 h-5
                                   border-2 border-gray-400 rounded-full
                                   checked:border-blue-dark checked:bg-blue-dark
                                   focus:ring-4 focus:ring-blue-light
                                   transition-all duration-200 cursor-pointer"
                                   checked={isWeekly === "No"}
                                   onChange={(e) => setIsWeekly(e.target.value)}
                            />
                            <label htmlFor="noWeekly">No</label><br/>
                        </div>
                    </div>

                    {isWeekly === "Yes" && (
                        <div className="px-6">
                            <p className="text-base mb-2">Select weekly dates start and end time</p>
                            <div className="flex items-center gap-4 text-sm mb-2">
                                <div className="flex flex-col items-start gap-2">
                                    <label htmlFor="startTime">Start Time</label>
                                    <input type="time" id="startTime" name="time-picker" className="border border-black rounded-md p-2"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="endTime">End Time</label>
                                    <input type="time" id="endTime" name="time-picker" className="border border-black rounded-md p-2"/>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-4 px-6 mb-4 mt-8">
                        <button
                            onClick={addDateRow}
                            type="button"
                            className="flex items-center justify-center w-60 cursor-pointer bg-blue-light hover:bg-blue-light-hover text-black py-2 px-6 rounded transition"
                        >
                            + Add Specific Date
                        </button>

                        <div className="flex flex-col gap-4 w-150 mb-6">
                            {extraDates.map((row) => (
                                <div
                                    key={row.id}
                                    className="flex flex-wrap items-end gap-4 relative group"
                                >
                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeDateRow(row.id)}
                                        type="button"
                                        className="cursor-pointer bg-orange-hover hover:bg-orange text-white text-xs font-bold py-1 px-2 rounded-md mb-1 transition"
                                    >
                                        X
                                    </button>
                                    {/* Date Input */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-base">Date</label>
                                        <input
                                            type="date"
                                            className="border border-black p-2 rounded-md outline-none"
                                        />
                                    </div>

                                    {/* Start Time */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-base">Start Time</label>
                                        <input
                                            type="time"
                                            className="border border-black p-2 rounded-md outline-none"
                                        />
                                    </div>

                                    {/* End Time */}
                                    <div className="flex flex-col gap-1">
                                        <label className="text-base">End Time</label>
                                        <input
                                            type="time"
                                            className="border border-black p-2 rounded-md outline-none"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div id="shareWithWorkers" className="mb-5">
                        <label className="text-lg block mb-2">Share with Workers</label>
                        <div className="flex gap-2 mb-6">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddEmail(e)} // Replaces form submit behavior
                                placeholder="worker@email.com"
                                className="w-80 border border-black p-2 rounded-md outline-none focus:ring-2"
                            />
                            <button
                                type="button" // CRITICAL: Must be type="button" to avoid submitting the MAIN form
                                onClick={handleAddEmail}
                                className="cursor-pointer bg-blue-light px-6 py-2 rounded-md hover:bg-blue-light-hover transition"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {allEmails.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-2 bg-green-hover px-3 py-1 rounded-md mb-10"
                                >
                                    <button
                                        onClick={() => removeEmail(item.id)}
                                        className="cursor-pointer text-gray-500 hover:text-orange font-bold text-lg leading-none"
                                    >
                                        &times; {/* This is the 'X' symbol */}
                                    </button>
                                    <span className="text-sm font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex flex-col gap-1 w-40">
                            <label className="text-lg">Set the due date</label>
                            <input
                                type="date"
                                className="border border-black p-2 rounded-md outline-none"
                            />
                        </div>

                        <button
                            className="flex items-center justify-center w-60 cursor-pointer bg-blue-light hover:bg-blue-light-hover text-black py-2 px-6 rounded transition mt-12 mb-10"
                            onClick={(e) => handleSubmit(e)}>
                            Save Planner
                        </button>

                    </div>

                </form>
            </div>
        </section>
    );
}

export default ManagerNewPlanner;