import React from "react";

const ListGroup = (props) => {
  const { items, onItemSelect, selectedItem } = props;

  return (
    <ul className="bg-gray-100 p-4 rounded-md shadow-md">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item}
          className={`cursor-pointer py-2 px-4 mb-2 rounded-md ${
            item === selectedItem ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
