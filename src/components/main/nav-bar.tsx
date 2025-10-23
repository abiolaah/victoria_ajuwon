"use client";

import React, { useCallback, useEffect, useState } from "react";

import Image from "next/image";

import NavbarItem from "@/components/main/nav-bar-item";
import MobileMenu from "@/components/main/mobile-menu";
import AccountMenu from "@/components/main/account-menu";

import { navItem } from "@/lib/data";
import { ChevronDown } from "lucide-react";
import { useCurrentProfile } from "@/lib/store/useProfileStore";

const TOP_OFFSET = 66;

const Navbar = () => {
  //   const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  // Get the current profile with useProfile hooks
  const currentProfile = useCurrentProfile();

  // Handle scroll for background check
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? `bg-zinc-900/90` : `bg-transparent`
        }`}
      >
        <Image
          className="h-16 lg:h-24 w-auto"
          src="/image/logo.svg"
          width={800}
          height={800}
          alt="Logo"
        />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          {navItem.map((item) => (
            <NavbarItem key={item.id} label={item.name} link={item.link} />
          ))}
        </div>

        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <ChevronDown
            className={`text-white transition ${
              showMobileMenu ? `rotate-180` : `rotate-0`
            }`}
          />
          <MobileMenu visible={showMobileMenu} isAdmin={false} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-1 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <Image
                src={
                  currentProfile?.avatar ||
                  "https://res.cloudinary.com/dixwarqdb/image/upload/v1744696100/default-blue_oqkthi.png"
                }
                width={30}
                height={30}
                alt={`Avatar for ${currentProfile?.name}`}
                onError={(e) => {
                  // Fallback to default avatar if the image fails to load
                  (e.target as HTMLImageElement).src =
                    "https://res.cloudinary.com/dixwarqdb/image/upload/v1744696100/default-blue_oqkthi.png";
                }}
              />
            </div>
            <ChevronDown
              className={`text-white transition ${
                showAccountMenu ? `rotate-180` : `rotate-0`
              }`}
              size={25}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
