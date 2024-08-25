import React,{useState} from 'react';
import './style.css';
const FAQSection = () => {

    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
       
        {
            question: "How secure are my conversations on GIAN?",
            answer: "We use end-to-end encryption to ensure your conversations are safe and private.",
        },
        {
            question: "Can I personalize my GIAN experience?",
            answer: "Yes, GIAN offers extensive personalization options to tailor the experience to your needs.",
        },
        {
            question: "What group features does GIAN offer?",
            answer: "GIAN provides a variety of group features, including group chats, shared media, and admin controls.",
        }
    ];
    return (
        <section className="bg-gray-50 p-12 font-rubik">
            <div className="max-w mx-auto grid grid-cols-1 md:grid-cols-2 gap-32 justify-between">
                <div className="mb-8 md:mb-0"> {/* Added margin-bottom for spacing */}
                    <h2 className="text-4xl font-bold mb-4">FAQ</h2>
                    <p className="text-xl">Do you have any questions for us? If there are any questions you want to ask, we will answer all your questions.</p>
                    <div className="mt-4 flex gap-1">
    <input
        type="email"
        placeholder="Enter your email"
        className="border p-3 rounded-xl shadow-md w-[500px] text-gray-700 hover:border-blue-500 hover:border-2 transition-colors"
    />
    <button className="px-4 py-3 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-700">Submit</button>
</div>

                </div>
                <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-300 rounded-md bg-white shadow-md">
                    <button
                        className="w-full text-left p-4 text-xl font-medium bg-gray-100 hover:bg-gray-200 transition-colors duration-200 ease-in-out flex items-center justify-between"
                        onClick={() => handleToggle(index)}
                    >
                        {faq.question}
                        <span
                            className={`transform ${openIndex === index ? 'rotate-180' : ''} transition-transform duration-300`}
                        >
                            <svg
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </span>
                    </button>
                    <div
                        className={`transition-max-height ${openIndex === index ? 'expanded' : 'collapsed'} bg-gray-50`}
                    >
                        {openIndex === index && (
                            <div className="p-4 text-gray-600">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
                </div>
           
        </section>
    );
};

export default FAQSection;
