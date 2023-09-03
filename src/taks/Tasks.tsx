import { useEffect, useState } from "react";
import { Task, TaskFilters } from "../utils";
import TaskCard from "./card/TaskCard";
import { fetchTasks, addTask, searchTasks } from "../TasksHelper";
import SearchTask from "./search/SearchTask";
import CreateTask from "./add/CreateTask";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilters>(new TaskFilters());

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    fetchTasks()
      .then((data) => {
        setTasks(data);
        const filteredTasks = searchTasks(data, filters);
        setFilteredTasks(filteredTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createTask = (task: Task) => {
    addTask(task).then(() => {
      getTasks();
    });
  };
  return (
    <>
      <div className="tasksHeader">
        <SearchTask
          tasks={tasks}
          setFilteredTasks={setFilteredTasks}
          setFilters={setFilters}
          filters={filters}
        />
        <CreateTask createTask={createTask} />
      </div>

      <div className="taskContainer">
        {filteredTasks.map((task) => (
          <TaskCard task={task} key={task.label} getTasks={getTasks} />
        ))}
      </div>
    </>
  );
}
