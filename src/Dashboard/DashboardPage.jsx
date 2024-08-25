import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, Timestamp, query, orderBy } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../Auth/firebase';

const MyModal = () => {
    const [isModal, setIsModal] = useState(false);
    const [isSavModalOpen, setIsSavModalOpen] = useState(false);

    // State for Transaction form
    const [transactionForm, setTransactionForm] = useState({
        Project: '',
        type: '',
        description: '',
        status: 'credited'
    });

    const [accept, setAccept] = useState(0);
    const [reject, setReject] = useState(0);
    const [Nft, setNft] = useState(0);

    // Handle input change for transaction form
    const handleTransactionChange = (e) => {
        const { name, value } = e.target;
        setTransactionForm((transaction) => ({ ...transaction, [name]: value }));
    };

    // Handle transaction form submission
    const handleTransactionSubmit = async (e) => {
        e.preventDefault();

        const transactionData = {
            Project: transactionForm.Project,
            type: transactionForm.type,
            description: transactionForm.description,
            status: transactionForm.status,
            date: Timestamp.now() // Store current time as Firestore timestamp
        };

        try {
            // Update counts based on the selected status
            if (transactionForm.status === "Accepted") {
                setAccept(accept + 1);
            } else if (transactionForm.status === "Rejected") {
                setReject(reject + 1);
            } else if (transactionForm.status === "Not Found Fit") {
                setNft(Nft + 1);
            }

            // Add the transaction data to Firestore
            await addDoc(collection(db, "transactions"), transactionData);
            console.log("Transaction added to Firestore!", transactionData);

            // Reset the form
            setTransactionForm({
                Project: '',
                type: '',
                status: '',
                description: ''
            });

            // Close modal after submission
            setIsModal(false);
        } catch (error) {
            console.error("Error adding transaction to Firestore: ", error);
        }
    };

    const [transactions, setTransactions] = useState([]);

    // Fetch transactions data from Firestore
    useEffect(() => {
        const q = query(collection(db, "transactions"), orderBy('date', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const transactionArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTransactions(transactionArray);
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, []);

    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const currentUser = auth.currentUser;

        if (currentUser) {
            // Extract the part of the email before the '@' symbol
            const email = currentUser.email;
            const nameBeforeAt = email.substring(0, email.indexOf('@'));
            setUserEmail(nameBeforeAt);
        }
    }, []);

    return (
        <div className="relative">
            <div className={`${isModal || isSavModalOpen ? 'blur-sm' : ''}`}>
                <>
                <div className="border lg:flex-row gap-4 flex bg-purple-50">
                        <div className="w-full w-4/6 mt-3 ml-4">
                            <div className="flex items-center gap-3 mb-6">
                                <img src="/assets/logo.png" className="w-14 h-14 rounded-full" />
                                <div>
                                    <h1 className=""> Good Morning <span className="font-bold ">{userEmail}</span></h1>
                                </div>
                            </div>
                            <div className="flex gap-3 mb-3">
                            <div className="w-80 p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 rounded-lg shadow flex justify-between items-center">
                                    <div>
                                        <p className="mt-2 text-gray-600 font-medium">Entries Received</p>
                                        <p className="mt-1 text-2xl font-bold text-gray-900">{transactions.length}</p>
                                    </div>
                                </div>

                                <div className="w-80 p-4 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 hover:border-yellow-300 rounded-lg shadow flex justify-between items-center">
                                    <div>
                                        <p className="mt-2 text-gray-600 font-medium">Accepted</p>
                                        <p className="mt-1 text-2xl font-bold text-gray-900">{accept}</p>
                                    </div>
                                </div>

                                <div className="w-80 p-4 bg-green-50 hover:bg-green-100 border border-green-200 hover:border-green-300 rounded-lg shadow flex justify-between items-center">
                                    <div>
                                        <p className="mt-2 text-gray-600 font-medium">Rejected</p>
                                        <p className="mt-1 text-2xl font-bold text-gray-900">{reject}</p>
                                    </div>
                                </div>

                                <div className="w-80 p-4 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 rounded-lg shadow flex justify-between items-center">
                                    <div>
                                        <p className="mt-2 text-gray-600 font-medium">Not Found Fit</p>
                                        <p className="mt-1 text-2xl font-bold text-gray-900">{Nft}</p>
                                    </div>
                                </div>

                                <div className="w-80 p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 hover:border-purple-300 rounded-lg shadow flex justify-between items-center">
                                    <div>
                                        <p className="mt-2 text-gray-600 font-medium">Taken Forward</p>
                                        <p className="mt-1 text-2xl font-bold text-gray-900">{transactions.length>0? accept>0?accept-1:0:0}</p>
                                    </div>
                                </div>
                            </div>

                            

                            <div className="min-w-full max-h-full bg-white mt-4 shadow-lg mb-7 rounded-xl overflow-x-auto">
                                <div className="flex justify-between px-4 py-4 items-center">
                                    <div className="font-bold text-xl">Your Entries</div>
                                    <div className="flex gap-2">
                                        <button 
                                            className="bg-gray-100 hover:bg-gray-200 border p-2 rounded-xl border-solid border-gray-400 hover:border-black text-gray-500 hover:text-black font-semibold"
                                            onClick={() => setIsModal(true)}
                                        >
                                            Add your Entry
                                        </button>
                                        <button
                                            className="bg-gray-100 hover:bg-gray-200 border p-2 rounded-xl border-solid border-gray-400 hover:border-black text-gray-500 hover:text-black font-semibold"
                                            onClick={() => setIsSavModalOpen(true)}
                                        >
                                           Add a new Campaign
                                        </button>
                                    </div>
                                </div>
                                <table className="min-w-full ">
                                <thead>
                                        <tr>
                                            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Project Name
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Description
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="min-w-full">
                                        {transactions.map((transaction, index) =>
                                            <tr key={index}>
                                                <td className="px-6 py-4 border-b border-gray-200 text-sm font-semibold text-gray-700 flex items-center gap-1">
                                                    {transaction.Project}
                                                </td>
                                                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-500">
                                                    {transaction.type}
                                                </td>
                                                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-500">
                                                    {transaction.description}
                                                </td>
                                                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-500">
                                                    {transaction.date.toDate().toDateString()}
                                                </td>
                                                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-500">

                                                    {transaction.status}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                               
                            </div>
                        </div>

                        <div className="w-2/6 p-5">
                            <div className="border border-gray-100 bg-blue-100 w-full shadow-sm rounded-xl h-full">
                                <div className="flex justify-between pt-8 p-4">
                                    <div className="flex gap-3 items-center">
                                        <div className="flex flex-col">
                                            <h2 className="text-lg font-bold">Recent Campaigns</h2>
                                            <p className="text-gray-500">50 running campaigns</p>
                                        </div>
                                    </div>
                                    <div className="text-lg font-semibold text-gray-500">
                                        <p>Progress</p>
                                    </div>
                                </div>
                                <div className="flex justify-between p-4 gap-2 mt-4">
                                    <div className="flex justify-between w-full bg-blue-50 p-3 hover:bg-blue-200 border border-blue-200 hover:border-blue-300 shadow-md rounded-xl">
                                        <div className="flex gap-3 items-center">
                                            <div>
                                               
                                            </div>
                                            <div>
                                                <h2 className="font-bold text-gray-700">Digital Revolution</h2>
                                                <p className="text-gray-500">Diversity hiring 2023</p>
                                            </div>
                                        </div>
                                        <div className="pt-3 font-bold">
                                            <p>85%</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between p-4 gap-2">
                                    <div className="flex justify-between w-full bg-yellow-50 p-3 hover:bg-yellow-100 border border-yellow-200 hover:border-yellow-300 shadow-md rounded-xl">
                                        <div className="flex gap-3 items-center">
                                            <div>
                                               
                                            </div>
                                            <div>
                                                <h2 className="font-bold text-gray-700">Digital Revolution</h2>
                                                <p className="text-gray-500">Diversity hiring 2023</p>
                                            </div>
                                        </div>
                                        <div className="pt-3 font-bold">
                                            <p>35%</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between p-4 gap-2">
                                    <div className="flex justify-between w-full bg-red-50 p-3 hover:bg-red-100 border border-red-200 hover:border-red-300 shadow-md rounded-xl">
                                        <div className="flex gap-3 items-center">
                                            <div>
                                               
                                            </div>
                                            <div>
                                                <h2 className="font-bold text-gray-700">Digital Revolution</h2>
                                                <p className="text-gray-500">Diversity hiring 2023</p>
                                            </div>
                                        </div>
                                        <div className="pt-3 font-bold">
                                            <p>25%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </>
            </div>

            {/* Modal for Transactions */}
            {isModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
                        <h2 className="text-lg font-semibold mb-4">Add New Entry</h2>
                        <form onSubmit={handleTransactionSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Project:</label>
                                <input
                                    type="text"
                                    name="Project"
                                    value={transactionForm.Project}
                                    onChange={handleTransactionChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Type:</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={transactionForm.type}
                                    onChange={handleTransactionChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Description:</label>
                                <textarea
                                    name="description"
                                    value={transactionForm.description}
                                    onChange={handleTransactionChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Status:</label>
                                <select
                                    name="status"
                                    value={transactionForm.status}
                                    onChange={handleTransactionChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="Accepted">Accepted</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Not Found Fit">Not Found Fit</option>
                                    <option value="Taken Forward">Taken Forward</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsModal(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    Save Entry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal for Saving Plans */}
            {isSavModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
                        <h2 className="text-lg font-semibold mb-4">Add Saving Plan</h2>
                        <form onSubmit={handleSavingPlanSubmit}>
                        <div className="mb-4">
                                <label className="block text-gray-700">Title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={savingPlanForm.title}
                                    onChange={handleSavingPlanChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Amount:</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={savingPlanForm.amount}
                                    onChange={handleSavingPlanChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Target:</label>
                                <input
                                    type="text"
                                    name="target"
                                    value={savingPlanForm.target}
                                    onChange={handleSavingPlanChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsSavModalOpen(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    Save Plan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyModal;
