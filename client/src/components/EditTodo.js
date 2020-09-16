import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import { Button, Modal } from "react-bootstrap";
import "./EditTodo.css";

function EditTodo({ todo }) {
  const [description, setDescription] = useState(todo.description);
  const [preDescription, setPreDescription] = useState(description);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const timeStamp = () => {
    let time = new Date().toLocaleString();
    return time;
  };

  const handlCloseNotSave = () => {
    if (preDescription !== description) {
      setPreDescription(description);
    }
    setShow(false);
  };

  const handleModalChange = (e) => {
    setPreDescription(e.target.value);
  };

  const handleEdit = () => {
    setShow(true);
  };

  const handlCloseSave = async (e) => {
    e.preventDefault();
    var body = { description: preDescription }; // i can write like {description}, but the name has to match from the server side column name
    try {
      const putQuery = await fetch(`/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: {
          // its very important to add the content type
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error.message);
    }

    setShow(false);
    window.location = "/";
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const deleteQuery = await fetch(`/todos/${todo.todo_id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error.message);
    }

    window.location = "/";
  };
  return (
    <div className="editTodo m-5">
      <h3>{description}</h3>
      {/* <h4>{todo.todo_id}</h4> */}
      <h5>{timeStamp()}</h5>
      <button className="btn" onClick={handleEdit}>
        Edit
      </button>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
      {/* using bootstrap modal to handle edit below */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit the text below</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            type="text"
            value={preDescription}
            onChange={handleModalChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlCloseNotSave}>
            Close
          </Button>
          <Button variant="primary" onClick={handlCloseSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditTodo;
