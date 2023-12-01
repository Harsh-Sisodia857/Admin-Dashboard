import React, { useContext } from "react";
import ListGroup from "./listGroup";
import AdminContext from "../context/adminContext";
import Pagination from './pagination';
import { paginate } from './../../utils/paginate';
import UserTable from './userTable';


function Home() {
  const context = useContext(AdminContext);
  const { user, pageSize, currentPage,setCurrentPage, searchQuery } = context;
  const roles = [...new Set(user.map((emp) => emp.role))];
  const handlePageChange = (page) => {
    console.log(page);
    context.updatePage(page);
    setCurrentPage(page);
  };

  const getData = () => {
     let data;
    data = paginate(user, currentPage, pageSize);
    return data;
  }

  const currPageEmp = getData();
  console.log(currPageEmp);
  return (
    <div className="my-10 box">
      <p className="m-2">Showing {user.length} employees in the database</p>
      <div className="grid grid-cols-[30%,70%] gap-4">
        <div className="mt-5">
          <ListGroup
            items={roles}
            textProperty="name"
            valuePropery="_id"
            // selectedItem={selectedGenre}
            // onItemSelect={handleGenreSelect}
          />
        </div>
        <div>
          <div className="container">
            
                {user ? (
                  <UserTable users={currPageEmp} />
                ) : (
                  "No User Found in The Database"
                )}
          </div>
          <div>
            <Pagination
              itemsCount={user.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
