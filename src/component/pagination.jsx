import React from "react";
import _ from 'lodash';
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";

const Pagination = (props) => {
    const { itemsCount, pageSize,currentPage, onPageChange,handleNext,handlePrevious } = props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount <= 1) return null;
    const pages = _.range(1, pagesCount + 1); // return array of pages
  return (
    <nav className="flex items-center justify-center mt-[20px]">
      <ul className="flex">
        <li className="m-[10px 3px]">
          <span
            className={`flex items-center justify-center margin: "10px 3px" ${
              currentPage === 1 ? "hidden" : ""
            }`}
            style={{ cursor: "pointer", margin: "auto 7px" }}
            onClick={handlePrevious}
          >
            <div>
              <FcPrevious className="inline mr-[-8px]" />
            </div>
            <div>
              <FcPrevious className="inline mr-1" />
            </div>
            <div>Previous</div>
          </span>
        </li>
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
        <li class="page-item">
          <a
            className={`flex items-center justify-center ${
              currentPage === Math.ceil(itemsCount / pageSize) ? "hidden" : ""
            }`}
            style={{ cursor: "pointer", margin: "10px 7px" }}
            onClick={handleNext}
          >
            <div>Next</div>
            <div>
              <FcNext className="inline ml-1" />
            </div>
            <div>
              <FcNext className="inline ml-[-9px]" />
            </div>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
