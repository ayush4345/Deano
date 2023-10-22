"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/utils/lib"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { setXmtpAnnotator } from "@/utils/vendorSlice"
import { useDispatch, useSelector } from "react-redux"

export function Combobox({ contactList }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [array, setArray] = React.useState([])

  function getUniqueAnnotators(data) {
    const uniqueAnnotators = new Set();

    data.forEach(item => {
      uniqueAnnotators.add(item.annotator_id);
    });

    return Array.from(uniqueAnnotators);
  }

  const dispatch = useDispatch()

  React.useEffect(() => {
    function newArray() {
      const result = getUniqueAnnotators(contactList)
      setArray(result)
    }

    if (contactList.length > 0) {
      newArray()
    }
  }, [])

  console.log(array.filter((framework) => framework == value))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? value.slice(0, 15) + "..."
            : "Select annotator..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandEmpty>No annotators found.</CommandEmpty>
          <CommandGroup>
            {array.map((framework) => (
              <CommandItem
                key={framework}
                value={framework}
                onSelect={(currentValue) => {
                  console.log(currentValue)
                  setValue(currentValue === value ? "" : currentValue)
                  dispatch(setXmtpAnnotator(currentValue))
                  setOpen(false)
                }}
              >
                {framework}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === framework ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
