import React, { useState, useEffect, useRef } from "react";
import "./TodoForm.css";

const TodoForm = (props) => {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const inputRef = useRef(null);
  const date = new Date().toLocaleString();
      

  useEffect(() => {
      inputRef.current.focus();
      });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dt = props.edit ? props.edit.id : new Date().getTime();

    props.onSubmit({
      id: dt,
      text: input,
      time: date
    });
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="todo-input-form">
        {props.edit ? (
          <>
            <input
              placeholder="Update todo"
              value={input}
              onChange={handleChange}
              name="text"
              ref={inputRef}
              className="todo-input-edit"
              maxLength={300}
              autoComplete="off"
            />
          </>
        ) : (
          <>
            <input
              placeholder="Add a todo"
              value={input}
              onChange={handleChange}
              name="text"
              ref={inputRef}
              className="todo-input"              
              maxLength={300}
              autoComplete="off"
              />
              <button type="submit">Add todo</button>             
          </>
        )}
      </div>
    </form>
  );
};

export default TodoForm;