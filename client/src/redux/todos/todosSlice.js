import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  getTodoAsync,
  addTodoAsync,
  removeTodoAsync,
  toggleTodoAsync,
} from "./services";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    // items: [
    //   {
    //     id: "1",
    //     title: "learn react",
    //     completed: true,
    //   },
    //   {
    //     id: "2",
    //     title: "learn vue",
    //     completed: false,
    //   },
    // ],
    items: [],
    isLoading: false,
    error: null,
    activeFilter: localStorage.getItem("activeFilter"),
    // addNewTodoIsLoading: false,
    // addNewTodoError: null,
    addNewTodo: {
      isLoading: false,
      error: false,
    },
  },
  extraReducers: {
    // get todos
    [getTodoAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodoAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodoAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    // add todos
    [addTodoAsync.pending]: (state, action) => {
      state.addNewTodo.isLoading = true;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.addNewTodo.isLoading = false;
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.addNewTodo.isLoading = false;
      state.addNewTodo.error = action.error.message;
    },
    // toggle todo
    [toggleTodoAsync.fulfilled]: (state, action) => {
      console.log("payload", action.payload);
      const { id, completed } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items[index].completed = completed;
    },
    // remove todo
    [removeTodoAsync.fulfilled]: (state, action) => {
      console.log("actiopns", action.payload);
      const id = action.payload;
      const filtered = state.items.filter((item) => item.id !== id);
      state.items = filtered;
      // 2. metod
      // const index = state.items.findIndex((item) => item.id === id);
      // state.items.splice(index, 1);
    },
  },
  reducers: {
    // addTodo: {
    //   reducer: (state, action) => {
    //     state.items.push(action.payload);
    //   },
    //   prepare: ({ title }) => {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         completed: false,
    //         title: title,
    //       },
    //     };
    //   },
    // },

    // toggle: (state, action) => {
    //   const { id } = action.payload;
    //   const item = state.items.find((item) => item.id === id);
    //   item.completed = !item.completed;
    // },
    // destroy: (state, action) => {
    //   const id = action.payload;
    //   const filtered = state.items.filter((item) => item.id !== id);
    //   state.items = filtered;
    // },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.completed === false);
      state.items = filtered;
    },
  },
});

export const selectTodos = (state) => state.todos.items;

export const selectFilteredTodos = (state) => {
  if (state?.todos.activeFilter === "all") {
    return state.todos.items;
  }

  return state?.todos.items.filter((todo) =>
    state.todos.activeFilter === "active"
      ? todo.completed === false
      : todo.completed === true
  );
};

export const selectActiveFilter = (state) => state.todos.activeFilter;

export const { changeActiveFilter, clearCompleted, toggle, destroy, addTodo } =
  todosSlice.actions;
export default todosSlice.reducer;
