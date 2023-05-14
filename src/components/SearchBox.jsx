import React, { useEffect, useState } from "react";
import useDebounce from "../utils/useDebounce";

const SearchBox = ({ onSearch, ...attributes }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex items-center border rounded-md px-3 py-2" {...attributes}>
      <svg
        className="w-5 h-5 mr-2 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M22 22L15.5 15.5M10 16C14.4183 16 18 12.4183 18 8C18 3.58172 14.4183 0 10 0C5.58172 0 2 3.58172 2 8C2 12.4183 5.58172 16 10 16Z"
        />
      </svg>
      <input
        type="text"
        className="outline-none w-full text-gray-800"
        placeholder="Search for todos"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBox;
