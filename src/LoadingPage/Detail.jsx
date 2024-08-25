import React from 'react';

const ContactSection = () => {
    return (
        <section className="bg-blue-50 p-12">
            <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 space-x-24">
                <div className="md:pr-8 font-rubik w-[730px]"> {/* Add right padding to create space between columns on medium screens and up */}
                    <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
                    <p className="text-lg">Email, call, or complete the form to learn how gian can solve your messaging problem.</p>
                    <p className="mt-4">info@gian.io</p>
                    <p className="mt-2">321-221-231</p>
                    <a href="#" className="mt-2 text-blue-500">Customer Support</a>
                    <div className="mt-6 space-y-4 ">
                        <div>
                            <h3 className="font-bold">Customer Support</h3>
                            <p>Our support team is available around the clock to address any concerns or queries you may have.</p>
                        </div>
                        <div>
                            <h3 className="font-bold">Feedback and Suggestions</h3>
                            <p>We value your feedback and are continuously working to improve Gian.</p>
                        </div>
                        <div>
                            <h3 className="font-bold">Media Inquiries</h3>
                            <p>For media-related questions or press inquiries, please contact us at media@snappyapp.com.</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-mg font-rubik">
                    <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                    <form>
                        <div className="grid grid-cols-2 gap-4 mb-4 ">
                            <input type="text" placeholder="First name" className="border p-3 rounded w-full shadow-lg hover:border-blue-400" />
                            <input type="text" placeholder="Last name" className="border p-3 rounded w-full shadow-lg  hover:border-blue-400" />
                        </div>
                        <input type="email" placeholder="Your email" className="border p-3 rounded w-full mb-4 shadow-lg hover:border-blue-400" />
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <select className="border p-3 rounded shadow-lg  hover:border-blue-400">
                                <option>+62</option>
                                <option>+91</option>
                            </select>
                            <input type="text" placeholder="Phone number" className="border p-3 rounded w-full shadow-lg hover:border-blue-400" />
                        </div>
                        <textarea placeholder="How can we help?" className="border p-3 rounded w-full mb-4 h-24 shadow-lg hover:border-blue-400"></textarea>
                        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700">Submit</button>
                        <p className="text-sm text-gray-600 mt-4">
                            By contacting us, you agree to our <a href="#" className="text-blue-500">Terms of service</a> and <a href="#" className="text-blue-500">Privacy Policy</a>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
