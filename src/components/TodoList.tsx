import { TodoItem } from "./TodoItem";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

type TodoListProps = {
  todos: {
    id: string;
    text: string;
    completed: boolean;
    category: string;
    dueDate?: string;
  }[];
  filter: "all" | "active" | "completed";
  activeTodoCount: number;
  onFilterChange: (filter: "all" | "active" | "completed") => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onClearCompleted: () => void;
};

export const TodoList = ({
  todos,
  filter,
  activeTodoCount,
  onFilterChange,
  onToggle,
  onDelete,
  onClearCompleted,
}: TodoListProps) => {
  return (
    <div className="space-y-4 ">
      <Tabs
        value={filter}
        onValueChange={(value) =>
          onFilterChange(value as "all" | "active" | "completed")
        }
      >
        <TabsList className="grid grid-cols-3 w-full  dark:bg-neutral-800">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="border rounded-lg overflow-hidden dark:border-gray-700 max-h-[calc(100vh-300px)] min-h-[calc(100vh-300px)] bg-white dark:bg-neutral-800 p-4 flex flex-col gap-2 overflow-y-auto">
        {todos.length === 0 ? (
          <div className="p-8  text-center h-full text-gray-500 dark:text-gray-400">
            No todos found
          </div>
        ) : (
          todos.map((todo, i) => (
            <TodoItem
              key={todo.id + i}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>{activeTodoCount} items left</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearCompleted}
          disabled={activeTodoCount === todos.length}
        >
          Clear completed
        </Button>
      </div>
    </div>
  );
};
