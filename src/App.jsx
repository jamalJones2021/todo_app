import "./App.css";
import { useAppContext } from "./GlobalContext/GlobalState";

function App() {
  const {
    todo,
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
    editTodo,
    editTodoID,
    setEditTodoID,
    handleTodo,
    setTodo,
    clearCompleted,
  } = useAppContext();

  return (
    <main className="flex flex-col min-h-screen min-w-screen justify-center items-center">
      <div className="flex flex-col justify-between h-full space-y-5">
        <h1 className="text-3xl">Todo App</h1>
        <div className="space-x-2">
          <input
            type="text"
            value={todo}
            onChange={handleTodo}
            placeholder="Add a todo"
            className="border-b-1 outline-0 text-xs italic"
          />
          <button
            className=" text-xs bg-blue-500 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-blue-600"
            onClick={editTodoID === null ? addTodo : editTodo}
          >
            {editTodoID === null ? "📋 Add Todo" : "📝 Edit Todo "}
          </button>
        </div>
        <div>
          {todos.length > 0 ? (
            <ul className="space-y-2">
              {todos.map((todo) => (
                <>
                  <li
                    key={todo.id}
                    className={`flex justify-between items-center border-b-1 py-2  ${
                      todo.isCompleted ? "line-through" : ""
                    }`}
                  >
                    <span
                      onClick={() => {
                        toggleTodo(todo.id), clearCompleted(todo.id);
                      }}
                      className="cursor-pointer text-xs"
                    >
                      {todo.title}
                    </span>

                    <div className="space-x-2">
                      <button
                        className="text-xs bg-green-500 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-green-600"
                        onClick={() => {
                          setEditTodoID(todo.id);
                          setTodo(todo.title);
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="text-xs bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-red-600"
                        onClick={() => removeTodo(todo.id)}
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  </li>
                  <small className="text-[8px]">
                    {todo.dateCompleted &&
                      `Date Completed: ${todo.dateCompleted}`}
                  </small>
                </>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No todos available</p>
          )}
        </div>
      </div>
      <footer className="text-[8px] text-gray-500 mt-60">
        <p>Made with ❤️ by Jamal Jones</p>
        <p>© {new Date().getFullYear()}</p>
        <p>All rights reserved</p>
      </footer>
    </main>
  );
}

export default App;
