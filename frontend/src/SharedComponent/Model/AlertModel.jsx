import React, { useState } from 'react';

// Modal component
const Modal = ({title, body, onCancel, onDelete }) => {
   

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="mt-2">{body}</p>
                <button
                    onClick={onCancel}
                    className="mt-4 mx-2 px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                    Cancel
                </button>
                <button
                    onClick={onDelete}
                    className="mt-4 mx-2 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Modal;
