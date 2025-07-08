import { Button } from "@/components/ui/button";
import { LucidePlusCircle } from "lucide-react";
import TicketCard from "@/components/ticket-card";
import { fetchTickets } from "@/utils/ticket.api";
import Link from "next/link";

export default async function TicketsPage() {
  // const tickets: Ticket[] = [
  //   {
  //     id: "1",
  //     title: "Fix login issue",
  //     description: "Users are unable to log in with their credentials.",
  //     assignedTo: "John Doe",
  //     status: Status.OPEN,
  //   },
  //   {
  //     id: "2",
  //     title: "Update user profile page",
  //     description: "Add new fields to the user profile page.",
  //     assignedTo: "Jane Smith",
  //     status: Status.IN_PROGRESS,
  //   },
  //   {
  //     id: "3",
  //     title: "Implement password reset feature",
  //     description: "Allow users to reset their passwords via email.",
  //     assignedTo: "Alice Johnson",
  //     status: Status.DONE,
  //   },
  //   {
  //     id: "4",
  //     title: "Improve site performance",
  //     description: "Optimize images and scripts for faster loading times.",
  //     assignedTo: "Bob Brown",
  //     status: Status.REJECTED,
  //   },
  // ];

  const { tickets } = await fetchTickets();

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <header className="flex items-center justify-between mb-8">
        <h1 className="font-semibold text-3xl">Tickets</h1>
        <Button className="cursor-pointer">
          <Link href="/tickets/new">Add new ticket</Link>
          <LucidePlusCircle />
        </Button>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
