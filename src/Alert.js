import React from "react";
import './index.css'

const Alert = ({showAlert})=>{

 const{msg, type} = showAlert
console.log(showAlert);

  return<div className={`alert-container ${type}`}>{msg}</div>
}

export default Alert