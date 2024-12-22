import React from 'react'
import { LogIn } from 'lucide-react'

export const NavBar = () => {
    const handleClick = () => {
        window.open(process.env.REACT_APP_ADMIN_PANEL, '_blank'); // Open the URL in a new tab
      };
    return (
        <div className="navbar bg-base-100 rounded-xl shadow-glowLight dark:shadow-glowDark backdrop-blur-md">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a href='/'>Homepage</a></li>
                        <li><a href='/market'>Market</a></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <p className="btn btn-ghost text-responsive-content">Project CRYPTOS_</p>
            </div>
            <div className="navbar-end">
                <button onClick={handleClick} className="btn btn-ghost text-responsive-content">
                    Admin Panel
                    <LogIn size={"3vh"} />
                </button>
            </div>
        </div>
    )
}

export default NavBar