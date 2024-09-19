import { useState, useEffect } from "react";

export default function TodoList({
  todos,
  onDeleteTodo,
  onComplete,
  editId,
  setEditId,
  onEditTodo,
}) {
  const [sortBy, setSortBy] = useState("all");

  let sortedTodos;

  if (sortBy === "all") sortedTodos = todos;

  if (sortBy === "completed")
    sortedTodos = todos
      .slice()
      .sort((a, b) => Number(b.completed - a.completed));

  if (sortBy === "active")
    sortedTodos = todos.slice().sort((todo) => todo.completed);

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
        {sortedTodos.map((todo) => (
          <TodoTask
            todo={todo}
            onDeleteTodo={onDeleteTodo}
            onComplete={onComplete}
            isEditing={editId === todo.id}
            setEditId={setEditId}
            onEditTodo={onEditTodo}
            key={todo.id}
          />
        ))}
      </ul>
    </div>
  );
}

function TodoTask({
  todo,
  onDeleteTodo,
  onComplete,
  isEditing,
  setEditId,
  onEditTodo,
}) {
  const [newText, setNewText] = useState(todo.text);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEditTodo(todo.id, newText);
    setEditId(null);
  };

  useEffect(() => {
    if (isEditing) {
      setNewText(todo.text);
    }
  }, [isEditing, todo.text]);

  return (
    <div className="todo-task">
      <div>
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="edit-form">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="edit-input"
            />
            <button type="submit" className="save-btn">
              Save
            </button>
          </form>
        ) : (
          <>
            <input
              type="checkbox"
              defaultChecked={todo.completed}
              onClick={() => onComplete(todo.id)}
            />

            <span
              style={todo.completed ? { textDecoration: "line-through" } : {}}
            >
              {todo.text}
            </span>
          </>
        )}
      </div>
      <div className="task-buttons">
        {!isEditing && (
          <TodoBtn
            todo={todo}
            onDeleteTodo={onDeleteTodo}
            setEditId={setEditId}
          />
        )}
      </div>
    </div>
  );
}

function TodoBtn({ todo, onDeleteTodo, setEditId }) {
  return (
    <div className="edit-del-btn">
      <button onClick={() => setEditId(todo.id)}>edit</button>
      <button onClick={() => onDeleteTodo(todo.id)}>❌</button>
    </div>
  );
}
