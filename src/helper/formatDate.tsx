export const formatDateForInput = (date: string): string => {
    const taskDate = new Date(date);
    return taskDate.toISOString().split("T")[0]; 
  };