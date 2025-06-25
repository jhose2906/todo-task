import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryFilterProps) => {
  return (
    <Select value={selectedCategory} onValueChange={onSelect}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Filter by category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category === "all" ? "All Categories" : category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
