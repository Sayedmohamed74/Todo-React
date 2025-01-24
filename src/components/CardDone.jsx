import React from 'react'

export default function CardDone({title,PopToTask,index}) {
  return (
    <div className="card-todo" onClick={()=>{
        PopToTask(index)
    }}>
    <div className="info-card">
      <p className="todo-done">{title}</p>
    
    </div>
  </div>
  )
}
