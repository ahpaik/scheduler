import React, { useState, useEffect } from "react";

const DAYS = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'];
const HOURS = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];

const ManagerModifyScheduleLogic = () => {
    const [obj, setObj] = useState(null);
    const [activeWorker, setActiveWorker] = useState('WorkerA'); // Currently selected paint brush
    const [isDragging, setIsDragging] = useState(false);

    // Initial Data State
    const [schedule, setSchedule] = useState({
        'Mon-10:00': ['WorkerA'], 'Mon-10:30': ['WorkerA'],
        'Mon-11:00': ['WorkerA'], 'Mon-11:30': ['WorkerA'],
        'Mon-12:00': ['WorkerA'], 'Mon-12:30': ['WorkerA'],
        'Mon-1:00': ['WorkerB'], 'Mon-1:30': ['WorkerB'], // WorkerA 10-1, WorkerB 12-3
        'Mon-12:00-overlap': ['WorkerA', 'WorkerB'], // Logic will handle this below
        'Mon-2:00': ['WorkerB'], 'Mon-2:30': ['WorkerB'],
        'Wed-2:00': ['WorkerA'], 'Wed-2:30': ['WorkerA'],
    });

    // Seed initial state based on your requirements
    useEffect(() => {
        const initial = {
            // Worker A Monday 10-1
            'Mon-10:00': ['WorkerA'], 'Mon-10:30': ['WorkerA'], 'Mon-11:00': ['WorkerA'],
            'Mon-11:30': ['WorkerA'], 'Mon-12:00': ['WorkerA'], 'Mon-12:30': ['WorkerA'],
            // Worker B Monday 12-3
            'Mon-12:00': ['WorkerA', 'WorkerB'], 'Mon-12:30': ['WorkerA', 'WorkerB'],
            'Mon-1:00': ['WorkerB'], 'Mon-1:30': ['WorkerB'], 'Mon-2:00': ['WorkerB'], 'Mon-2:30': ['WorkerB'],
            // Worker A Wed 2-3
            'Wed-2:00': ['WorkerA'], 'Wed-2:30': ['WorkerA'],
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
                        className={`h-full flex-1 ${worker === 'WorkerA' ? 'bg-pink-400' : 'bg-green-400'} 
                        ${workers.length > 1 && idx === 0 ? 'border-r border-black/10' : ''}`}
                    />
                ))}
            </div>
        );
    };

    if (!obj) return <div className="p-10">Loading...</div>;

    return (
        <section className="px-10 mt-8 select-none pb-20">
            <h1 className="text-3xl mb-4">Edit {obj.title} Availability</h1>

            {/* Selection Controls */}
            <div className="flex gap-4 mb-6 items-center">
                <p className="font-bold">Select Worker to Paint:</p>
                <button
                    onClick={() => setActiveWorker('WorkerA')}
                    className={`px-4 py-2 border-2 flex items-center gap-2 rounded transition ${activeWorker === 'WorkerA' ? 'border-black bg-pink-100' : 'border-gray-200'}`}
                >
                    <div className="w-4 h-4 bg-pink-400 border border-black"></div> Worker A
                </button>
                <button
                    onClick={() => setActiveWorker('WorkerB')}
                    className={`px-4 py-2 border-2 flex items-center gap-2 rounded transition ${activeWorker === 'WorkerB' ? 'border-black bg-green-100' : 'border-gray-200'}`}
                >
                    <div className="w-4 h-4 bg-green-400 border border-black"></div> Worker B
                </button>
                <p className="text-sm italic text-gray-500 ml-4">Click and drag on the grid below</p>
            </div>

            <div className="max-w-4xl">
                <div
                    className="grid grid-cols-[80px_repeat(5,1fr)] border-t-2 border-l-2 border-black bg-white shadow-sm"
                    onMouseLeave={() => setIsDragging(false)}
                    onMouseUp={() => setIsDragging(false)}
                >
                    {/* Header */}
                    <div className="border-r-2 border-b-2 border-black bg-gray-100" />
                    {DAYS.map(day => (
                        <div key={day} className="border-r-2 border-b-2 border-black bg-gray-100 p-2 font-bold text-center">{day}</div>
                    ))}

                    {/* Grid */}
                    {HOURS.map((hour) => (
                        <React.Fragment key={hour}>
                            {[':00', ':30'].map((minute) => {
                                const isHalf = minute === ':30';
                                return (
                                    <React.Fragment key={minute}>
                                        <div className={`border-r-2 border-black p-2 text-right text-sm bg-gray-50 h-10 ${isHalf ? 'border-b-2 text-xs text-gray-400' : 'font-semibold'}`}>
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