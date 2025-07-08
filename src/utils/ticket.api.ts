import { Ticket } from "@/types/ticket";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchTickets(): Promise<{ tickets: Ticket[] }> {
  try {
    const response = await fetch(`${URL}/tickets`, {
      cache: "no-store",
    });

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    throw new Error("Failed to fetch tickets", error as Error);
  }
}

export const createTicket = async (
  ticket: Omit<Ticket, "id">
): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${URL}/tickets`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    });

    if (!response.ok) {
      throw new Error("Failed to create ticket");
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    throw new Error("Failed to create ticket", error as Error);
  }
};

export const deleteTicket = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${URL}/tickets/${id}`, {
      cache: "no-store",
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete ticket");
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    throw new Error("Failed to delete ticket", error as Error);
  }
};

export const updateTicket = async (
  id: string,
  ticket: Omit<Ticket, "id">
): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${URL}/tickets/${id}`, {
      cache: "no-store",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    });

    if (!response.ok) {
      throw new Error("Failed to update ticket");
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    throw new Error("Failed to update ticket", error as Error);
  }
};

export const getTicket = async (id: string): Promise<{ ticket: Ticket }> => {
  try {
    const response = await fetch(`${URL}/tickets/${id}`, {
      cache: "no-store",
      method: "GET",
    });

    const data = await response.json();

    return data;
  } catch (error: unknown) {
    throw new Error("Failed to fetch ticket", error as Error);
  }
};
