# useHeadlessSelect - React Interview Ready

A production-ready, TypeScript-first React hook for building fully accessible, customizable select components without any UI library dependencies.

## Features

✨ **Headless Design** - Complete control over UI/UX without enforced styling  
♿ **Accessible** - Built with ARIA attributes for screen readers and keyboard navigation  
🎯 **Fully Typed** - Complete TypeScript support with detailed interfaces  
🔍 **Searchable** - Built-in filtering/search functionality  
⌨️ **Keyboard Support** - Arrow keys, Enter, Escape navigation  
📦 **Zero Dependencies** - No UI library required, only React  
🎨 **Framework Agnostic** - Use with Tailwind, CSS Modules, styled-components, etc.

## Installation

```bash
npm install
```

## Quick Start

```tsx
import { useHeadlessSelect } from "./useHeadlessSelect"

const MySelect = () => {
  const items = ["Option 1", "Option 2", "Option 3"]
  
  const {
    isOpen,
    selectedItem,
    filteredItems,
    getTriggerProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    highlightedIndex,
  } = useHeadlessSelect(items)

  return (
    <div>
      <button {...getTriggerProps()}>
        {selectedItem || "Select an option"}
      </button>

      {isOpen && (
        <div>
          <input {...getInputProps()} placeholder="Search..." />
          <ul {...getListboxProps()}>
            {filteredItems.map((item, index) => (
              <li
                key={item}
                {...getOptionProps(item, index)}
                style={{
                  background: highlightedIndex === index ? "#eee" : "white"
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
```

## API Reference

### `useHeadlessSelect<T>(items, options)`

#### Parameters

- **items** (`T[]`): Array of items to select from
- **options** (`UseHeadlessSelectOptions<T>`): Optional configuration
  - `itemToString?: (item: T) => string` - Custom string converter for items (default: `String(item)`)
  - `initialSelectedItem?: T | null` - Pre-select an item (default: `null`)

#### Returns (`HeadlessSelectResult<T>`)

**State:**
- `isOpen: boolean` - Whether the dropdown is open
- `selectedItem: T | null` - Currently selected item
- `highlightedIndex: number` - Index of highlighted item (-1 if none)
- `filteredItems: T[]` - Items matching current search

**Actions:**
- `open()` - Open the dropdown
- `close()` - Close the dropdown
- `toggle()` - Toggle open/closed state
- `setSearch(value: string)` - Update search filter
- `selectItem(item: T)` - Select an item and close

**Props Getters:**
- `getTriggerProps()` - Props for trigger button (onClick, aria-*)
- `getInputProps()` - Props for search input (value, onChange, onKeyDown)
- `getListboxProps()` - Props for list container
- `getOptionProps(item, index)` - Props for each list item

## Usage with Custom Types

```tsx
interface Product {
  id: string
  name: string
  price: number
}

const products: Product[] = [
  { id: "1", name: "Laptop", price: 999 },
  { id: "2", name: "Phone", price: 599 },
]

const {
  selectedItem,
  filteredItems,
  // ...
} = useHeadlessSelect(products, {
  itemToString: (product) => product.name,
  initialSelectedItem: products[0],
})
```

## Examples

The project includes a working example with country selection:

```bash
npm run dev
```

Visit `http://localhost:5173` to see the demo.

## Project Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm start        # Start dev server (alias)
```

## Technology Stack

- **React** 19.2.3
- **TypeScript** 5.9.3
- **Vite** 6.4.1

## Styling

This hook provides no styling - you have complete freedom to style components however you like:

```tsx
// With Tailwind CSS
<button className="px-4 py-2 bg-blue-500 text-white rounded">
  {selectedItem || "Select"}
</button>

// With CSS Modules
<button className={styles.trigger}>
  {selectedItem || "Select"}
</button>

// With inline styles
<button style={{ padding: "8px 16px", background: "blue" }}>
  {selectedItem || "Select"}
</button>
```

## Accessibility

The hook includes proper ARIA attributes:
- `aria-haspopup="listbox"` on trigger
- `aria-expanded` status on trigger
- `aria-autocomplete="list"` on search input

For full accessibility:
- Use semantic HTML (`<button>`, `<input>`, `<ul>`, `<li>`)
- Ensure sufficient color contrast
- Test with screen readers

## Browser Support

Modern browsers with ES2020+ support. Tested on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+