import Link from "next/link";
import { UserDropDown } from "../shadcn-ui/dropdown-menu";
import { ToggleToChangeTheme } from "../theme/toggler-to-change-theme";

const NavigationBar = () => {
  return (
    <nav className="py-2.5 border">
      <div className="container flex items-center justify-between">
        <ul className="">
          <Link href="/">
            <li className="uppercase">TASK Management</li>
          </Link>
        </ul>
        <ul className="flex items-center justify-between space-x-4">
          <UserDropDown />
          <li>
            <ToggleToChangeTheme />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
