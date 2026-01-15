import { useHeadlessSelect } from "./useHeadlessSelect";
const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
const options = {
  itemToString: (item: string) => item,
  initialSelectedItem: null,
};
const {
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
} = useHeadlessSelect(items, options)
