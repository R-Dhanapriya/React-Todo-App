import React from "react";
import { Route, Switch } from "react-router-dom";
import List from "./Components/TodoList";
import TodoForm from "./Components/TodoForm";
import { ToastContainer, Bounce } from "react-toastify";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import "./App.css";

function App() {
  return (
    <React.StrictMode>
      <ToastContainer
        autoClose={2000}
        theme="colored"
        className="toaster-container"
        position="top-right"
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
      />
      <Switch>
        <Route path="/" exact>
          <List />
        </Route>
        <Route path="/todo/add" exact>
          <TodoForm />
        </Route>
        <Route path="/todo/update/:id" exact>
          <TodoForm />
        </Route>
      </Switch>
    </React.StrictMode>
  );
}

export default App;
