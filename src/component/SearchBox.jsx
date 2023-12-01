import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <div className="input-group">
      <input
        type="text"
        name="query"
        className="form-control border-2 px-2 rounded-lg"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      
    </div>
  );
};

export default SearchBox;
