import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

function UserTable({ users }) {
  return (
    <div>
      <table className="table-fixed w-full bg-white border border-gray-300 shadow-md rounded-md m-3">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{emp.name}</td>
              <td className="border px-4 py-2">{emp.email}</td>
              <td className="border px-4 py-2">{emp.role}</td>
              <td className="border px-4 py-2">
                <div className="flex items-center space-x-4">
                  <span className="cursor-pointer text-black-500 text-lg hover:text-red-700">
                    <AiOutlineDelete />
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
    </div>
  );
}

export default UserTable;
