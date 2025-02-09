"use client";

import { useState } from "react";

interface PaginationProps {
  totalPages: number;
  onPageChange?: (page: number) => void; // Notify parent when page changes (optional)
}

const Pagination = ({ totalPages, onPageChange }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (onPageChange) onPageChange(page); // Notify parent if needed
    }
  };

  const getPageRange = () => {
    const range = [];
    const maxVisiblePages = 3;
    const ellipsisThreshold = 2;

    range.push(1);
    if (currentPage > ellipsisThreshold + 1) range.push("...");

    for (
      let i = Math.max(2, currentPage - ellipsisThreshold);
      i <= Math.min(totalPages - 1, currentPage + ellipsisThreshold);
      i++
    ) {
      range.push(i);
    }

    if (currentPage < totalPages - ellipsisThreshold) range.push("...");
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      <div className="flex items-center gap-2 text-sm">
        {getPageRange().map((item, index) =>
          item === "..." ? (
            <span key={index} className="px-2">...</span>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(item as number)}
              className={`px-2 rounded-sm ${currentPage === item ? "bg-lamaSky" : ""}`}
            >
              {item}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
