import React, { useContext, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import AdminContext from "../context/adminContext";

function UserTable({ users }) {
  const { deleteAUser } = useContext(AdminContext);
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleRowSelection = (userId) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(userId)) {
        // If the row is already selected, remove it
        return prevSelectedRows.filter((id) => id !== userId);
      } else {
        // If the row is not selected, add it
        return [...prevSelectedRows, userId];
      }
    });
  };

  const deleteSelectedRows = () => {
    // Call your delete function for each selected row
    console.log(selectedRows);
    selectedRows.forEach((userId) => {
      console.log(userId)
      deleteAUser(userId);
    });


    // Clear the selected rows after deletion
    setSelectedRows([]);
  };

  return (
    <div>
      <table className="table-fixed w-full bg-white border border-gray-300 shadow-md rounded-md m-3">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-2 py-2 w-10">
              {/* Empty header for checkbox column */}
            </th>
            <th className="px-2 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((emp) => (
            <tr key={emp.id} className={`hover:bg-gray-100`}>
              <td className="border px-2 py-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500"
                    checked={selectedRows.includes(emp.id)}
                    onChange={() => toggleRowSelection(emp.id)}
                  />
                </label>
              </td>
              <td className="border px-2 py-2">{emp.name}</td>
              <td className="border px-4 py-2">{emp.email}</td>
              <td className="border px-4 py-2">{emp.role}</td>
              <td className="border px-4 py-2">
                <div className="flex items-center space-x-4">
                  <span className="cursor-pointer text-black-500 text-lg hover:text-red-700">
                    <AiOutlineDelete onClick={() => deleteAUser(emp.id)} />
                  </span>
                  <span className="cursor-pointer text-green-500 text-lg hover:text-green-700">
                    <FaEdit />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className={`${
          selectedRows.length > 0 ? "flex" : "hidden"
        } justify-end mt-4`}
      >
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center"
          onClick={deleteSelectedRows}
        >
          <span>Delete All</span>
          <AiFillDelete className="ml-2" />
        </button>
      </div>
    </div>
  );
}

export default UserTable;
