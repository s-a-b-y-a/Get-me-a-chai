import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const DropdownContent = ({ session }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="dropdown-container relative">
      <div
        className={`dropdown-content z-50 absolute left-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 ${
          isDropdownOpen ? "block" : "hidden"
        }`}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          <li>
            <Link href="/dashboard">
              <span className="block px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link href={`/${session?.user?.name}`}>
              <span className="block px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Your Page
              </span>
            </Link>
          </li>
          <li>
            <button
              onClick={handleSignOut}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownContent;
