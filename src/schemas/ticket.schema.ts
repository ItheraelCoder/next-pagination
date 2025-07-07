import { z } from "zod";

export const ticketSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  assignedTo: z.string().optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "DONE", "REJECTED"]),
});
