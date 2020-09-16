const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

// app.get("/", (req, res) => {
//   console.log("been to todos1");
//   res.send(200);
// });

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      `INSERT INTO todo (description) VALUES('${description}') RETURNING *`
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(404);
  }
});

// post a record with a specific id and description
// app.post("/todos/:id", async (req, res) => {
//   try {
//     const { description } = req.body;
//     const { id } = req.params;
//     const newTodo = await pool.query(
//       "INSERT INTO todo (todo_id , description) VALUES($1, $2)",
//       [id, description]
//     );
//     res.send("inserted");
//   } catch (err) {
//     console.error(err.message);
//     res.sendStatus(404);
//   }
// });

// get all the todo items

app.get("/todos", async (req, res) => {
  console.log("been to todos1");

  try {
    const allTodo = await pool.query(`SELECT * FROM todo`);
    res.json(allTodo.rows);
  } catch (error) {
    console.error(error.message);
    console.log("bad");
    // res.sendStatus(404);
  }
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  const param = req.params.id;
  try {
    const todo = await pool.query(
      `SELECT * FROM todo where todo_id = ${param}`
    );
    res.json(todo.rows);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(400);
  }
});

// update a specific todo
app.put("/todos/:id", async (req, res) => {
  try {
    var id = req.params.id;
    var description = req.body.description;
    var todo = await pool.query(
      "UPDATE todo SET description = $1 where todo_id = $2",
      [description, id]
    );
    res.json(todo);
    // res.send("updated");

    // res.sendStatus(200);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(400);
  }
});

//delete a specific todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTodo = await pool.query("DELETE FROM todo where todo_id = $1", [
      id,
    ]);
    res.send("deleted data with id " + id);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(400);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
  // res.sendFile(path.join(__dirname, "client/public/index.html"));
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
