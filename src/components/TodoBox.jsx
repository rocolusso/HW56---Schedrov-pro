import React, { useState, useEffect } from "react";
import Item from "./Item";

const TodoBox = (props) => {
  const todoKey = "data";
  const [inputValue, setInputValue] = useState(props.value);
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem(todoKey)) || []
  );

  useEffect(() => {
    setInputValue(props.value);
  }, [props.value]);

  useEffect(() => {
    if (!todos.length) return localStorage.removeItem(todoKey);
    localStorage.setItem(todoKey, JSON.stringify(todos));
  }, [todos]);

  const submitHandler = (e) => {
    e.preventDefault();
    setTodos((todo) => [
      {
        title: inputValue,
        id: Date.now(),
      },
      ...todo
    ]);
    setInputValue("");
  };

  const removeHandler = (e) => {
    if (todos.length === 1) {
      setTodos([]);
    } else {
      setTodos(
        todos.filter(
          (item) =>
            +item.id !==
            +e.target.parentElement.nextElementSibling.getAttribute("data-id")
        )
      );
    }
  };

  return (
    <>
      <div className="mb-3">
        <form onSubmit={submitHandler} className="d-flex">
          <div className="me-3">
            <input
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              value={inputValue}
              required=""
              className="form-control"
              placeholder="Enter text..."
            />
          </div>
          <button type="submit" className="btn btn-primary">
            add
          </button>
        </form>
      </div>
      {todos.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          onClick={removeHandler}
          text={item.title}
        />
      ))}
    </>
  );
};

export default TodoBox;
