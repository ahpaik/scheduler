import React, { useState, useEffect } from "react";

const DAYS = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'];
const HOURS = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];

const ManagerModifyScheduleLogic = () => {
    const [obj, setObj] = useState(null);
    const [activeWorker, setActiveWorker] = useState('WorkerA'); // Currently selected paint brush
    const [isDragging, setIsDragging] = useState(false);

    // Initial Data State
    const [schedule, setSchedule] = useState({});

    // Seed initial state based on your requirements
    useEffect(() => {
        const initial = {
            // Monday: Worker A (9-11 not available to be 9-10)
            'Mon-9:00': ['WorkerA'], 'Mon-9:30': ['WorkerA'],
            'Mon-10:00': ['WorkerA', 'WorkerB'], 'Mon-10:30': ['WorkerA', 'WorkerB'],
            // Tuesday: WorkerB (2-3)
            'Tues-2:00': ['WorkerB'], 'Tues-2:30': ['WorkerB'],
            // Wednesday: Worker B (11-12)
            'Wed-11:00': ['WorkerB'], 'Wed-11:30': ['WorkerB'],
            // Thursday: WorkerA (10-11)
            'Thurs-10:00': ['WorkerA'], 'Thurs-10:30': ['WorkerA'],
            'Thurs-11:00': ['WorkerA'], 'Thurs-11:30': ['WorkerA'],
            // Friday: WorkerB (2-3)
            'Fri-2:00': ['WorkerB'], 'Fri-2:30': ['WorkerB']

        };
        setSchedule(initial);
        setObj({title: "Interactive"}); // Placeholder for your fetch logic
    }, []);

    const toggleCell = (timeId) => {
        setSchedule(prev => {
            const currentWorkers = prev[timeId] || [];
            let newWorkers;

            if (currentWorkers.includes(activeWorker)) {
                // If worker is already there, remove them (toggle off)
                newWorkers = currentWorkers.filter(w => w !== activeWorker);
            } else {
                // Add worker to the slot
                newWorkers = [...currentWorkers, activeWorker];
            }

            return { ...prev, [timeId]: newWorkers };
        });
    };

    const handleMouseEnter = (timeId) => {
        if (isDragging) toggleCell(timeId);
    };

    const renderCellContent = (timeId) => {
        const workers = schedule[timeId] || [];
        return (
            <div className="flex flex-row h-full w-full pointer-events-none">
                {workers.map((worker, idx) => (
                    <div
                        key={idx}
                        className={`h-full flex-1 ${worker === 'WorkerA' ? 'bg-pink' : 'bg-green'} 
                        ${workers.length > 1 && idx === 0 ? 'border-r border-black/10' : ''}`}
                    />
                ))}
            </div>
        );
    };

    if (!obj) return <div className="p-10">Loading...</div>;

    return (
        <section className="max-w-4xl mb-8">
            {/* Selection Controls */}
            <div className="flex gap-4 mb-6 items-center">
                <button
                    onClick={() => setActiveWorker('WorkerA')}
                    className={`cursor-pointer px-4 py-2 border-2 flex items-center gap-2 rounded transition ${activeWorker === 'WorkerA' ? 'border-black bg-pink-100' : 'border-gray-200'}`}
                >
                    <div className="w-4 h-4 bg-pink border border-black"></div> Sophie
                </button>
                <button
                    onClick={() => setActiveWorker('WorkerB')}
                    className={`cursor-pointer px-4 py-2 border-2 flex items-center gap-2 rounded transition ${activeWorker === 'WorkerB' ? 'border-black bg-green-100' : 'border-gray-200'}`}
                >
                    <div className="w-4 h-4 bg-green border border-black"></div> Parker
                </button>
            </div>

            <div className="max-w-4xl">
                <div
                    className="grid grid-cols-[80px_repeat(5,1fr)] border-t-2 border-l-2 border-black bg-white shadow-sm"
                    onMouseLeave={() => setIsDragging(false)}
                    onMouseUp={() => setIsDragging(false)}
                >
                    {/* Header */}
                    <div className="border-r-2 border-b-2 border-black bg-blue-light" />
                    {DAYS.map(day => (
                        <div key={day} className="border-r-2 border-b-2 border-black bg-blue-light p-2 font-bold text-center">{day}</div>
                    ))}

                    {/* Grid */}
                    {HOURS.map((hour) => (
                        <React.Fragment key={hour}>
                            {[':00', ':30'].map((minute) => {
                                const isHalf = minute === ':30';
                                return (
                                    <React.Fragment key={minute}>
                                        <div className={`border-r-2 border-black p-2 text-right text-sm bg-blue-light h-10 ${isHalf ? 'border-b-2 text-xs text-gray-400' : 'border-b font-semibold'}`}>
                                            {isHalf ? minute : `${hour}:00`}
                                        </div>
                                        {DAYS.map(day => {
                                            const timeId = `${day}-${hour}${minute}`;
                                            return (
                                                <div
                                                    key={timeId}
                                                    onMouseDown={() => { setIsDragging(true); toggleCell(timeId); }}
                                                    onMouseEnter={() => handleMouseEnter(timeId)}
                                                    className={`border-r-2 border-black cursor-crosshair h-10 transition-colors ${isHalf ? 'border-b-2' : 'border-b'} hover:bg-gray-50`}
                                                >
                                                    {renderCellContent(timeId)}
                                                </div>
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ManagerModifyScheduleLogic;