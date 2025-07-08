"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { Status, Ticket } from "@/types/ticket";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createTicket, updateTicket } from "@/utils/ticket.api";

interface Inputs {
  title: string;
  assignedTo: string;
  status: Status;
  description: string;
}

export const TicketForm = ({ ticket }: { ticket?: Ticket }) => {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<Inputs>({
    defaultValues: {
      title: ticket?.title,
      assignedTo: ticket?.assignedTo,
      status: ticket?.status,
      description: ticket?.description,
    },
    mode: "onChange",
  });

  const handleChange = (status: string) => {
    setValue("status", status as Status);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      let response: unknown;

      if (ticket?.id) {
        response = await updateTicket(ticket.id, {
          title: data.title,
          assignedTo: data.assignedTo,
          status: data.status,
          description: data.description,
        });
        toast.success("Ticket updated successfully!");
      } else {
        response = await createTicket({
          title: data.title,
          assignedTo: data.assignedTo,
          status: data.status,
          description: data.description,
        });
        toast.success("Ticket created successfully!");
      }
      console.log(response);

      router.push("/tickets");
    } catch (error: unknown) {
      throw new Error("Failed to create ticket", error as Error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <Label className="block mb-2" htmlFor="title">
          Title
        </Label>
        <Input {...register("title", { required: true })} id="title" />
      </div>
      <div>
        <Label className="block mb-2" htmlFor="assignedTo">
          Assigmed To
        </Label>
        <Input
          {...register("assignedTo", { required: true })}
          id="assignedTo"
        />
      </div>
      <div>
        <Label className="block mb-2" htmlFor="status">
          Status
        </Label>
        <Select defaultValue={ticket?.status} onValueChange={handleChange}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="OPEN">Open</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="DONE">Done</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="block mb-2" htmlFor="description">
          Description
        </Label>
        <Textarea {...register("description")} id="description" />
      </div>
      <div className="flex justify-between gap-4">
        <Button className="cursor-pointer" type="submit">
          {ticket?.id ? "Update Ticket" : "Create Ticket"}
        </Button>
        <Link href={"/tickets"}>
          <Button className="cursor-pointer" variant={"ghost"}>
            Back
          </Button>
        </Link>
      </div>
    </form>
  );
};
