import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  text: z
    .string()
    .min(1, "Todo text is required")
    .max(100, "Todo text must be less than 100 characters"),
  category: z.string().min(1, "Category is required"),
  dueDate: z.date().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type AddTodoFormProps = {
  onSubmit: (text: string, category: string, dueDate?: string) => void;
  categories: string[];
  onClose: () => void; // Add this prop
};

export const AddTodoForm = ({
  onSubmit,
  categories,
  onClose,
}: AddTodoFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      category: categories.length > 1 ? categories[1] : "",
      dueDate: undefined,
    },
  });

  const selectedDate = watch("dueDate");

  const processSubmit = (data: FormValues) => {
    onSubmit(
      data.text,
      data.category,
      data.dueDate ? data.dueDate.toISOString() : undefined
    );
    reset();
    onClose(); // Close the dialog after submission
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleSubmit(processSubmit)();
    }
  };

  return (
    <form onSubmit={handleSubmit(processSubmit)} className="space-y-4">
      <div className="mt-4">
        <Label htmlFor="text" className="mb-3">
          Todo Text
        </Label>
        <Input
          id="text"
          {...register("text")}
          placeholder="What needs to be done?"
          className={errors.text ? "border-red-500" : ""}
          onKeyDown={handleKeyDown}
        />
        {errors.text && (
          <p className="text-sm text-red-500">{errors.text.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="w-full ">
          <Label htmlFor="category" className="mb-3">
            Category
          </Label>
          <Select
            onValueChange={(value) => setValue("category", value)}
            defaultValue={categories.length > 1 ? categories[1] : ""}
          >
            <SelectTrigger
              className={cn("w-full", errors.category ? "border-red-500" : "")}
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {["Personal", "Work"].map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
              {/* {categories
                .filter((c) => c !== "all")
                .map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))} */}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>

        <div>
          <Label className="mb-3">Due Date (optional)</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => setValue("dueDate", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Add Todo</Button>
      </div>
    </form>
  );
};
