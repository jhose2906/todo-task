import { Input } from "./ui/input";
import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative flex">
      <Search className="absolute left-3 top-1/2 transform  -translate-y-1/2 h-4 w-4 text-gray-400" />

      <Input
        type="text"
        placeholder="Search todos..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10  bg-white"
      />
    </div>
  );
};
