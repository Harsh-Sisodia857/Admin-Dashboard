import React from 'react'


const ListGroup = (props) => {
    const {
      items,
      textProperty,
      valueProperty,
      // selectedItem,
      // onItemSelect,
  } = props;
  
    return (
      <ul className="list-group" style={{ cursor: "pointer" }}>
        {items.map((item) => (
          <li key = {item}>
            {item}
          </li>
        ))}
      </ul>
    );
}
 
export default ListGroup;