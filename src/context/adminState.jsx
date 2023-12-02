import React, { useState, useEffect } from "react";
import AdminContext from "./adminContext";
import axios from "axios";
import toast from "react-hot-toast";

const AdminState = (props) => {
  const [user, setUser] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const updatePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const fetchUserData = async () => {
    const options = {
      method: "GET",
      url: "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
    };

    try {
      setLoading(true);
      const response = await axios.request(options);
      setUser(response.data);
      console.log(user);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const editAUser = (emp) => {
    setUser((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.id === emp.id) {
          // Replace the existing user with the updated one
          return emp;
        }
        return user;
      });
    });
  };


  const deleteAUser = (id) => {
    toast("Deleted Successfully", {
      icon: "🚮",
    });
    setUser((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        user,
        pageSize,
        setPageSize,
        currentPage,
        setCurrentPage,
        updatePage,
        searchQuery,
        setSearchQuery,
        deleteAUser,
        loading,
        editAUser
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
