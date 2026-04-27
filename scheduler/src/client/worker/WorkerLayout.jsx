import { Outlet } from 'react-router-dom';
import WorkerNavbar from './WorkerNavbar.jsx';

export const WorkerLayout = () => (
    <>
        <WorkerNavbar />
        <main><Outlet /></main> {/* This is where the page content renders */}
    </>
);
export default WorkerLayout;