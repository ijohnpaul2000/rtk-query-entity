import Todo from "./components/Todo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import PrivateRoute from "./Layouts/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Todo />} />
        </Route>

        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
