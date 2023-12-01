import React from "react";
import _ from 'lodash';

const Pagination = (props) => {
    const { itemsCount, pageSize,currentPage, onPageChange } = props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount <= 1) return null;
    const pages = _.range(1, pagesCount + 1); // return array of pages
  return (
    <nav className="flex items-center justify-center mt-[20px]">
      <ul className="flex">
        {pages.map((page) => (
          <li
            key={page}
            className={`px-3 py-2 border cursor-pointer rounded-md ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-200 hover:text-blue-700"
            }`}
            onClick={() => onPageChange(page)}
          >
            <a
              onClick={() => onPageChange(page)}
              className="block w-full h-full text-center cursor-pointer"
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
