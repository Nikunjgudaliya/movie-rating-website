import { NavLink } from 'react-router-dom';
import '../css/Navbar.css';

function Admin() {

    return (
        <>
            <nav className="h-[100px] w-full bg-black flex items-center justify-between px-20 py-10 mb-[30px] sticky top-0 z-10">
                <div className="flex items-center">
                    <div className="mr-[36px] font-bold">MovieSaga</div>
                    <ul className="flex space-x-[36px]">
                        <li>
                            <NavLink to="/admin" activeclassname="active" className="p-1">
                                User
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center relative search-container">
                    <li className='list-none'>
                        <NavLink to="/signup" activeclassname="active" className="p-1">
                            Sign Out
                        </NavLink>
                    </li>
                </div>
            </nav>
        </>
    )
}

export default Admin;
