"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Status, Ticket } from "@/types/ticket";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { LucideTrash } from "lucide-react";
import { deleteTicket } from "@/utils/ticket.api";
import { revalidate } from "@/utils/actions";
import Link from "next/link";

const TICKET_STATUS_VARIANTS = {
  OPEN: "default",
  IN_PROGRESS: "secondary",
  DONE: "success",
  REJECTED: "destructive",
} as const;

const getStatusVariant = (
  status: Status
): "default" | "secondary" | "destructive" | "outline" | "success" => {
  return TICKET_STATUS_VARIANTS[status];
};

const getStatusName = (status: Status): string => {
  switch (status) {
    case Status.OPEN:
      return "Open";
    case Status.IN_PROGRESS:
      return "In Progress";
    case Status.DONE:
      return "Done";
    case Status.REJECTED:
      return "Rejected";
    default:
      return "Unknown";
  }
};

export default function TicketCard({ ticket }: { ticket: Ticket }) {
  const handleDelete = async () => {
    try {
      if (!ticket.id) return;
      await deleteTicket(ticket.id);
      await revalidate("/tickets");
      console.log("Ticket deleted successfully");
    } catch (error: unknown) {
      console.error("Failed to delete ticket:", error);
      return;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between">
          {ticket.title}
          <Button onClick={handleDelete} size={"sm"} variant={"ghost"}>
            <LucideTrash />
          </Button>
        </CardTitle>

        <CardDescription>
          {ticket.description || "No description"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-semibold">
          Assigned to: {ticket.assignedTo || "Unassigned"}
        </p>
        <p>Status: </p>{" "}
        <Badge
          className="cursor-pointer"
          variant={getStatusVariant(ticket.status)}
        >
          {getStatusName(ticket.status)}
        </Badge>
      </CardContent>
      <CardFooter>
        <CardAction>
          <Link href={`/tickets/${ticket.id}/edit`}>
            <Button className="cursor-pointer">View Details</Button>
          </Link>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
