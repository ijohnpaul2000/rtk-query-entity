import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Todo from "./components/Todo";
import { TOGGLE_SIDEBAR } from "./Redux/Features/appSlice";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  selectTodoId,
} from "./Redux/Features/todoSlice.js";
import { selectAllUsers, useGetUsersQuery } from "./Redux/Features/userSlice";
import { FaBars } from "react-icons/fa";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./Layouts/PrivateRoute";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [newTodoUser, setNewTodoUser] = useState("");

  const { isLoading, isSuccess, isError, error } = useGetTodosQuery();

  const {
    isLoading: userIsLoading,
    isSuccess: userIsSuccess,
    isError: userIsError,
    error: userError,
  } = useGetUsersQuery();

  const [addTodo] = useAddTodoMutation();

  const orderedTodos = useSelector(selectTodoId);
  const orderedUser = useSelector(selectAllUsers);

  const dispatch = useDispatch();

  let content;
  let user = orderedUser.map((user) => (
    <option value={user.name} key={user.id}>
      {user.name}
    </option>
  ));

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    if (orderedTodos.length === 0) {
      content = <p>No todos</p>;
    } else {
      content = orderedTodos.map((todoId) => (
        <Todo todoId={todoId} key={todoId} />
      ));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTodo.length > 0 && newTodoUser.length > 0) {
      addTodo({
        id: orderedTodos.length + 1,
        title: newTodo,
        completed: false,
        user: newTodoUser,
      });
    } else {
      alert("Please fill out the form");
    }

    setNewTodo("");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
