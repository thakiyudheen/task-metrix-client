import React, { useState } from "react";
import { Formik, Form } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import { InputField } from "../common/inputField/inputField";
import { addTaskSchema } from "@/lib/validation/addTask";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: FormValues) => any;
  initialTask?: FormValues;
  isEditMode?: boolean;
}

interface FormValues {
  task: string;
  date: string;
  completionStatus: boolean;
}



const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialTask = { task: "", date: "", completionStatus: false },
  isEditMode = false,
}) => {
  const handleSubmit = (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    onSave(values);
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg py-10 px-10 w-full max-w-md"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black">
                {isEditMode ? "Edit Task" : "Add Task"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>


            <Formik
              initialValues={initialTask}
              validationSchema={addTaskSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleBlur, errors, touched }) => (
                <Form>
                  <InputField
                    label="Task"
                    type="text"
                    name="task"
                    value={values.task}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.task}
                    touched={touched.task}
                  />
                  <InputField
                    label="Date"
                    type="date"
                    name="date"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.date}
                    touched={touched.date}
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-tr to-blue-600 from-blue-800 text-white py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {isEditMode ? "Update Task" : "Add Task"}
                  </button>
                </Form>
              )}
            </Formik>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddTaskModal;
