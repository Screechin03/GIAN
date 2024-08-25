import React from 'react';

function Contact() {
    return (
        <div className="fixed inset-0 bg-gradient-to-r from-pink-600 to-transparent via-orange-400 bg-gradient-to-l from-blue-300">
            <header className="p-6 flex justify-between items-center max-w-7xl mx-auto">
                <nav className="flex space-x-6">
                    <a href="#" className="text-lg font-semibold font-jersey hover:text-white">Home</a>
                    <a href="#" className="text-lg font-semibold font-jersey hover:text-white">About</a>
                </nav>
                <div className="text-xl md:text-2xl font-semibold font-jersey"></div>
                <nav className="flex space-x-4 md:space-x-6">
                    <a href="#" className="text-lg font-semibold font-jersey hover:text-blue-600">Work</a>
                    <a href="#" className="text-lg font-semibold font-jersey hover:text-blue-600">About</a>
                </nav>
            </header>

            <main className="flex-1 flex flex-col p-4 sm:p-6">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 font-jersey max-w-full md:max-w-3xl px-4 md:px-12">
                    Let us know what you would like to communicate, and we will get back to you as soon as possible.
                </h1>

                <div className="flex items-center w-full max-w-full sm:max-w-md ml-auto px-4 sm:px-0">
                    <input
                        type="email"
                        placeholder="Mail us"
                        className="p-3 sm:p-4 w-full rounded-l-md border border-gray-300 focus:outline-none font-jersey"
                    />
                    <button className="bg-black text-white p-3 sm:p-4 rounded-r-md w-20 sm:w-24 font-jersey hover:bg-gray-800">
                        Next
                    </button>
                </div>

                <div className="flex justify-center sm:justify-start mt-8 sm:mt-12 px-6 sm:px-14 space-x-2 sm:space-x-4">
                    <img src="/assets/person1.png" alt="Person 1" className="w-16 sm:w-20 h-16 sm:h-20 hover:w-20 sm:hover:w-24 hover:h-20 sm:hover:h-24 rounded-md transform -translate-y-5 sm:-translate-y-10" />
                    <img src="/assets/person2.png" alt="Person 2" className="w-16 sm:w-20 h-16 sm:h-20 hover:w-20 sm:hover:w-24 hover:h-20 sm:hover:h-24 rounded-md transform translate-y-5 sm:translate-y-10" />
                    <img src="/assets/person3.png" alt="Person 3" className="w-16 sm:w-20 h-16 sm:h-20 hover:w-20 sm:hover:w-24 hover:h-20 sm:hover:h-24 rounded-md transform -translate-y-5 sm:-translate-y-10" />
                    <img src="/assets/person4.png" alt="Person 4" className="w-16 sm:w-20 h-16 sm:h-20 hover:w-20 sm:hover:w-24 hover:h-20 sm:hover:h-24 rounded-md transform translate-y-5 sm:translate-y-10" />
                    <img src="/assets/person5.png" alt="Person 5" className="w-16 sm:w-20 h-16 sm:h-20 hover:w-20 sm:hover:w-24 hover:h-20 sm:hover:h-24 rounded-md transform -translate-y-5 sm:-translate-y-10" />
                    <img src="/assets/person6.png" alt="Person 6" className="w-16 sm:w-20 h-16 sm:h-20 hover:w-20 sm:hover:w-24 hover:h-20 sm:hover:h-24 rounded-md transform translate-y-5 sm:translate-y-10" />
                </div>
            </main>

            <footer className="p-4 sm:p-6 flex justify-end items-center max-w-7xl mx-auto space-x-4 sm:space-x-8">
                <div className="text-lg sm:text-xl text-gray-700">
                    <p className="font-bold text-3xl sm:text-5xl font-jersey text-gray-400">120+</p>
                    <p className="text-sm sm:text-xl font-jersey text-gray-400">Messages sent</p>
                </div>
                <div className="text-lg sm:text-xl text-gray-700">
                    <p className="font-bold text-3xl sm:text-5xl font-jersey text-gray-400">90%</p>
                    <p className="text-sm sm:text-xl text-gray-400 font-jersey">Response</p>
                </div>
            </footer>
        </div>
    );
}

export default Contact;
