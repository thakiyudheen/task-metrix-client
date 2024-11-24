import React from "react";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Determine the page buttons to display
  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 1); 
    const endPage = Math.min(totalPages, currentPage + 1); 

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center mt-4">
     
      <button
        className={`px-4 py-2 mr-2 flex justify-center items-center ${
          currentPage === 1 ? "text-gray-300" : "text-black"
        } rounded-lg`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <FaAngleDoubleLeft />
        <FaAngleDoubleLeft />
      </button>

      <div className="flex space-x-2">
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`py-1 px-3 rounded-lg text-sm ${
              page === currentPage
                ? "bg-gradient-to-l from-blue-500 to-blue-700 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        className={`px-4 py-2 ml-2 flex justify-center items-center ${
          currentPage === totalPages ? "text-gray-300" : "text-black"
        } rounded-lg`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <FaAngleDoubleRight />
        <FaAngleDoubleRight />
      </button>
    </div>
  );
};

export default Pagination;
