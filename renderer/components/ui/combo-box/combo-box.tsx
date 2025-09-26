"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "../../../lib/utils"
import { Button } from "../../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover"

interface El {
    value: string
    label: string 
}

interface ComboBoxProps {
    listaEls: El[]
    placeholder: string
    inCaseNotFound: string
    initialValue: string 
    onSetValue: (newValue: string) => void 
}

export function Combobox({ listaEls, placeholder, inCaseNotFound, onSetValue, initialValue } : ComboBoxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(initialValue)

  const newSetValue = (newValue: string) => {
    setValue(newValue)
    onSetValue(newValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? listaEls.find((el) => el.value === value)?.label
            : placeholder}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{inCaseNotFound}</CommandEmpty>
            <CommandGroup>
              {listaEls.map((el) => (
                <CommandItem
                  key={el.value}
                  value={el.value}
                  onSelect={(currentValue) => {
                    newSetValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === el.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span>{el.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}