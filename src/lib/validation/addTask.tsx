import * as Yup from "yup";

export const addTaskSchema = Yup.object().shape({
    task: Yup.string()
      .required("Task is required")
      .min(3, "Task must be at least 3 characters")
      .max(100, "Task must not exceed 100 characters"),
    date: Yup.date()
      .required("Date is required")
      .min(new Date(), "Date cannot be in the past"),
  });