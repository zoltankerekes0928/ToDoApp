import React,{useState, useEffect}  from "react";
import Alert from "./Alert";
import List from "./List";
import './index.css'


function getLocalStorage(){
  const todo = localStorage.getItem("todo")
  return JSON.parse(todo)
}

function App() {


  const [todo, setTodo] = useState("")
  const [list, setList] = useState(getLocalStorage())
  const [showAlert, setShowAlert] = useState({show: false, msg :"", type:""})
  const [isEdited, setIsEdited] = useState(false)
  const [editedId, setEditedId] = useState(null)

  const handleSubmit = (e)=>{
    e.preventDefault()

    if(!todo){
      setList([...list])
      setShowAlert({show: true, msg:"Please add item", type:"alert"})
      
    }else if(todo && isEdited){
      const editItem = list.find(item=>item.id == editedId)
      editItem.name = todo
      setList([...list])
      setIsEdited(false)
      setEditedId(null)
      setTodo("")
      setShowAlert({show: true, msg:"Item updated", type:"success"})

    console.log(editItem);
       
    }else{
      const newItem = {id: new Date().getTime().toString(), name:todo }
      setList([...list, newItem])
      setShowAlert({show:true, msg:"Item added", type:"success"})
      setTodo("")
     
    }
  }


  useEffect(() => {
    const timeOut = setTimeout(()=>{
      setShowAlert({show: false, msg :"", type:""})
    },2000)
    return () => {
      clearInterval(timeOut)
    }
  }, [list])


    const clearItem = (id)=>{
      setList(list.filter((item)=>item.id != id))
      setShowAlert({show:true, msg:"Item deleted", type:"alert"})
      setIsEdited(false)
      setEditedId(null)
      setTodo("")
      
    }

    const editItem = (id)=>{
      setIsEdited(true)
      setEditedId(id)
      const editedItem = list.find((item)=>item.id === id)
      
      setTodo(editedItem.name)
        
    }

    const clearAll = ()=>{
      setShowAlert({show: true, msg:"All item deleted", type:"alert"})
      setList([])
      setIsEdited(false)
      setEditedId(null)
      setTodo("")
     
    }

      useEffect(()=>{

        setLocalStorage()


      }, [list])

      const setLocalStorage = ()=>{
        localStorage.setItem("todo", JSON.stringify(list))
      }

  return (
    <div className="todoContainer">
      
      <form onSubmit={handleSubmit}>
        <div className="alert-place">
        {showAlert.show && <Alert  showAlert={showAlert}/>}
        </div>
        <label htmlFor="todo" className="input">Next To do:</label>
        <input type="text" name="todo" className="input" id="input" placeholder="todo..." value={todo} onChange={(e)=>setTodo(e.target.value)}/>
        <button type="submit">{isEdited ? "Update" : "Submit"}</button>
      </form>
        <List list={list} clearItem={clearItem} editItem={editItem} />
        <button id="clearBtn" onClick={clearAll}>Clear All</button>
    </div>
  );
}

export default App;
