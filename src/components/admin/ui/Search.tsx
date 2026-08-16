import { SearchIcon } from "@/components/icons";

export function AdminSearch({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-navy-400">
        <SearchIcon className="h-4.5 w-4.5" />
      </span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-2xl border border-navy-200 bg-white pr-4 pl-11 text-admin-body text-navy-900 placeholder:text-navy-400 focus:border-magenta-500 focus:outline-none focus:ring-2 focus:ring-magenta-500/20"
      />
    </div>
  );
}