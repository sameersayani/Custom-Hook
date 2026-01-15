import { useState, useCallback, useMemo } from "react"

export interface UseHeadlessSelectOptions<T> {
  itemToString?: (item: T) => string
  initialSelectedItem?: T | null
}

export interface HeadlessSelectResult<T> {
  isOpen: boolean
  selectedItem: T | null
  highlightedIndex: number
  filteredItems: T[]

  open: () => void
  close: () => void
  toggle: () => void
  setSearch: (value: string) => void
  selectItem: (item: T) => void

  getTriggerProps: () => any
  getInputProps: () => any
  getListboxProps: () => any
  getOptionProps: (item: T, index: number) => any
}

export function useHeadlessSelect<T>(
  items: T[],
  options: UseHeadlessSelectOptions<T> = {}
): HeadlessSelectResult<T> {
  const {
    itemToString = (item) => String(item),
    initialSelectedItem = null,
  } = options

  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedItem, setSelectedItem] = useState<T | null>(initialSelectedItem)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const filteredItems = useMemo(() => {
  return items.filter((item) =>
    itemToString(item)
      .toLowerCase()
      .includes(search.toLowerCase())
  )
}, [items, search, itemToString])

  const open = () => setIsOpen(true)
  const close = () => {
    setIsOpen(false)
    setHighlightedIndex(-1)
  }
  const toggle = () => setIsOpen((o) => !o)

  const selectItem = useCallback((item: T) => {
  setSelectedItem(item)
  close()
}, [])

  const onKeyDown = (e: React.KeyboardEvent) => {
  if (!isOpen) return

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault()
      setHighlightedIndex((i) =>
        Math.min(i + 1, filteredItems.length - 1)
      )
      break

    case "ArrowUp":
      e.preventDefault()
      setHighlightedIndex((i) => Math.max(i - 1, 0))
      break

    case "Enter":
      if (highlightedIndex >= 0) {
        selectItem(filteredItems[highlightedIndex])
      }
      break

    case "Escape":
      close()
      break
  }
}

  const getTriggerProps = () => ({
  onClick: toggle,
  "aria-haspopup": "listbox",
  "aria-expanded": isOpen,
})

  const getInputProps = () => ({
  value: search,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value),
  onKeyDown,
  "aria-autocomplete": "list",
})

  const getListboxProps = () => ({
  role: "listbox",
})

  const getOptionProps = (item: T, index: number) => ({
  role: "option",
  key: index,
  "aria-selected": selectedItem === item,
  onMouseEnter: () => setHighlightedIndex(index),
  onClick: () => selectItem(item),
})
  return {
    isOpen,
    selectedItem,
    highlightedIndex,
    filteredItems,

    open,
    close,
    toggle,
    setSearch,
    selectItem,

    getTriggerProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
  }
}
