import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, removeHandler, updateTodo,editUpdateTodo }) => (
    <div>
      {todos.map((t, i) => (
        <TodoItem key={i} todo={t} removeHandler={removeHandler} updateTodo={updateTodo} editUpdateTodo={editUpdateTodo} />
      ))}
    </div>
  );

export default TodoList;
