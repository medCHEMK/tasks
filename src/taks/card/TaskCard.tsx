import { Task, dateOptions } from "../../utils";
import { validateTask, deleteTask } from "../../TasksHelper";

export default function TaskCard({
  task,
  getTasks,
}: {
  task: Task;
  getTasks: () => void;
}) {
  const removeTask = (label: string) => {
    deleteTask(label).then(() => {
      getTasks();
    });
  };

  const finishTask = (label: string) => {
    validateTask(label).then(() => {
      getTasks();
    });
  };

  return (
    <div className="taskCard">
      <div> label : {task.label} </div>
      <div> description : {task.description}</div>
      <div>
        Date de Début :
        {new Date(task.start_date).toLocaleString("fr-FR", dateOptions)}
      </div>
      <div>
        Date de Fin :
        {task.end_date &&
          new Date(task.start_date).toLocaleString("fr-FR", dateOptions)}
      </div>
      <div className="actions">
        {!task.end_date && (
          <button className="addBtn" onClick={() => finishTask(task.label)}>
            valider
          </button>
        )}
        <button
          className="deleteBtn"
          onClick={() => {
            removeTask(task.label);
          }}
        >
          supprimer
        </button>
      </div>
    </div>
  );
}
