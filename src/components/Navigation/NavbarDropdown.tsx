import { MdKeyboardArrowDown } from "react-icons/md";
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
  getCurrentUser: () => Promise<void>;
}

export default function ProfileDropdown({
  userId,
  handleLogout,
  getCurrentUser,
}: ProfileDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MdKeyboardArrowDown className="text-white text-3xl border-none" />
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
