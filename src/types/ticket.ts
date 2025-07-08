export enum Status {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  REJECTED = "REJECTED",
}

export interface Ticket {
  id?: string;
  title: string;
  description?: string;
  assignedTo?: string;
  status: Status;
}
