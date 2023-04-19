import React, { useEffect, useState } from 'react';
import EditModal from './EditModal';
import styles from './TodoItem.module.css';
// import { act } from '@testing-library/react';

const TodoItem = ({editUpdateTodo, todo, removeHandler, updateTodo, title, description, date, onChangeTitle, onChangeDescription, onChangeDate }) => {
  const [editModal, setEditModal] = useState(false);

  const editModalOpen = ()=>{
    setEditModal(!editModal);
  }


  useEffect(() => {
    if(Date.parse(todo.date) < Date.now()){
      updateTodo(todo.id)
    }
  }, []);

  return (<div className={styles.itemContainer}>
    <div>
      <label
        htmlFor={`checkbox-${todo.id}`}
        className={todo.completed ? styles.completed + ' '+ styles.cardContainer : '' + styles.cardContainer}
      >
          <div className="card">
            <h5 className="card-header" style={{"backgroundColor" : `${todo.completed ? "red" : "green"}`}}>{todo.title}</h5>
            <div className="card-body">
              <p className="card-text">{todo.description}</p>
              <small className="card-title">{todo.date}</small>
              <div>
              <button disabled={todo.completed} onClick={() => updateTodo(todo.id)} className="btn btn-primary">completed</button>
              </div>
            </div>
            <div className={styles.btnMain}>
              <button
                className={styles.closeBtn + " btn btn-primary"}
                data-testid={`close-btn-${todo.id}`}
                onClick={() => editModalOpen()}
              >
                Edit
              </button>
              <button
                className={styles.closeBtn + " btn btn-danger"}
                data-testid={`close-btn-${todo.id}`}
                onClick={() => removeHandler(todo.id)}
              >
                delete
              </button>
            </div>
          </div>
        
      </label>
    </div>
    { editModal &&
      <EditModal 
        editModalOpen={editModalOpen} 
        todo={todo}  
        title={title}
        description={description}
        date={date}
        onChangeTitle={onChangeTitle} 
        onChangeDescription={onChangeDescription}
        onChangeDate={onChangeDate}
        editUpdateTodo={editUpdateTodo}
      
        />
    }
  </div>)
};

export default TodoItem;
