const Select = ({ items, ...attributes }) => {
  return (
    <select
      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      { ...attributes }
    >
      {items?.map(item => (
        <option key={item.key} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  )
}

export default Select;