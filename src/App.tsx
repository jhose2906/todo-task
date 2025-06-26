import { Plus } from "lucide-react";
import { useState } from "react";
import { AddTodoForm } from "./components/AddTodoForm";
import { CategoryFilter } from "./components/CategoryFilter";
import { SearchBar } from "./components/SearchBar";
import { ThemeToggle } from "./components/ThemeToggle";
import { TodoList } from "./components/TodoList";
import { Button } from "./components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "./components/ui/dialog";
import { useTheme } from "./context/ThemeContext";
import { useTodos } from "./hooks/useTodos";

export const App = () => {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    categories,
    selectedCategory,
    setSelectedCategory,
    activeTodoCount,
  } = useTodos();

  const { isDarkMode } = useTheme();

  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "dark bg-neutral-900" : "bg-gray-200"
      }`}
    >
      <div className="container mx-auto px-4 pt-8 max-w-2xl min-h-screen ">
        <div className="flex justify-between items-center mb-8 ">
          <h1 className="text-3xl font-bold">
            Todo App {isDarkMode ? "✒" : "📝"}
          </h1>
          <ThemeToggle />
        </div>

        <div className="space-y-6 ">
          <div className="flex   justify-between flex-col sm:flex-row gap-2">
            <div className="flex items-center space-x-4 ">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>

            <Button
              onClick={() => {
                setIsAddOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Todo
            </Button>
          </div>
          <Dialog
            open={isAddOpen}
            onOpenChange={(val) => {
              if (val === false) setIsAddOpen(false);
            }}
          >
            <DialogContent>
              <DialogTitle>Add Todo</DialogTitle>
              <AddTodoForm
                onSubmit={addTodo}
                categories={categories}
                onClose={() => setIsAddOpen(false)}
              />
            </DialogContent>
          </Dialog>

          <TodoList
            todos={todos}
            filter={filter}
            activeTodoCount={activeTodoCount}
            onFilterChange={setFilter}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onClearCompleted={clearCompleted}
          />
        </div>

        <footer className=" text-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className=" gap-2 flex items-center justify-center">
            <p>Jhose Rubaraj | </p>
            <a
              href="https://github.com/jhose2906/todo-task"
              className="underline"
              target="_blank"
            >
              Source Code
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
