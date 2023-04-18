import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import './App.css';
import { act } from '@testing-library/react';
import TodoItem from './components/TodoItem';

function App() {

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [newTodo, setNewTodo] = useState({});
  const [saving, setSaving] = useState(false);
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
  function removeTodo(id) {
    setTodos(todos.filter(t => t.id !== id));
  }

  function updateTodo(id) {
    setLoading(true);
    const newList = todos.map((todoItem) => {
      if (todoItem.id === id) {
        const updatedItem = { ...todoItem, completed:  true  };
        return updatedItem;
      }
      return todoItem;
    });
    setTodos(newList);
    setLoading(false);
  }

  function addTodo(e) {
    e.preventDefault();
    const value = {
      userId: 3,
      id: Math.floor(Math.random() * 10000) + 1,
      title: title,
      description: description,
      date: date,
      completed: false,
    };

    setSaving(true);
    fetch(process.env.REACT_APP_API_URL, {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setTodos(todos.concat({ ...result, id: value.id }));
        setSaving(false);
      });
      setTitle("")
      setDescription("")
      setDate("")
  }

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(process.env.REACT_APP_API_URL).then((response) =>
        response.json()
      );
      act(() => {
        // setTodos(result.slice(0, 5));
        setLoading(false);
      })

    }
    fetchData();
  }, []);
  return (
    <div className="App">
      <div className="add-todo-form">
        <h1 style={{"marginBottom": "50px"}}>Champs Todo List</h1>
        {saving ? (
          'Saving'
        ) : (
          <form onSubmit={addTodo}>
          <div className="mb-3">
            {/* <label htmlFor="exampleInputEmail1" className="form-label" >Title</label> */}
            <input placeholder='Title' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChangeTitle}/>
          </div>
          <div className="mb-3">
            {/* <label htmlFor="exampleInputPassword1" className="form-label" >Description</label> */}
            <input placeholder='Description' type="text" className="form-control" id="exampleInputPassword1" onChange={onChangeDescription}/>
          </div>
          <div className="mb-3">
            <input type="date" className="form-control" id="exampleInputPassword1" onChange={onChangeDate}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
          // <form onSubmit={addTodo}>
          //   <input type="text" onChange={onChange} />
          //   <button type="submit">Add new todo</button>
          // </form>
        )}
      </div>
      <hr />
      <h1 className="header">My todo list</h1>
      {loading ? (
        'Loading'
      ) : (
        <TodoList todos={todos} removeHandler={removeTodo} updateTodo={updateTodo} />
      )}
    </div>
  );

}

export default App;




