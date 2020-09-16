import React from "react";
import "./App.css";
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";

function App() {
  return (
    <div className="app mt-5">
      <h1>To do list with Postgres Integration</h1>
      <InputTodo />
      <ListTodo />
    </div>
  );
}

export default App;
