import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodoAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    // const res = await fetch("http://localhost:7000/todos");
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return res.data;
    // return await res.json();
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsyncThunk",
  async (data) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`,
      data
    );
    return res.data;
  }
);

export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodoAsync",
  async ({ id, data }) => {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`,
      data
    );
    return res.data;
  }
);

export const removeTodoAsync = createAsyncThunk(
  "todos/removeTodoAsync",
  async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`
    );
    return id;
  }
);
