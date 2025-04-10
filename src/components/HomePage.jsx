"use client";
import { useState } from "react";
import PokemonCard from "./PokemonCard";
import classes from "./HomePage.module.css";

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalItems = 151;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.from(
    { length: itemsPerPage },
    (_, i) => indexOfFirstItem + i + 1
  ).filter((id) => id <= totalItems);

  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Pokédex</h1>
      <div className={classes.grid}>
        {currentItems.map((id) => (
          <div key={id} className={classes.cardWrapper}>
            <PokemonCard id={id} />
          </div>
        ))}
      </div>
      <div className={classes.pagination}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={classes.pageButton}
        >
          Previous
        </button>
        <span className={classes.pageInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={classes.pageButton}
        >
          Next
        </button>
      </div>
    </div>
  );
}
