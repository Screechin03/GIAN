import React from 'react';

const CTASection = () => {
    return (
        <section className="relative bg-cover bg-center h-screen font-rubik" style={{ backgroundImage: `url('/assets/work.png')` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 text-center text-white flex flex-col justify-between h-full">
                <div className="flex flex-col items-center mt-8">
                    <h2 className="text-6xl font-bold mb-10 px-24">Ready to experience versatibility and simplicity of GIAN?</h2>
                    <div className="space-x-4 mb-10">
                        <button className="bg-blue-500 px-6 py-3 rounded-lg text-white hover:bg-blue-200 hover:text-black ">Get Started</button>
                        <button className="bg-transparent border-2 border-white px-6 py-3 rounded-lg text-white hover:border-gray-800 hover:text-gray-800 font-mono">Learn more</button>
                    </div>
                </div>
                
                {/* Socials div portion */}
                <div className="bg-white text-white p-8 rounded-2xl mb-4 mx-3">
                    <div className="flex justify-between items-start">
                        {/* Snappy section */}
                        <div className="flex-shrink-0">
                            <div className="text-2xl font-bold mb-2 text-blue-500">GIAN</div>
                            <div className="flex space-x-4">
                                <img src="https://via.placeholder.com/150" alt="App Store" className="w-24" />
                                <img src="https://via.placeholder.com/150" alt="Google Play" className="w-24" />
                            </div>
                        </div>
                        
                        {/* Links section */}
                        <div className="flex-grow flex justify-between">
                            <div className="ml-8">
                                <h3 className="text-xl font-bold mb-2 text-black">What we do</h3>
                                <ul className="space-y-1">
                                    <li><a href="#" className="hover:underline text-black">Features</a></li>
                                    <li><a href="#" className="hover:underline text-black">Security</a></li>
                                    <li><a href="#" className="hover:underline text-black">Business</a></li>
                                    <li><a href="#" className="hover:underline text-black">Services</a></li>
                                </ul>
                            </div>
                            
                            <div className="ml-8">
                                <h3 className="text-xl font-bold mb-2 text-black">About</h3>
                                <ul className="space-y-1">
                                    <li><a href="#" className="hover:underline text-black">Blog</a></li>
                                    <li><a href="#" className="hover:underline text-black">Meet The Team</a></li>
                                    <li><a href="#" className="hover:underline text-black">Contact Us</a></li>
                                </ul>
                            </div>
                            <div className="ml-8">
                                <h3 className="text-xl font-bold mb-2 text-black">Social Media</h3>
                                <ul className="space-y-1">
                                    <li><a href="#" className="hover:underline text-black">Twitter</a></li>
                                    <li><a href="#" className="hover:underline text-black">LinkedIn</a></li>
                                    <li><a href="#" className="hover:underline text-black">GitHub</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Container for "Trac|cart" text */}
                    <div className="overflow-hidden h-[210px] mt-4">
                        <div className="text-black text-[224px] tracking-[2rem] font-bold font-mono">
                            GIAN
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
