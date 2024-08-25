import React, { useState } from 'react';

const AddProjectEntryPage = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        Project: '',
        type: '',
        description: '',
        date: '',
        status: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleFormSubmit}>
            {/* Your form fields here */}
            <input
                type="text"
                name="Project"
                value={formData.Project}
                onChange={handleChange}
                placeholder="Project Name"
                required
            />
            <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Type"
                required
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
            />
            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="Status"
                required
            />
            <button type="submit" className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
                Submit
            </button>
        </form>
    );
};

export default AddProjectEntryPage;
