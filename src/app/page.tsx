import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Link href={"/tickets"} className="flex items-center gap-2">
          <Button className="cursor-pointer" variant={"link"}>
            Go To Tickets
          </Button>
        </Link>
      </main>
    </div>
  );
}
