import { create } from "zustand";
import { TodoState, Todo } from "@/app/state/full_page.data";

const API_URL = "http://127.0.0.1:8000/todos/";

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  error: null,

  fetchTodos: async () => {
    set({ error: null });
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        set({ error: "Грусть" });
        return;
      }

      const data = await response.json();
      set({ todos: data, error: null });
    } catch {
      set({ error: "Тотальная смерть" });
    }
  },

  addTodo: async (title) => {
    set({ error: null });
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        set({ error: errorData.detail || "Задача не добавлена" });
        return;
      }

      const newTodo = await response.json();
      set((state) => ({ todos: [...state.todos, newTodo], error: null }));
    } catch (error) {
      console.error("Failed to add:", error);
      set({ error: "Ошибка при заход на сервер грустняшка" });
    }
  },

  toggleTodo: async (id: Todo['id']) => {
    try {
      const response = await fetch(`${API_URL}${id}`, {
        method: "PATCH",
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? updatedTodo : todo
          ),
        }));
      }
    } catch (error) {
      console.error("Failed to toggle:", error);
    }
  },

  deleteTodo: async (id: Todo['id']) => {
    try {
      const response = await fetch(`${API_URL}${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      }
    } catch (error) {
      console.error("Не смог добавить:", error);
    }
  },

  clearError: () => set({ error: null }),
}));