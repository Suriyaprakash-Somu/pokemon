"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return pathname === path;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" legacyBehavior>
                <a className="flex items-center" onClick={closeMenu}>
                  <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                    alt="Pokédex"
                    className="h-8 w-8 mr-2"
                  />
                  <span className="font-bold text-xl text-red-500">
                    Pokédex
                  </span>
                </a>
              </Link>
            </div>

            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <Link href="/" legacyBehavior>
                <a
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActivePath("/")
                      ? "text-white bg-red-500"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Home
                </a>
              </Link>
              <Link href="/search" legacyBehavior>
                <a
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActivePath("/search")
                      ? "text-white bg-red-500"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Search
                </a>
              </Link>
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen && (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
              {isMenuOpen && (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" legacyBehavior>
              <a
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActivePath("/")
                    ? "text-white bg-red-500"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Home
              </a>
            </Link>
            <Link href="/search" legacyBehavior>
              <a
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActivePath("/search")
                    ? "text-white bg-red-500"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Search
              </a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
