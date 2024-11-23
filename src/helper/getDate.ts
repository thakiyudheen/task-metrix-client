export const getTaskDateMessage = (taskDate: string): string => {
    const task = new Date(taskDate); 
    const today = new Date(); 
    const differenceInTime = task.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  
    if (differenceInDays === 0) {
      return "Today"; 
    } else if (differenceInDays === 1) {
      return "Tomorrow"; 
    } else if (differenceInDays > 1) {
      return `${differenceInDays} days left`; 
    } else {
      return `${Math.abs(differenceInDays)} days ago`; 
    }
  };