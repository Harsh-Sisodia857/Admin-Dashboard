import React, { useContext } from "react";
import SearchBox from "./SearchBox";
import AdminContext from "../context/adminContext";

const NavBar = () => {
  const { searchQuery, setSearchQuery, setCurrentPage } = useContext(AdminContext);
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  return (
    <nav
      className="navbar flex justify-evenly items-center h-[65px]"
      style={{ borderBottom: "2px solid black" }}
    >
      <div className="navbar-brand">Admin Panel</div>

      <SearchBox value={searchQuery} onChange={handleSearch} />
    </nav>
  );
};

export default NavBar;
