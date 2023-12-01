import React, { useState, useEffect } from "react";
import AdminContext from "./adminContext";
import axios from "axios";


const AdminState = (props) => {
    const [user, setUser] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const updatePage = (newPage) => {
      setCurrentPage(newPage);
    };

  const fetchUserData = async () => {
        const options = {
            method: 'GET',
            url: 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',
        };

        try {
            const response = await axios.request(options);
            setUser(response.data);
            console.log(user);
        } catch (error) {
            console.error(error);
        }
  }
  
    const deleteAUser = (id) => {
      setUser((prevUsers) => prevUsers.filter((user) => user.id !== id));
    };


    useEffect(() => {
        fetchUserData()
    },[])

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
          deleteAUser
        }}
      >
        {props.children}
      </AdminContext.Provider>
    );
}

export default AdminState;