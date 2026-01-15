import { useHeadlessSelect } from "../useHeadlessSelect"

type Country = {
  code: string
  name: string
  flag: string
}

const countries: Country[] = [
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
]

export function CountrySelect() {
  const {
    isOpen,
    selectedItem,
    filteredItems,
    getTriggerProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    highlightedIndex,
  } = useHeadlessSelect(countries, {
    itemToString: (c) => c.name,
  })

  return (
    <div style={{ width: 260 }}>
      <button {...getTriggerProps()}>
        {selectedItem ? selectedItem.name : "Select country"}
      </button>

      {isOpen && (
        <div style={{ border: "1px solid #ccc", marginTop: 4 }}>
          <input
            {...getInputProps()}
            placeholder="Search country..."
            style={{ width: "100%" }}
          />

          <ul {...getListboxProps()} style={{ listStyle: "none", padding: 0 }}>
            {filteredItems.map((country, index) => (
              <li
                key={country.code}
                {...getOptionProps(country, index)}
                style={{
                  padding: "6px 8px",
                  cursor: "pointer",
                  background: highlightedIndex === index ? "#eee" : "transparent",
                }}
              >
                {country.flag} {country.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
