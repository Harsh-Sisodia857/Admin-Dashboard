import React, { useContext, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import AdminContext from "../context/adminContext";
import toast from "react-hot-toast";
import _ from "lodash";

function UserTable({ users }) {
  const { deleteAUser, editAUser, handleSort, renderSortIcon } =
    useContext(AdminContext);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editedRow, setEditedRow] = useState(null);
  const [editedValues, setEditedValues] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  const toggleRowSelection = (userId) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(userId)) {
        return prevSelectedRows.filter((id) => id !== userId);
      } else {
        return [...prevSelectedRows, userId];
      }
    });
  };

  const toggleSelectAll = () => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.length === users.length) {
        // All rows are selected, so deselect all
        return [];
      } else {
        // Some rows are not selected, so select all
        return users.map((user) => user.id);
      }
    });
  };

  const startEditing = (user) => {
    setEditedRow(user.id);
    setEditedValues({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  const cancelEditing = () => {
    toast.error("Unsuccessful To Edit");
    setEditedRow(null);
  };

  const saveEditing = () => {
    toast.success("Successfully Edited");
    editAUser(editedValues);
    setEditedRow(null);
  };

  const deleteSelectedRows = () => {
    console.log(selectedRows);
    selectedRows.forEach((userId) => {
      console.log(userId);
      deleteAUser(userId);
    });

    setSelectedRows([]);
  };

  const isSelected = (userId) => {
    return selectedRows.includes(userId);
  };

  const isEditing = (userId) => {
    return editedRow === userId;
  };

  const handleInputChange = (userId, field, value) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  return (
    <div>
      <table className="table-fixed w-full bg-white border border-gray-400 shadow-md rounded-md m-3">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-2 py-2 w-10">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                  checked={selectedRows.length === users.length}
                  onChange={toggleSelectAll}
                />
              </label>
            </th>
            <th className="px-2 py-2" onClick={() => handleSort("name")}>
              Name {renderSortIcon("name")}
            </th>
            <th className="px-4 py-2" onClick={() => handleSort("email")}>
              Email {renderSortIcon("email")}
            </th>
            <th className="px-4 py-2" onClick={() => handleSort("role")}>
              Role {renderSortIcon("role")}
            </th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((emp) => (
            <tr
              key={emp.id}
              className={isSelected(emp.id) ? "bg-gray-200" : "bg-white"}
            >
              <td className="border px-2 py-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500"
                    checked={isSelected(emp.id)}
                    onChange={() => toggleRowSelection(emp.id)}
                  />
                </label>
              </td>
              <td className="border px-2 py-2">
                {isEditing(emp.id) ? (
                  <input
                    type="text"
                    value={editedValues.name}
                    onChange={(e) =>
                      handleInputChange(emp.id, "name", e.target.value)
                    }
                  />
                ) : (
                  emp.name
                )}
              </td>
              <td className="border px-4 py-2">
                {isEditing(emp.id) ? (
                  <input
                    type="text"
                    value={editedValues.email}
                    onChange={(e) =>
                      handleInputChange(emp.id, "email", e.target.value)
                    }
                  />
                ) : (
                  emp.email
                )}
              </td>
              <td className="border px-4 py-2">
                {isEditing(emp.id) ? (
                  <input
                    type="text"
                    value={editedValues.role}
                    onChange={(e) =>
                      handleInputChange(emp.id, "role", e.target.value)
                    }
                  />
                ) : (
                  emp.role
                )}
              </td>
              <td className="border px-4 py-2">
                <div className="flex items-center space-x-4">
                  {isEditing(emp.id) ? (
                    <>
                      <span
                        className="cursor-pointer text-green-500 text-lg hover:text-green-700"
                        onClick={saveEditing}
                      >
                        <FaSave />
                      </span>
                      <span
                        className="cursor-pointer text-red-500 text-lg hover:text-red-700"
                        onClick={cancelEditing}
                      >
                        <FaTimes />
                      </span>
                    </>
                  ) : (
                    <span
                      className="cursor-pointer text-green-500 text-lg hover:text-green-700"
                      onClick={() => startEditing(emp)}
                    >
                      <FaEdit />
                    </span>
                  )}
                  <span
                    className="cursor-pointer text-black-500 text-lg hover:text-red-700"
                    onClick={() => deleteAUser(emp.id)}
                  >
                    <AiOutlineDelete />
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
