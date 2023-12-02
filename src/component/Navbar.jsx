import React, { useContext } from "react";
import SearchBox from "./SearchBox";
import AdminContext from "../context/adminContext";
import { FaSearch } from "react-icons/fa";

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

      <form className="flex items-baseline justify-content-between">
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <FaSearch style={{position: "relative",left: "-25px", cursor : "pointer"} } />
      </form>
    </nav>
  );
};

export default NavBar;
