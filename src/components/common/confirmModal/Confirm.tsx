import React from 'react';
import { motion } from 'framer-motion';

interface DeleteConfirmationProps {
  onCancel: () => void;
  onConfirm: () => void;
  message: string;
}

const Confirmation: React.FC<DeleteConfirmationProps> = ({ onCancel, onConfirm, message }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white rounded-lg p-6 w-80"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-2 text-center text-black">Are you sure?</h2>
        <p className="text-black mb-6 text-center">
          {message}
        </p>
        <div className="flex justify-center">
          <div>
            <button
              onClick={onCancel}
              className="px-4 py-1 mr-2 border border-blue-700 rounded-md text-blue-700 hover:bg-blue-700 transition-all duration-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-1 bg-blue-600 text-white border border-blue-700 rounded-md hover:bg-blue-700"
            >
              Yes
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Confirmation;
