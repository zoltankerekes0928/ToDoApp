import React from "react";
import { BsTrash } from 'react-icons/bs';
import {AiFillEdit} from 'react-icons/ai';
import './index.js'

const List = ({list, clearItem, editItem})=>{

  return ( <div className="list-container">{list.map((item)=>{
    
    return <div className="item-container" key={item.id}>
    <h3>{item.name}</h3>
    <div className="btn-conatiner">
      <button onClick={()=>editItem(item.id)}><AiFillEdit/></button>
      <button onClick={()=>clearItem(item.id)}><BsTrash/></button>
    </div>  
    </div>

    
  })}
   </div>
  )
}

export default List



