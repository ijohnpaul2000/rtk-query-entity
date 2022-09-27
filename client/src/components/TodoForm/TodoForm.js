import React, { useState } from "react";
import "./TodoForm.css";

import { useSelector } from "react-redux";
import {
  selectAllUsers,
  useGetUsersQuery,
} from "../../Redux/Services/userService";
import {
  selectTodoById,
  selectTodoId,
  useAddTodoMutation,
} from "../../Redux/Services/todoService";
import { selectCurrentUser } from "../../Redux/Features/auth/loginSlice";

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState("");
  const [newTodoUser, setNewTodoUser] = useState("");

  const { isLoading, isFetching } = useGetUsersQuery();

  const [addTodo] = useAddTodoMutation();

  const orderedTodos = useSelector(selectTodoById);
  const users = useSelector(selectAllUsers);
  const currentAuthUser = useSelector(selectCurrentUser);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTodo.length > 0) {
      addTodo({
        title: newTodo,
        completed: false,
        user: currentAuthUser.user,
      });
    }

    setNewTodo("");
  };

  const userOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.name}>
        {user.name}
      </option>
    );
  });
  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <label htmlFor="newTodo">New Todo</label>
      <input
        type="text"
        name="newTodo"
        id="newTodo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      {/* <label htmlFor="newTodoUser">User</label>
      <select
        name="newTodoUser"
        id="newTodoUser"
        value={newTodoUser}
        onChange={(e) => setNewTodoUser(e.target.value)}
      >
        <option value="">Select a user</option>
        {userOptions}
      </select> */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default TodoForm;
