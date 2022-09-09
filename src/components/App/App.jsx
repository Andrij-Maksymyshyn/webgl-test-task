import React, { useState, useEffect } from "react";
import TodoForm from "../TodoForm";
import TodoList from "../TodoList";
import "./App.css";
import { Toaster, toast } from 'react-hot-toast';


function  App() {
    const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem('todos')) ?? [] );
   


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  const addTodo = todo => {
    const normalaizedTodo = todo.text.toLowerCase();
    if (!todo.text) return;
    
    const findTodoName = newNameData =>
      todos.find(({ text }) => text.toLowerCase() === newNameData);
    
    findTodoName(normalaizedTodo)
      ? toast.error(`${todo.text} is already in Todo List. Please, enter another todo`)
      : setTodos([todo, ...todos]);    
  };



  const removeTodo = id => {
    const removeArray = todos.filter((todo) => todo.id !== id);
    setTodos(removeArray);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text) return;
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const completeTodo = id => {
    let solvedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(solvedTodos);
  };

  return (
    <div className="container">
      <Toaster position="top-right" />
    <section className="main-container">
      <h1 className="todolist-header">TODO List</h1>
      <TodoForm onSubmit={addTodo} />
      <TodoList
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </section>
    </div>
  );
};

export default App;