import React from "react";
import { useSelector } from "react-redux";
import {
  selectAllTodos,
  useGetTodosQuery,
} from "../../Redux/Services/todoService";

import SingleTodo from "../SingleTodo/SingleTodo";
import "./TodoList.css";
const TodoList = () => {
  const { isFetching, isLoading, isError, isSuccess, error, data } =
    useGetTodosQuery();

  const todos = useSelector(selectAllTodos);

  const singleTodos = todos.map((todo) => {
    return <SingleTodo todoId={todo.id} key={todo.id} />;
  });
  return (
    <main className="todo-list">
      <h2>Current Todo List</h2>
      {isFetching && <p>Loading...</p>}
      {singleTodos}
    </main>
  );
};

export default TodoList;
