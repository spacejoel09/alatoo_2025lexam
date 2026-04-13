'use client'
import { useState, useEffect } from "react";
import cn from "clsx";
import { useTodoStore } from "@/app/state/todostore";

export default function Home() {
  const [input, setInput] = useState('');
  const { todos, fetchTodos, addTodo, deleteTodo, toggleTodo, error, clearError } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async () => {
    if (input.trim()) {
      await addTodo(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAddTodo();
  };
  return (
    <div className="animated-bg min-h-screen py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-6">
        
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Todo List
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
            <div className="flex items-start">
              <div className="shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
              <button
                onClick={clearError}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-2 mb-8">
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Добавьте новую таску" 
            className={cn("flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-700")}
          />
          <button 
            onClick={handleAddTodo}
            className={cn("bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors shadow-md active:scale-95")}
          >
            Добавить
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
                  <span className={cn("text-gray-800", todo.completed && "line-through text-gray-400 opacity-70 transition-opacity")}>
                   
                    {todo.title || todo.title} 
                  </span>
                </div>
                <button 
                  onClick={() => deleteTodo(todo.id)}
                  className={cn("text-red-400 hover:text-red-600 font-medium px-2 py-1 transition-colors opacity-0 group-hover:opacity-100")}
                >
                  Удалить
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