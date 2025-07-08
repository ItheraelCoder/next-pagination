import prisma from "@/libs/prisma";
import { ticketSchema } from "@/schemas/ticket.schema";
import { Ticket } from "@/types/ticket";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany();

    return NextResponse.json({ tickets }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: Ticket = await req.json();
    const { title, description, assignedTo, status } = ticketSchema.parse(body);

    await prisma.ticket.create({
      data: {
        title,
        description,
        assignedTo,
        status,
      },
    });

    return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
