import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [showMessages, setShowMessages] = useState(false);
    const [showPing, setShowPing] = useState(false);

    const toggleMessages = () => {
        setShowMessages(!showMessages);
        if (!showMessages) {
            setShowPing(true);
        }
    };

    useEffect(() => {
        if (showPing) {
            const timeout = setTimeout(() => {
                setShowPing(false);
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [showPing]);

    return (
        <>
            <div className="fixed top-0 left-0 w-full bg-zinc-100 backdrop-blur-lg z-50 border-b py-6 px-4 flex justify-between items-center shadow-lg">
                <div className="flex space-x-8 items-center rounded-2xl h-23 ">
                    <img src="/assets/gian.png" className="rounded-xl h-[2.8vw]" alt="Logo"/>
                </div>
                <nav>
                    <ul className="flex space-x-6 font-semibold font-rubik">
                        {['Home', 'Contact', 'Logout'].map((text) => (
                            <li key={text} className="relative group">
                                <Link 
                                    to={`/${text.toLowerCase()}`}
                                    className="relative z-10 text-black group-hover:text-blue-500 inline-block after:content-[''] after:absolute after:bg-blue-500 after:h-[2px] after:w-full after:left-0 after:bottom-0 after:origin-left after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300"
                                >
                                    <span className="transition-all duration-300 transform group-hover:-translate-y-1 group-hover:animate-bounce-custom group-hover:text-xl">
                                        {text}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex justify-between gap-7 items-center">
                    <div className="relative">
                        <svg 
                            onClick={toggleMessages} 
                            className="h-6 w-6 text-slate-500 hover:text-red-500 cursor-pointer" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />  
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                        {showMessages && (
                            <div className={`absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-20 cursor-pointer ${showPing ? 'animate-ping' : ''}`}>
                                <ul className="divide-y divide-gray-100 shadow-xl">
                                    <li className="p-4 text-sm">Welcome user, Great to have you onboard! Hope you find this website fulfills your needs.</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="pt-24"> {/* This padding ensures content is not hidden behind the fixed header */}
                {/* Your page content goes here */}
            </div>
        </>
    );
}

export default Header;
