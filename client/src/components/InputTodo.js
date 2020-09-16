import React, { useState } from "react";
import "./InputTodo.css";

function InputTodo() {
  const [description, setDescription] = useState("");

  function handleChange(e) {
    setDescription(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      var body = { description };
      const addQuery = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      window.location = "/"; // you need to refresh the browser so that the get request from
      //ListTodo component can use the useEffect to render the list

      setDescription("");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="inputTodo">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          value={description}
          required
          className="form-control form-control-sm input"
        />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default InputTodo;
