import { useState } from "react";
import TodoList from "./components/TodoList.js";
import Header from "./components/Header.js";
import Form from "./components/Form.js";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  const handleComplete = (id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEditTodo = (id, newText) => {
    const editTodo = todos.map((todo) =>
      editId === id ? { ...todo, newText } : todo
    );

    setTodos(editTodo);
    setEditId(null);
  };

  return (
    <div className="container">
      <Header />
      <Form onAddTodos={handleAddTodo} />
      <TodoList
        todos={todos}
        onDeleteTodo={handleDeleteTodo}
        onComplete={handleComplete}
        editId={editId}
        setEditId={setEditId}
        onEditTodo={handleEditTodo}
      />
    </div>
  );
}
