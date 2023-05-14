import { TASK_STATUS } from "../../utils/constants"

const StateSelect = (attributes) => {
  return (
    <select
      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      { ...attributes }
    >
      {Object.values(TASK_STATUS)?.map(taskState => (
        <option key={taskState} value={taskState}>
          {taskState}
        </option>
      ))}
    </select>
  )
}

export default StateSelect;