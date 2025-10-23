"use client";
import { adminNavItem, navItem } from "@/lib/data";
import { useRouter } from "next/navigation";
import React from "react";

interface MobileMenuProps {
  visible?: boolean;
  isAdmin: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible, isAdmin }) => {
  const router = useRouter();
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      {isAdmin ? (
        <div className="flex flex-col gap-4">
          {adminNavItem.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(item.link)}
              className="px-3 text-center text-white hover:underline"
            >
              {item.name}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {navItem.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(item.link)}
              className="px-3 text-center text-white hover:underline"
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
