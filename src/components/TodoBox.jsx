import React, { useState, useEffect } from "react";
import Item from "./Item";

const TodoBox = () => {
  const todoKey = "data";
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem(todoKey)) || []
  );

  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (!todos.length) return localStorage.removeItem(todoKey);
    localStorage.setItem(todoKey, JSON.stringify(todos));
  }, [todos]);

  const inputHandler = (e) => {
    e.preventDefault();
    setAlert(false);
    setInputValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputValue !== "".trim()) {
      setTodos((todo) => [
        {
          title: inputValue,
          id: Date.now(),
        },
        ...todo,
      ]);
      setInputValue("");
    } else {
      setAlert(true);
    }
  };

  const removeHandler = (e) => {
    if (todos.length === 1) {
      setAlert(false);
      setTodos([]);
    } else {
      setAlert(false);
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
              onChange={inputHandler}
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
        {alert && (
          <div
            onClick={(e) => {
              setAlert(false);
            }}
            style={{ width: "20%" }}
            className="alert alert-info mt-2"
            role="alert"
          >
            Input field error
          </div>
        )}
      </div>
      {todos.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          onRemove={removeHandler}
          task={item.title}
        />
      ))}
    </>
  );
};

export default TodoBox;
