import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface ProfileDropdownProps {
  userId: string;
  handleLogout: () => void;
  up: boolean;
}

export default function ProfileDropdown({
  userId,
  handleLogout,
  up
}: ProfileDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {up ? (
          <MdKeyboardArrowDown className="text-white text-3xl border-none" />
        ) : (
          <MdKeyboardArrowUp className="text-white text-3xl border-none" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            href={`/profile/${userId}`}
            className="cursor-pointer hover:scale-105 font-semibold transition-all"
          >
            <p className="text-white">Profile</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="text-white hover:scale-105 font-semibold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
