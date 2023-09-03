import { Task, TaskFilters } from "../../utils";
import { searchTasks } from "../../TasksHelper";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";

export default function SearchTask({
  setFilters,
  setFilteredTasks,
  tasks,
  filters,
}: {
  tasks: Task[];
  setFilteredTasks: (tasks: Task[]) => void;
  setFilters: (filters: TaskFilters) => void;
  filters: TaskFilters;
}) {
  const search = () => {
    const filteredTasks = searchTasks(tasks, filters);
    setFilteredTasks(filteredTasks);
  };

  const reset = () => {
    setFilters(new TaskFilters());
    setFilteredTasks(tasks);
  };

  return (
    <div className="searchContainer">
      <div>Rechercher une tache</div>
      <hr />
      <div>
        label :{" "}
        <input
          value={filters.label}
          type="text"
          onChange={(e) => {
            setFilters({ ...filters, label: e.target.value });
          }}
        />
      </div>
      <div>
        Description :{" "}
        <input
          value={filters.description}
          onChange={(e) => {
            setFilters({ ...filters, label: e.target.value });
          }}
        />
      </div>
      <div>
        Date de Début entre :{" "}
        <DateTimePicker
          value={filters.startDateMin}
          disableClock={true}
          onChange={(value) => {
            if (value) {
              setFilters({
                ...filters,
                startDateMin: value.toISOString().split(".")[0] + "Z",
              });
            } else {
              setFilters({ ...filters, startDateMin: "" });
            }
          }}
        />{" "}
        et :
        <DateTimePicker
          value={filters.startDateMax}
          disableClock={true}
          onChange={(value) => {
            if (value) {
              setFilters({
                ...filters,
                startDateMax: value.toISOString().split(".")[0] + "Z",
              });
            } else {
              setFilters({ ...filters, startDateMax: "" });
            }
          }}
        />
      </div>
      <div>
        Date de fin entre :{" "}
        <DateTimePicker
          disableClock={true}
          value={filters.endDateMin}
          onChange={(value) => {
            if (value) {
              setFilters({
                ...filters,
                endDateMin: value.toISOString().split(".")[0] + "Z",
              });
            } else {
              setFilters({
                ...filters,
                endDateMin: "",
              });
            }
          }}
        />{" "}
        et :
        <DateTimePicker
          disableClock={true}
          value={filters.endDateMax}
          onChange={(value) => {
            if (value) {
              setFilters({
                ...filters,
                endDateMax: value.toISOString().split(".")[0] + "Z",
              });
            } else {
              setFilters({
                ...filters,
                endDateMax: "",
              });
            }
          }}
        />
      </div>
      <div className="actions">
        <button className="searchBtn" onClick={() => reset()}>
          réinitialiser
        </button>
        <button className="searchBtn" onClick={() => search()}>
          recherer
        </button>
      </div>
    </div>
  );
}
