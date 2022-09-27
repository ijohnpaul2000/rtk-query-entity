import React from "react";
import TodoForm from "./TodoForm/TodoForm";
import TodoHeader from "./TodoHeader/TodoHeader";
import TodoList from "./TodoList/TodoList";

const Todo = () => {
  return (
    <>
      <TodoHeader />
      <TodoForm />
      <TodoList />
    </>
  );
};

export default Todo;
