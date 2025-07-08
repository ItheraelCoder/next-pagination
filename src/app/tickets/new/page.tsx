import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TicketForm } from "@/components/ticket-form";
import { Ticket } from "@/types/ticket";
import { getTicket } from "@/utils/ticket.api";

interface Params {
  params: Promise<{ id: string }>;
}

export default async function NewTicketPage({ params }: Params) {
  const id = (await params)?.id;

  console.log(id);

  let data: { ticket: Ticket } | undefined;

  if (id) {
    data = await getTicket(id);
  }

  console.log(data);

  return (
    <div className="max-w-[400px] w-full p-4 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>New Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <TicketForm ticket={data?.ticket} />
        </CardContent>
      </Card>
    </div>
  );
}
