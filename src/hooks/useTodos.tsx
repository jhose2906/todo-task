import { useState, useEffect, useCallback, useMemo } from "react";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  dueDate?: string;
};

export type FilterType = "all" | "active" | "completed";

export const useTodos = () => {
  // State
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  //Life cycle
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //Methods | Function
  // add item
  const addTodo = useCallback(
    (text: string, category: string, dueDate?: string) => {
      setTodos((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text,
          completed: false,
          category,
          dueDate,
        },
      ]);
    },
    []
  );

  //active -> complete | complete -> active
  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  const categories = useMemo(() => ["all", "Personal", "Work"], []);

  const filteredTodos = useMemo(() => {
    let result = todos;

    // filter by status (all | active | complete)
    if (filter === "active") {
      result = result.filter((todo) => !todo.completed);
    } else if (filter === "completed") {
      result = result.filter((todo) => todo.completed);
    }

    //filter by category (all | personal | work)
    if (selectedCategory !== "all") {
      result = result.filter((todo) => todo.category === selectedCategory);
    }

    // filter by query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (todo) =>
          todo.text.toLowerCase().includes(query) ||
          todo.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [todos, filter, selectedCategory, searchQuery]);

  const activeTodoCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos]
  );

  return {
    todos: filteredTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setFilter,
    filter,
    searchQuery,
    setSearchQuery,
    categories,
    selectedCategory,
    setSelectedCategory,
    activeTodoCount,
  };
};
