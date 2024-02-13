import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import '../css/Navbar.css';

function Navbar() {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleSearch = () => {
        setIsExpanded(!isExpanded);
    };

    const handleOutsideClick = (event) => {
        if (!event.target.closest('.search-container')) {
            setIsExpanded(false);
        }
    };

    // Add event listener for outside click
    React.useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <nav className="h-[100px] flex items-center justify-between px-20 py-10">
            <div className="flex items-center">
                <div className="mr-[36px] font-bold">MovieSaga</div>
                <ul className="flex space-x-[36px]">
                    <li>
                        <NavLink to="/" activeclassname="active" className="p-1">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/movies" activeclassname="active" className="p-1">
                            Movies
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/tv-series" activeclassname="active" className="p-1">
                            TV Series
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/trending" activeclassname="active" className="p-1">
                            Trending
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/top-rated" activeclassname="active" className="p-1">
                            Top Rated
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex items-center relative search-container">
                {isExpanded && (
                    <input placeholder='Search' className={`bg-black text-white border-b-2 pb-1 border-yellow_default focus:outline-none`} />
                )}
                <IconButton onClick={handleToggleSearch}>
                    <SearchIcon className="text-white mr-10" />
                </IconButton>
                <li className='list-none'>
                    <NavLink to="/signin" activeclassname="active" className="p-1">
                        Sign In
                    </NavLink>
                </li>
            </div>
        </nav>
    );
}

export default Navbar;
