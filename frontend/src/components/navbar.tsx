"use client";
import Link from "next/link";
import React, { useState } from "react";

interface NavBarProps {
  signIn: boolean;
}

export default function NavBar({ signIn }: NavBarProps) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-green-500 text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto px-4 md:flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center justify-between md:w-auto w-full">
          <Link href="/" className="py-5 px-2 text-white flex-1 font-bold">
            <i> a Board</i>
          </Link>

          {/* Mobile menu icon */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="mobile-menu-button"
              onClick={toggleMobileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation menu */}
        <div
          className={`${
            isMobileMenuOpen
              ? "fixed right-0 top-0 h-full w-[70%] bg-green-500 text-white flex flex-col z-40"
              : "hidden"
          } md:flex md:flex-row justify-start md:space-x-1 pb-3 md:pb-0 navigation-menu`}
        >
          <button
            type="button"
            className="self-start p-4 md:hidden"
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h13M12 5l7 7-7 7" />
            </svg>
          </button>
          <Link href="/" className="py-2 px-3 block text-left">
            Home
          </Link>
          {signIn && (
            <Link href="/post/our-blog" className="py-2 px-3">
              Our Blog
            </Link>
          )}
          {!signIn && (
            <Link
              href="/signin"
              className="mt-3 ml-3 w-24 md:hidden bg-green-400 text-white px-2 py-1 text-sm rounded font-bold hover:bg-green-700 text-center"
            >
              Sign In
            </Link>
          )}
        </div>
        {!signIn && (
          <Link
            href="/signin"
            className="ml-auto hidden md:block bg-green-400 text-white px-2 py-1 text-sm rounded font-bold hover:bg-green-700 text-center"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
