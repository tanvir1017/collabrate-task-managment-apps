import Link from "next/link";
import { Button } from "../ui/button";

const MainHome = () => {
  return (
    <div className="grid h-screen place-content-center ">
      <div className="bg-cyan-200 p-3 rounded-md text-blue-600">
        <h2 className="text-3xl ">
          Welcome to Collaborate Task Management app
        </h2>

        <Link href="/dashboard" className="text-center block mt-5">
          <Button variant="outline"> Go to dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default MainHome;
