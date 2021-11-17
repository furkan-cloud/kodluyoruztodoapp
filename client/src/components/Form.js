import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, addTodoAsync } from "../redux/todos/todosSlice";
import { nanoid } from "@reduxjs/toolkit";
import Loading from "./Loading";
import Error from "./Error";

const Form = () => {
  const [title, setTitle] = useState();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.todos.addNewTodoIsLoading);
  const error = useSelector((state) => state.todos.addNewTodoError);
  const handleSubmit = async (e) => {
    if (!title) return;

    e.preventDefault();
    await dispatch(addTodoAsync({ title }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center", paddingRight: 20 }}
    >
      <input
        disabled={isLoading}
        type="text"
        className="new-todo"
        placeholder="What needs to be done!"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {isLoading && <Loading />}
      {error && <Error message={error} />}
    </form>
  );
};

export default Form;
