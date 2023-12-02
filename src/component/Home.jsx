import React, { useContext, useState } from "react";
import ListGroup from "./listGroup";
import AdminContext from "../context/adminContext";
import Pagination from './pagination';
import { paginate } from './../../utils/paginate';
import UserTable from './userTable';
import toast from "react-hot-toast";


function Home() {
  const [selectedRole, setSelectedRole] = useState("All");
  const context = useContext(AdminContext);
  const { user, pageSize, currentPage,setCurrentPage, searchQuery } = context;
  const roles = ["All",...new Set(user.map((emp) => emp.role))];
  
  const handlePageChange = (page) => {
    console.log(page);
    context.updatePage(page);
    setCurrentPage(page);
  };

  
  const handleRoleSelect = (r) => {
    setSelectedRole(r);
    setCurrentPage(1);
    toast.success(`Showing Employee with ${r} role`);
  };

     


 const getData = () => {
   let filterEmp = user;

   if (searchQuery) {
     filterEmp = user.filter((emp) =>
       emp.name.toLowerCase().startsWith(searchQuery.toLowerCase())
     );
   }

   if (selectedRole && selectedRole != "All") {
     filterEmp = filterEmp.filter((emp) => emp.role === selectedRole);
   }

  //  console.log(filterEmp)
   return filterEmp;
 };



  const getPaginationData = (allEmp) => {
    let newData = paginate(allEmp, currentPage, pageSize);
    // console.log(newData);
    return newData;
  };

  const allEmp = getData();

  let paginationData = getPaginationData(allEmp);
 
   const handlePrevious = () => {
     if (currentPage == 1) return;
     let newPage = currentPage - 1;
     setCurrentPage(newPage);
   };

   const handleNext = () => {
     let totalEmp = allEmp.length;
     if (currentPage == Math.ceil(totalEmp / pageSize)) return;
     let newPage = currentPage + 1;
     setCurrentPage(newPage);
   };

  return (
    <div className="my-10 box">
      <p className="m-2">
        {`Showing ${paginationData.length} out of ${allEmp.length} employees in the
        database`}
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
              <UserTable users={paginationData} />
            ) : (
              "No User Found in The Database"
            )}
          </div>
          <div>
            <Pagination
              itemsCount={allEmp.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
