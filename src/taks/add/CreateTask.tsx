import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import { Task } from "../../utils";

export default function CreateTask({
  createTask,
}: {
  createTask: (task: Task) => void;
}) {
  const [label, setLabel] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setstartDate] = useState<string>("");

  const newTask = () => {
    createTask({ label, description, start_date: startDate } as Task);
  };

  return (
    <div className="addContainer">
      <div>Ajouter une tache</div>
      <hr />
      <div>
        label:{" "}
        <input
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
          }}
        />
      </div>
      <div>
        Description:{" "}
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div>
        Date de début :{" "}
        <DateTimePicker
          value={startDate}
          disableClock={true}
          onChange={(value) => {
            if (value) {
              setstartDate(value.toISOString().split(".")[0] + "Z");
            } else {
              setstartDate("");
            }
          }}
        />
      </div>
      <div className="actions">
        <button
          className="addBtn"
          onClick={() => {
            newTask();
          }}
        >
          ajouter{" "}
        </button>
      </div>
    </div>
  );
}
