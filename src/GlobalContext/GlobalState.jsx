import {
  createContext,
  useState,
  useReducer,
  useContext,
  useEffect,
} from "react";

const initialState = {
  todos: [],
};

const AppContext = createContext(null);

export const useAppContext = () => {
  return useContext(AppContext);
};

const appReducer = ({ todos }, { type, payload }) => {
  switch (type) {
    case "ADD_TODO":
      return {
        todos: [
          ...todos,
          {
            id: Date.now(),
            title: payload,
            isCompleted: false,
            dateCompleted: null,
          },
        ],
      };
    case "REMOVE_TODO":
      return {
        todos: todos.filter((todo) => todo.id !== payload.id),
      };
    case "TOGGLE_TODO":
      return {
        todos: todos.map((todo) =>
          todo.id === payload.id
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        ),
      };
    case "EDIT_TODO":
      return {
        todos: todos.map((todo) =>
          todo.id === payload.id ? { ...todo, title: payload.title } : todo
        ),
      };
    case "CLEAR_COMPLETED":
      return {
        todos: todos.map((todo) =>
          todo.id === payload.id
            ? {
                ...todo,
                dateCompleted: todo.isCompleted
                  ? new Date().toLocaleDateString()
                  : null,
              }
            : todo
        ),
      };
    default:
      return todos;
  }
};

const actionTypes = {
  ADD_TODO: "ADD_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  EDIT_TODO: "EDIT_TODO",
  CLEAR_COMPLETED: "CLEAR_COMPLETED",
};

export function GlobalProvider({ children }) {
  const [{ todos }, dispatch] = useReducer(appReducer, initialState);
  const [todo, setTodo] = useState("");
  const [editTodoID, setEditTodoID] = useState(null);
  const handleTodo = (e) => {
    setTodo(e.target.value);
  };
  const addTodo = () => {
    if (todo !== "") dispatch({ type: actionTypes.ADD_TODO, payload: todo });
    setTodo("");
  };
  const removeTodo = (id) => {
    dispatch({ type: actionTypes.REMOVE_TODO, payload: { id } });
  };
  const toggleTodo = (id) => {
    dispatch({ type: actionTypes.TOGGLE_TODO, payload: { id } });
  };
  const editTodo = () => {
    if (todo !== "") {
      dispatch({
        type: actionTypes.EDIT_TODO,
        payload: { id: editTodoID, title: todo },
      });
      setEditTodoID(null);
      setTodo("");
    }
  };
  const clearCompleted = (id) => {
    dispatch({ type: actionTypes.CLEAR_COMPLETED, payload: { id } });
  };
  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
