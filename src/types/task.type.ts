export interface TaskInformation {
  id: number;
  name: string;
  description: string;
  status: "COMPLETE" | "INCOMPLETE";
  assignedTo: number;
}
