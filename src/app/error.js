"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-red-50">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-lg overflow-hidden p-8 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
                <span className="text-red-500 text-4xl">!</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Critical Error
            </h1>

            <p className="text-gray-600 mb-8">
              A critical error has occurred in the Pokédex. Please try
              refreshing the page.
            </p>

            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
  );
}
