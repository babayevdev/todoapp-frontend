import React, { useState, useMemo } from 'react';

const Pagination = ({ currentPage, totalPages, onChangePage }) => {
  const pageNumbers = useMemo(() => {
    const pn = [];
    for (let i = 1; i <= totalPages; i++) {
      pn.push(i);
    }
    return pn;
  }, [totalPages]);

  return (
    <div className="flex justify-center">
      <ul className="flex items-center space-x-4">
        <li>
          <button
            className={`border rounded-md py-1 px-3 font-medium ${
              currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-100'
            }`}
            onClick={() => onChangePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>
        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              className={`border rounded-md py-1 px-3 font-medium ${
                currentPage === page ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-100'
              }`}
              onClick={() => onChangePage(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            className={`border rounded-md py-1 px-3 font-medium ${
              currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-100'
            }`}
            onClick={() => onChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
