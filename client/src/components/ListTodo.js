import React, { useState, useEffect } from "react";
import EditTodo from "./EditTodo";

function ListTodo() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    listTodo();
  }, []);

  const listTodo = async () => {
    try {
      const listQuery = await fetch("/todos");
      const jsonData = await listQuery.json();
      //   console.log(jsonData);
      setTodos(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {todos.map((todo, index) => {
        return <EditTodo todo={todo} key={index} />;
      })}
    </div>
  );
}

export default ListTodo;
