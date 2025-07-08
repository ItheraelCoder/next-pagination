import { PrismaClientKnownRequestError } from "@/generated/prisma/runtime/library";
import prisma from "@/libs/prisma";
import { ticketSchema } from "@/schemas/ticket.schema";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_: unknown, { params }: Params) {
  try {
    const { id } = await params;

    const ticket = await prisma.ticket.findUnique({
      where: { id },
    });

    return NextResponse.json({ ticket }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, description, assignedTo, status } = ticketSchema.parse(body);
    const ticket = await prisma.ticket.update({
      where: { id },
      data: {
        title,
        description,
        assignedTo,
        status,
      },
    });

    return NextResponse.json({ ticket }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(_: unknown, { params }: Params) {
  try {
    const { id } = await params;

    await prisma.ticket.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Ticket deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    // console.log(error);

    if (error instanceof PrismaClientKnownRequestError) {
      console.log("Error code:", error.code);

      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Ticket not found" },
          { status: 404 }
        );
      }
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
