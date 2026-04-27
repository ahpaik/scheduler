import { Link, useNavigate, useLocation } from 'react-router-dom';

const WorkerNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const showBack = location.pathname !== '/worker_home';

    return (
        <nav className="navbar w-full mt-5 flex flex-col gap-y-2 px-10">
            <div className="flex items-center justify-between w-full mb-2">
                <Link to="/worker_home" className="text-2xl font-bold tracking-tight hover:text-gray-600">
                    Scheduler
                </Link>
                <ul className="nav-links flex items-center list-none gap-x-8">
                    <li><Link to="/worker_home">Home</Link></li>
                    <li><Link to="/account">Account</Link></li>
                </ul>
            </div>

            <div className="flex flex-start">
                {showBack && (
                    <button onClick={() => navigate(-1)} className="back-button">
                        <span className="font-bold cursor-pointer bg-amber-400 hover:bg-amber-500 text-black py-1 px-4 rounded mt-4">&larr;</span>
                    </button>
                )}
            </div>
        </nav>
    );
};

export default WorkerNavbar;