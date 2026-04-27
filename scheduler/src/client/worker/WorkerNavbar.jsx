import { Link } from 'react-router-dom';

const WorkerNavbar = () => {
    return (
        <nav className="navbar w-full mt-5 flex items-center justify-between px-10">
            <Link to="/worker_home" className="text-2xl font-bold tracking-tight hover:text-gray-600">
                Scheduler
            </Link>

            <ul className="nav-links flex items-center list-none gap-x-8">
                <li><Link to="/worker_home">Home</Link></li>
                <li><Link to="/account">Account</Link></li>
            </ul>
        </nav>
    );
};

export default WorkerNavbar;