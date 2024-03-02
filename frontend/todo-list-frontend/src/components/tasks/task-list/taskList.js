import TaskContext from "../../../tasks-context/taskContext";
import { useContext } from "react";

const TaskList = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <div>
      <h1>Task List</h1>
      <div>
        {tasks.map((task) => (
          <ul key={task._id}>
            <li key={task._id}>{task.title}</li>
            <li>{task.description}</li>
            <li>{task.completed.toString()}</li>
            <li>{task.startDate}</li>
            <li>{task.endDate}</li>
            <li>{task.priority}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};
export default TaskList;
