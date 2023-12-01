import React, { useContext, useState } from "react";
import ListGroup from "./listGroup";
import AdminContext from "../context/adminContext";
import Pagination from './pagination';
import { paginate } from './../../utils/paginate';
import UserTable from './userTable';


function Home() {
  const [selectedRole, setSelectedRole] = useState(null);
  const context = useContext(AdminContext);
  const { user, pageSize, currentPage,setCurrentPage, searchQuery } = context;
  const roles = [...new Set(user.map((emp) => emp.role))];
  const handlePageChange = (page) => {
    console.log(page);
    context.updatePage(page);
    setCurrentPage(page);
  };

 const getData = () => {
   let filterEmp = user;

   if (searchQuery) {
     filterEmp = user.filter((emp) =>
       emp.name.toLowerCase().startsWith(searchQuery.toLowerCase())
     );
   }

   if (selectedRole) {
     filterEmp = filterEmp.filter((emp) => emp.role === selectedRole);
   }


   let newData = paginate(filterEmp, currentPage, pageSize);

   return newData;
 };


  const handleRoleSelect = (r) => {
    setSelectedRole(r);
    console.log(r);
    setCurrentPage(1);
  }

  const currPageEmp = getData();
  console.log(currPageEmp);

  let paginationData;
  if (searchQuery)
    paginationData = currPageEmp;
  else
    paginationData = user;
  return (
    <div className="my-10 box">
      <p className="m-2">
        Showing {paginationData.length} employees in the database
      </p>
      <div className="grid grid-cols-[30%,70%] gap-4">
        <div className="mt-5">
          <ListGroup
            items={roles}
            selectedItem={selectedRole}
            onItemSelect={handleRoleSelect}
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
              itemsCount={paginationData.length}
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
