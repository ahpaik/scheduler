import { Link, useNavigate, useLocation } from 'react-router-dom';

const ManagerNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const showBack = location.pathname !== '/worker_home' && location.pathname !== '/manager_home/created_planner';

    return (
        <nav className="navbar w-full mt-5 flex flex-col gap-y-2 px-10">
            <div className="flex items-center justify-between w-full mb-2">
                <Link to="/manager_home" className="text-2xl font-bold tracking-tight text-blue-dark hover:text-blue-dark-hover duration-200">
                    Scheduler
                </Link>
                <ul className="nav-links flex items-center list-none gap-x-8">
                    <li className="hover:text-gray-400"><Link to="/manager_home">Home</Link></li>
                    <li className="hover:text-gray-400"><Link to="/account">Account</Link></li>
                </ul>
            </div>

            <div className="flex flex-start">
                {showBack && (
                    <button onClick={() => navigate(-1)} className="back-button">
                        <span className="font-bold cursor-pointer bg-blue-light hover:bg-blue-light-hover text-black py-1 px-4 rounded mt-4">&larr;</span>
                    </button>
                )}
            </div>
        </nav>
    );
};

export default ManagerNavbar;