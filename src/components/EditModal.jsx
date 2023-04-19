import React, { useState } from 'react'
import styles from './TodoItem.module.css';
// title, description, date,
function EditModal({editUpdateTodo, todo, onChangeTitle, onChangeDescription, onChangeDate, editModalOpen }) {
  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description)
  const [date, setDate] = useState(todo.date)

  function onChangeTitle(e) {
    let value = e.target.value
    console.log(title)
    setTitle(value);
  }

  function onChangeDescription(e){
    let value = e.target.value
    console.log(description)
    setDescription(value);
  }

  function onChangeDate(e){
    let value = e.target.value;
    console.log(date)
    setDate(value)
  }

  
  return (
    <div className={styles.textModal}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Todo</h5>
            <button type="button" className="btn-close" onClick={()=> editModalOpen()}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">Title</label>
              <input type="text" className="form-control" onChange={(e)=> onChangeTitle(e)} value={title} id="exampleFormControlInput1" placeholder="Enter your title" />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlTextarea1" className="form-label">Description</label>
              <textarea className="form-control" onChange={(e)=> onChangeDescription(e)} value={description} id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div className="mb-3">
              <label for="date" className="form-label date">Date: </label>
              <input type='date' id='date'  value={date} onChange={(e)=> onChangeDate(e)}  />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={()=> editModalOpen()}>Close</button>
            <button type="button" className="btn btn-primary" onClick={()=>editUpdateTodo(todo.id, { id: todo.id, title:title, description:description, date: date }, editModalOpen)}>update</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditModal