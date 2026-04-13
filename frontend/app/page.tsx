'use client'
import { useState } from "react";
import { Todo } from "./full_page.data";
import cn from "clsx";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    if (!input.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInput('');
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAddTodo();
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6">
        
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Todo List
        </h1>

        <div className="flex gap-2 mb-8">
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Добавьте новую таску..." 
            className={cn("flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-700")}
          />
          <button 
            onClick={handleAddTodo}
            className={cn("bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors shadow-md active:scale-95")}
          >
            Add
          </button>
        </div>

        <div className="space-y-3">
          {todos.length > 0 ? (
            todos.map(todo => (
              <div 
                key={todo.id} 
                className={cn("flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow group")}
              >
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className={cn("w-5 h-5 cursor-pointer accent-blue-600")}
                  />
                  <span className={cn("text-gray-800 ", todo.completed && "line-through text-gray-400 opacity-70 transition-opacity")
                  }>
                    {todo.text}
                  </span>
                </div>
                <button 
                  onClick={() => deleteTodo(todo.id)}
                  className={cn("text-red-400 hover:text-red-600 font-medium px-2 py-1 transition-colors opacity-0 group-hover:opacity-100")}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-400 italic">
              Список пуст
            </div>
          )}
        </div>

        {todos.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500 flex justify-between">
            <span>Всего: {todos.length}</span>
            <span>Выполнено: {todos.filter(t => t.completed).length}</span>
          </div>
        )}
      </div>
    </div>
  );
}