import React from 'react';
import { MdClear } from "react-icons/md";
function ConfirmModal({onClose, onConfirm }) {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-sm mx-auto">
       <div className="flex justify-end">
         <MdClear  onClick={onClose} className='cursor-pointer hover:text-red-600 font-bold text-xl'/>
       </div>
        <h2 className="text-lg font-bold mb-4">Confirm to delete?</h2>
        <p className="mb-6">Are you sure you want to delete this product?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
