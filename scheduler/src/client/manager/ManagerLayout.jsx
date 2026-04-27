import { Outlet } from 'react-router-dom';
import ManagerNavbar from './ManagerNavbar.jsx';

export const ManagerLayout = () => (
    <>
        <ManagerNavbar />
        <main><Outlet /></main> {/* This is where the page content renders */}
    </>
);
export default ManagerLayout;