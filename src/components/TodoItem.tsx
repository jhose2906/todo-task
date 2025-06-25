import { format } from "date-fns";
import { Calendar, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type TodoItemProps = {
  todo: {
    id: string;
    text: string;
    completed: boolean;
    category: string;
    dueDate?: string;
  };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 border rounded-2xl bg-neutral-50 dark:bg-neutral-900">
      <div className="flex items-center space-x-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          className="h-5 w-5 rounded-full"
        />
        <div className={`flex-1 `}>
          <p
            className={`text-sm font-medium ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.text}
          </p>
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
              {todo.category}
            </span>
            {todo.dueDate && (
              <span className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {format(new Date(todo.dueDate), "MMM dd, yyyy")}
              </span>
            )}
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-500 hover:text-red-500"
        onClick={() => setIsDeleteOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <Dialog
        open={isDeleteOpen}
        onOpenChange={(val) => {
          if (!val) setIsDeleteOpen(val);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Todo</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{todo.text}"? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => onDelete(todo.id)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
