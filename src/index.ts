import express from "express";
import categoriesRouter from "./categories";
import { query } from "./db";

const todos = [
  {
    todoId: 1,
    text: "fetch loaded data from vue frontend app ",
    done: true,
  },
  {
    todoId: 2,
    text: "display those todos inside my app",
    done: true,
  },
  {
    todoId: 3,
    text: "develop methods to update my json db of todos",
    done: false,
  },
  {
    todoId: 4,
    text: "watch mutation of mesTodos to automatically update todos",
    done: false,
  },
];
/*
todos.map((todo) => {
  con.query(
    "INSERT INTO todos (id, text, done) VALUES (?, ?, ?)",
    [todo.todoId, todo.text, todo.done],
    (err: any, results: any) => {
      if (err) throw err;
      console.log(`inserted todo ${todo.todoId}`);
    }
  )
})
*/
// on créé une instance d'une application Express
const app = express();

// on précise à l'application qu'elle doit parser le body des requêtes en JSON (utilisation d'un middleware)
app.use(express.json());
app.use("/categories", categoriesRouter);

// on peut utiliser app.get, app.post, app.put, app.delete, etc.. ()

// on définit une route GET /todos, et la fonction qui s'exécute lorsque le serveur reçoit une requête qui matche
app.get("/todos", async (request, result) => {
  const todosDB = await query("SELECT * FROM todos");
  console.table(todosDB);
  console.log(`route "/todos" called`);
  return result.status(200).json(todosDB);
});

// une autre route pour récupérer 1 TODO
app.get(
  "/todos/:id",
  async (request: express.Request, result: express.Response) => {
    console.log(`route "/todos/:id" called`);
    console.log(`params of the request : ${JSON.stringify(request.params)}`);
    const todoDB = await query(
      `SELECT * FROM todos WHERE id = ${request.params.id}`
    );
    console.log(todoDB);
    return result.status(200).json(todoDB || null);
  }
);

app.put("/todos/:id", async (req: express.Request, res: express.Response) => {
  const id = Number(req.params.id);
  console.log(`put "/todos/:id" called`, req.body, id);
  const text = req.body.text.replaceAll("'", "\\'");
  const todo = await query(
    `UPDATE todos SET text = '${text}', done = ${Boolean(
      req.body.done
    )} WHERE id = ${id}`
  );
  return res.status(200).json({ status: "OK" });
});

app.post("/todos", async (req: express.Request, res: express.Response) => {
  const newTodo = req.body;
  const lastTodoId = await query("SELECT MAX(id) as maxId FROM todos");
  newTodo.id = lastTodoId[0].maxId + 1;
  const text = newTodo.text.replaceAll("'", "\\'");

  await query(
    `INSERT INTO todos (text, done, id_categorie) VALUES ('${String(
      newTodo.text
    )}',${Boolean(newTodo.done)}, ${Number(newTodo.category)})`
  );
  console.log(newTodo);
  return res.status(200).json(newTodo);
});

app.delete(
  "/todos/:id",
  async (req: express.Request, res: express.Response) => {
    const id = Number(req.params.id);
    console.log("Route Delete called on id :", id);
    const response = await query(`DELETE FROM todos WHERE id = ${id}`);
    //const index = todos.findIndex((todo) => todo.todoId === id);
    if (!response) {
      return res.status(404).json(null);
    } else {
      return res.status(200).json({ ok: true });
    }
  }
);

app.listen(8080, () => console.log("server started, listening on port 8080"));
