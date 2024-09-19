import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };
  return (
    <div className="container">
      <Header />
      <Form onAddTodos={handleAddTodo} />
      <TodoList todos={todos} />
    </div>
  );
}

function Header() {
  return <h1>Todo App</h1>;
}

function Form({ onAddTodos }) {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTodo = {
      text,
      id: Date.now(),
      completed: false,
    };
    onAddTodos(newTodo);

    setText("");
  };
  return (
    <form onSubmit={handleSubmit} className="form-data">
      <label htmlFor="todo">What needs to be done ?</label>
      <input
        type="text"
        value={text}
        id="todo"
        name="text"
        autoComplete="off"
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="btn">
        Add
      </button>
    </form>
  );
}

function TodoList({ todos }) {
  const [sortBy, setSortBy] = useState("all");
  return (
    <div className="todo-list">
      <div className="action">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <ul>
        {todos.map((todo) => (
          <TodoItem todos={todo} />
        ))}
      </ul>
    </div>
  );
}

function TodoItem({ todos }) {
  return (
    <li>
      <input type="checkbox" />
      <span>{todos.text}</span>
      <button>❌</button>
    </li>
  );
}
