import { useEffect, useState } from "react";
import "./App.css";
import CardTodo from "./components/CardTodo";
import CardDone from "./components/CardDone";

function App() {
  const [task,setTask]=useState('');
  const [todoList, setTodoList] = useState([]);
  const [todoDone, setTodoDone] = useState([]);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  useEffect(()=>{
    if(localStorage.getItem('tasks')){
      setTodoList(JSON.parse(localStorage.getItem('tasks')))
    }
    if(localStorage.getItem('DoneTask')){
      setTodoDone(JSON.parse(localStorage.getItem('DoneTask')))
    }
  }
  ,[])
useEffect(()=>{
  console.log(todoDone);
  console.log(todoList);
  
},[todoDone,todoList])
  const getTask=(e)=>{
    setTask(e.target.value);
  }
const saveInLocalStorage=(key,data)=>{
  localStorage.setItem(key,JSON.stringify(data))
}
  const handleAddTask =(e)=>{
    e.preventDefault();
    if(task.trim()){
      setTodoList([...todoList,task.trim()])
      saveInLocalStorage('tasks',[...todoList,task.trim()]);
      setTask('')
      
      
    }
  }

  const handleDeleteTask=(index)=>{
    const cloneTodo =todoList;
    const updataList=cloneTodo.filter((_,i)=>i!==index)
    setTodoList(updataList);
    saveInLocalStorage('tasks',updataList)


  }
  const hadndleCompleteTask=(index)=>{
    const cloneTodo =todoList;
    const task = todoList[index];
    const updataList=cloneTodo.filter((_,i)=>i!==index)
    setTodoList(updataList);
    setTodoDone([...todoDone,task]);
    saveInLocalStorage('tasks',updataList);
    console.log([...todoDone,task]);
    
    saveInLocalStorage('DoneTask',[...todoDone,task]);
  }
const handleReturnDoneToTasks=(index)=>{
  const cloneTodo =todoDone;
  const task = todoDone[index];
 const updataList= cloneTodo.filter((_,i)=>i!==index);
  setTodoDone(updataList);
  setTodoList([task,...todoList])
  saveInLocalStorage('tasks',[task,...todoList]);
  saveInLocalStorage('DoneTask',updataList);
}
const onDragStart = (e, index) => {
  setDraggedItemIndex(index);
};

const onDrop = (e, index) => {
  e.preventDefault();
  const updatedItems = [...todoList];
  const draggedItem = updatedItems[draggedItemIndex];

  // Remove the dragged item and insert it at the new position
  updatedItems.splice(draggedItemIndex, 1);
  updatedItems.splice(index, 0, draggedItem);

  setTodoList(updatedItems);
  saveInLocalStorage('tasks',updatedItems);
  setDraggedItemIndex(null);
};

  return (
    <section className="todo">
      <div className="container">
        <form onSubmit={handleAddTask}>
          <div className="w-all form-wrapper">
            <input type="text" placeholder="Add a new task" value={task} onChange={getTask} />
            <button type="submit">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12C24 12.2652 23.8946 12.5196 23.7071 12.7071C23.5196 12.8946 23.2652 13 23 13H13V23C13 23.2652 12.8946 23.5196 12.7071 23.7071C12.5196 23.8946 12.2652 24 12 24C11.7348 24 11.4804 23.8946 11.2929 23.7071C11.1054 23.5196 11 23.2652 11 23V13H1C0.734784 13 0.48043 12.8946 0.292893 12.7071C0.105357 12.5196 0 12.2652 0 12C0 11.7348 0.105357 11.4804 0.292893 11.2929C0.48043 11.1054 0.734784 11 1 11H11V1C11 0.734784 11.1054 0.48043 11.2929 0.292893C11.4804 0.105357 11.7348 0 12 0C12.2652 0 12.5196 0.105357 12.7071 0.292893C12.8946 0.48043 13 0.734784 13 1V11H23C23.2652 11 23.5196 11.1054 23.7071 11.2929C23.8946 11.4804 24 11.7348 24 12Z" fill="white" />
              </svg>

            </button>
          </div>
        </form>
        <div className="todo-wrapper">
          <h3>Task to do - {todoList.length}</h3>
          <div className="content-todo">
            
          {
            todoList.map((text,i)=>(
              <CardTodo title={text} index={i} onDragStart={ onDragStart} onDrop={onDrop} key={i} onClickComplete={hadndleCompleteTask} onClickDelete={handleDeleteTask}/>
            ))
          }
          </div>
        </div>
        <div className="todo-wrapper">
          <h3>Done - {todoDone.length}</h3>
          <div className="content-todo">
           {
              todoDone.map((text,i)=>{
                return <CardDone key={i} title={text} index={i} PopToTask={handleReturnDoneToTasks}/>
              })
            } 
            
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;

/* import { useState } from 'react';
import './App.css';
const Card = ({ item, index, onDragStart, onDrop }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, index)}
      style={{
        margin: '10px',
        padding: '10px',
        border: '1px solid black',
        cursor: 'move',
      }}
    >
      {item}
    </div>
  );
};

function App() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const onDragStart = (e, index) => {
    setDraggedItemIndex(index);
  };

  const onDrop = (e, index) => {
    e.preventDefault();
    const updatedItems = [...items];
    const draggedItem = updatedItems[draggedItemIndex];

    // Remove the dragged item and insert it at the new position
    updatedItems.splice(draggedItemIndex, 1);
    updatedItems.splice(index, 0, draggedItem);

    setItems(updatedItems);
    setDraggedItemIndex(null);
  };

  return (
    <div>
      <h3>Drag and Drop Example</h3>
      <div>
        {items.map((item, index) => (
          <DraggableItem
            key={index}
            index={index}
            item={item}
            onDragStart={onDragStart}
            onDrop={onDrop}
          />
        ))}
      </div>
    </div>
  );
};


export default App;
 */
