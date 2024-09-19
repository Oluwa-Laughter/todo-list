import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

export default function Form({ onAddTodos }) {
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
        <AddIcon />
        <span>Add</span>
      </button>
    </form>
  );
}
