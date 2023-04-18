import React, { useEffect } from 'react';
import styles from './TodoItem.module.css';
// import { act } from '@testing-library/react';

const TodoItem = ({ todo, removeHandler, updateTodo }) => {
  useEffect(() => {
    if(Date.parse(todo.date) < Date.now()){
      updateTodo(todo.id)
    }
  }, []);

  return (<div className={styles.itemContainer}>
    <div>
      {/* <input
        type="checkbox"
        name={`checkbox-${todo.id}`}
        checked={todo.completed}
        data-testid={`checkbox-${todo.id}`}
        onChange={() => updateTodo(todo.id)}
        // className={styles.checkBox}
      /> */}
      <label
        htmlFor={`checkbox-${todo.id}`}
        className={todo.completed ? styles.completed : ''}
      >
        <div>
          <div className="card">
            <h5 className="card-header" style={{"backgroundColor" : `${todo.completed ? "red" : "green"}`}}>{todo.title}</h5>
            <div className="card-body">
              <h5 className="card-title">{todo.date}</h5>
              <p className="card-text">{todo.description}</p>
              <div>
              <button disabled={todo.completed} onClick={() => updateTodo(todo.id)} className="btn btn-primary">completed</button>
              </div>
            </div>
            {/* <button
              className={styles.closeBtn}
              data-testid={`close-btn-${todo.id}`}
              onClick={() => removeHandler(todo.id)}
            >
              X
            </button> */}
          </div>
          {/* <h6>{todo.title}</h6>
          <p>{todo.description}</p>
          <small>{todo.date}</small> */}
        </div>
      </label>
    </div>
    <button
      className={styles.closeBtn + " btn btn-danger"}
      data-testid={`close-btn-${todo.id}`}
      onClick={() => removeHandler(todo.id)}
    >
      delete
    </button>
  </div>)
};

export default TodoItem;
