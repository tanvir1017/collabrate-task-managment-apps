import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="app container">
      <h2>collaborate task managment apps</h2>
      <Link href="/auth/log-in">login</Link>
      <Link href="/auth/sign-up">Sign Up</Link>
      <Button>Check</Button>
    </main>
  );
}
