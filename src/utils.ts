export interface Task {
  label: string;
  description: string;
  start_date: string;
  end_date: string;
}

export const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

export class TaskFilters {
  label: string = "";
  description: string = "";
  startDateMin: string = "";
  startDateMax: string = "";
  endDateMin: string = "";
  endDateMax: string = "";
}
