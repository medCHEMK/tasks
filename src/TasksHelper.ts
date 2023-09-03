import { Task, TaskFilters } from "./utils";
export const fetchTasks = (): Promise<Task[]> => {
  return fetch(import.meta.env.VITE_API_URL).then((response) =>
    response.json()
  );
};

export const addTask = (task: Task) => {
  return fetch(import.meta.env.VITE_API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
};

export const validateTask = (label: string) => {
  const now: string = new Date().toISOString().split(".")[0] + "Z";
  return fetch(import.meta.env.VITE_API_URL + "/" + label, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ end_date: now }),
  });
};

export const deleteTask = (label: string) => {
  return fetch(import.meta.env.VITE_API_URL + "/" + label, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export const searchTasks = (tasks: Task[], filters: TaskFilters): Task[] => {
  let tasksTofilter = [...tasks];
  if (filters.label) {
    tasksTofilter = tasksTofilter.filter(
      (task) => task.label.indexOf(filters.label) !== -1
    );
  }
  if (filters.description) {
    tasksTofilter = tasksTofilter.filter(
      (task) => task.description.indexOf(filters.description) !== -1
    );
  }
  if (filters.startDateMin) {
    tasksTofilter = tasksTofilter.filter(
      (task) => task.start_date > filters.startDateMin
    );
  }
  if (filters.startDateMax) {
    tasksTofilter = tasksTofilter.filter(
      (task) => task.end_date < filters.endDateMax
    );
  }
  if (filters.endDateMin) {
    tasksTofilter = tasksTofilter.filter(
      (task) => task.start_date > filters.startDateMin
    );
  }
  if (filters.startDateMax) {
    tasksTofilter = tasksTofilter.filter(
      (task) => task.end_date < filters.endDateMax
    );
  }
  return tasksTofilter;
};
