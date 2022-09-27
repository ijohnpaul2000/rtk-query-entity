import React from "react";
import "./TodoHeader.css";

import { FaBars } from "react-icons/fa";

const TodoHeader = () => {
  return (
    <header className="todo-header">
      <h1>Todo List</h1>
      <FaBars className="todo-header__menu" size={20} />
    </header>
  );
};

export default TodoHeader;
