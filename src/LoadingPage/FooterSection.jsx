import React from 'react';

const FooterSection = () => {
    return (
        <div className="bg-gray-800 text-white p-12">
            <div className="max-w-7xl  mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 font-rubik">
                <div>
                    <div className="text-2xl font-bold mb-4">GIAN</div>
                    <div className="flex space-x-4">
                        <img src="https://via.placeholder.com/150" alt="App Store" className="w-32" />
                        <img src="https://via.placeholder.com/150" alt="Google Play" className="w-32" />
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">What we do</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Features</a></li>
                        <li><a href="#" className="hover:underline">Security</a></li>
                        <li><a href="#" className="hover:underline">Business</a></li>
                        <li><a href="#" className="hover:underline">Services</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Use Snappy</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Android</a></li>
                        <li><a href="#" className="hover:underline">iPhone</a></li>
                        <li><a href="#" className="hover:underline">Mac/PC</a></li>
                        <li><a href="#" className="hover:underline">Snappy Web</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">About</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Blog</a></li>
                        <li><a href="#" className="hover:underline">Meet The Team</a></li>
                        <li><a href="#" className="hover:underline">Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Social Media</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Twitter</a></li>
                        <li><a href="#" className="hover:underline">LinkedIn</a></li>
                        <li><a href="#" className="hover:underline">GitHub</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FooterSection;
