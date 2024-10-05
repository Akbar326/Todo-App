"use client";
import { useState, useCallback, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [theme, setTheme] = useState("light");

  // Add Todo item
  const addTodo = useCallback(() => {
    if (inputValue.trim() === "") return;
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), text: inputValue, completed: false },
    ]);
    setInputValue("");
  }, [inputValue]);

  // Toggle Todo completion
  const toggleTodo = useCallback((id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // Delete Todo item
  const deleteTodo = useCallback((id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  // Handle form submit (allows pressing "Enter" to add Todo)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo();
  };

  // Change theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Apply the theme to the document body
  useEffect(() => {
    document.body.className = theme === "light" ? "bg-gray-50" : "bg-gray-900";
  }, [theme]);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "light" ? "text-black" : "text-white"
      }`}
    >
      <header
        className={`py-4 shadow-md transition-colors duration-300 ${
          theme === "light" ? "bg-gray-200" : "bg-gray-800"
        }`}
      >
        <div className="max-w-4xl mx-auto flex justify-between items-center px-4">
          <div className="text-center flex-grow">
            <h1 className="text-2xl font-bold tracking-wide">Todo Manager</h1>
            <p className="text-sm font-light mt-1">
              Manage your tasks effectively
            </p>
          </div>

          {/* Theme toggle button in the header */}
          <button
            onClick={toggleTheme}
            className={`px-3 py-1 text-sm rounded-lg transition-transform transform hover:scale-105 focus:ring-2 focus:ring-indigo-400
            ${
              theme === "light"
                ? "bg-gray-300 text-black hover:bg-gray-400"
                : "bg-gray-600 text-white hover:bg-gray-500"
            }`}
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div
          className={`max-w-md w-full p-4 rounded-lg shadow-xl transition-colors duration-300 ${
            theme === "light" ? "bg-white" : "bg-gray-700"
          }`}
        >
          {/* Todo Form */}
          <form onSubmit={handleFormSubmit} className="mb-4">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={`flex-grow p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 transition-colors
                ${
                  theme === "light"
                    ? "border-gray-300 bg-white"
                    : "border-gray-500 bg-gray-600 text-white"
                }`}
                placeholder="Add a new task..."
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-indigo-500 text-white rounded-lg transition-transform transform hover:scale-105 focus:ring-2 focus:ring-indigo-400"
              >
                Add
              </button>
            </div>
          </form>

          {/* Todo List */}
          <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {todos.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No tasks added yet!
              </p>
            ) : (
              todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`flex items-center justify-between p-2 border rounded-lg shadow-sm transition-transform transform hover:scale-105
                  ${
                    theme === "light"
                      ? "bg-gray-100 border-gray-200"
                      : "bg-gray-600 border-gray-500"
                  }`}
                >
                  <span
                    className={`${
                      todo.completed ? "line-through underline" : ""
                    }`}
                  >
                    {todo.text}
                  </span>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-transform transform hover:scale-105"
                    >
                      {todo.completed ? "Undo" : "Done"}
                    </button>

                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </main>

      <footer
        className={`py-2 text-center transition-colors duration-300 ${
          theme === "light" ? "bg-gray-200" : "bg-gray-800"
        }`}
      >
        <p className="text-sm">Built with passion by Akbar Ali</p>
      </footer>
    </div>
  );
};

export default TodoList;
