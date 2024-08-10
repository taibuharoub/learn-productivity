import { ModeToggle } from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ModeToggle />
      <h1>Dark Mode</h1>
      <p className="text-yellow-600 dark:text-green-600">Hello world</p>
    </main>
  );
}
