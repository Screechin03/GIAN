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

    const [transactions, setTransactions] = useState([]);
    const [acceptCount, setAcceptCount] = useState(0);
    const [rejectCount, setRejectCount] = useState(0);
    const [nftCount, setNftCount] = useState(0);
    const [takenForwardCount, setTakenForwardCount] = useState(0);

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

    // Fetch transactions data from Firestore
    useEffect(() => {
        const q = query(collection(db, "transactions"), orderBy('date', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const transactionArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTransactions(transactionArray);

            // Compute counts based on the fetched data
            const accepted = transactionArray.filter(txn => txn.status === "Accepted").length;
            const rejected = transactionArray.filter(txn => txn.status === "Rejected").length;
            const notFoundFit = transactionArray.filter(txn => txn.status === "Not Found Fit").length;
            const takenForward = transactionArray.filter(txn => txn.status === "Taken Forward").length;

            setAcceptCount(accepted);
            setRejectCount(rejected);
            setNftCount(notFoundFit);
            setTakenForwardCount(takenForward);
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
                                    <p className="mt-1 text-2xl font-bold text-gray-900">{acceptCount}</p>
                                </div>
                            </div>

                            <div className="w-80 p-4 bg-green-50 hover:bg-green-100 border border-green-200 hover:border-green-300 rounded-lg shadow flex justify-between items-center">
                                <div>
                                    <p className="mt-2 text-gray-600 font-medium">Rejected</p>
                                    <p className="mt-1 text-2xl font-bold text-gray-900">{rejectCount}</p>
                                </div>
                            </div>

                            <div className="w-80 p-4 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 rounded-lg shadow flex justify-between items-center">
                                <div>
                                    <p className="mt-2 text-gray-600 font-medium">Not Found Fit</p>
                                    <p className="mt-1 text-2xl font-bold text-gray-900">{nftCount}</p>
                                </div>
                            </div>

                            <div className="w-80 p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 hover:border-purple-300 rounded-lg shadow flex justify-between items-center">
                                <div>
                                    <p className="mt-2 text-gray-600 font-medium">Taken Forward</p>
                                    <p className="mt-1 text-2xl font-bold text-gray-900">{takenForwardCount}</p>
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
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {transaction.Project}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {transaction.type}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {transaction.description}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {transaction.date.toDate().toLocaleDateString()} {/* Format the date as needed */}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {transaction.status}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </>
            </div>

            {/* Modal Form for Adding Transaction */}
            {isModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
                        <form onSubmit={handleTransactionSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Project">
                                    Project
                                </label>
                                <input
                                    type="text"
                                    id="Project"
                                    name="Project"
                                    value={transactionForm.Project}
                                    onChange={handleTransactionChange}
                                    className="form-input mt-1 block w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                                    Type
                                </label>
                                <input
                                    type="text"
                                    id="type"
                                    name="type"
                                    value={transactionForm.type}
                                    onChange={handleTransactionChange}
                                    className="form-input mt-1 block w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={transactionForm.description}
                                    onChange={handleTransactionChange}
                                    className="form-textarea mt-1 block w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={transactionForm.status}
                                    onChange={handleTransactionChange}
                                    className="form-select mt-1 block w-full"
                                    required
                                >
                                    <option value="credited">Credited</option>
                                    <option value="debited">Debited</option>
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
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
                                >
                                    Submit
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
