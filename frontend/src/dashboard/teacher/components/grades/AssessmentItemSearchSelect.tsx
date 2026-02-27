import { useMemo, useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type Item = { id: string; title: string };

interface Props {
  value: string;
  onChange: (id: string) => void;
  items: Item[];
  placeholder?: string;
  className?: string;
}

export default function AssessmentItemSearchSelect({
  value,
  onChange,
  items,
  placeholder = "Select assessment",
  className,
}: Props) {
  const [open, setOpen] = useState(false);

  const selectedLabel = useMemo(() => {
    return items.find(i => i.id === value)?.title ?? "";
  }, [items, value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-between rounded-2xl bg-white/18 backdrop-blur-xl border border-white/25 hover:bg-white/22 text-[#3B240F] h-12 px-4",
            className
          )}
        >
          <span className={cn("truncate", selectedLabel ? "text-[#1E3A8A]" : "text-[#6B4F3A]")}>
            {selectedLabel || placeholder}
          </span>
          <ChevronsUpDown className="h-4 w-4 text-[#6B4F3A]" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[--radix-popover-trigger-width] p-2 bg-white/18 backdrop-blur-xl border border-white/25 rounded-2xl">
        <Command>
          <div className="flex items-center gap-2 px-2">
            <Search className="h-4 w-4 text-[#6B4F3A]" />
            <CommandInput placeholder="Search..." className="h-10" />
          </div>

          <CommandList className="max-h-64">
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup>
              {items.map(item => (
               <CommandItem
              key={item.id}
              value={item.title}
              onSelect={() => {
                onChange(item.id);
                setOpen(false);
              }}
              className="rounded-xl cursor-pointer hover:bg-white/20 data-[selected=true]:bg-white/25"
            >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="truncate">{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}