import React from 'react';

const Header1 = () => {
    return (
        <header className="flex justify-between items-center p-6 bg-white shadow-md">
            <div className="text-xl font-bold tracking-wide">GIAN</div>
            <nav>
                <ul className="flex space-x-6 font-semibold">
                    {['Home', 'Apps', 'Services', 'Blog', 'Business', 'Download'].map((text) => (
                        <li key={text} className="relative group">
                            <a href="#" className="relative z-10 text-black group-hover:text-blue-500 inline-block after:content-[''] after:absolute after:bg-blue-500 after:h-[2px] after:w-full after:left-0 after:bottom-0 after:origin-left after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">
                                <span className="transition-all duration-300 transform group-hover:-translate-y-1 group-hover:animate-bounce-custom group-hover:text-xl">
                                    {text}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded">EN</button>
            </div>
        </header>
    );
};

export default Header1;
