import React from "react";

const Pagination = ({ currentPage, cardsPerPage, totalCards, paginate }) => {
  const pageNumbers = [];
  const style = { color: "red" };

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="right_pagination_outer">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <p
              style={number === currentPage ? style : null}
              onClick={() => paginate(number)}
            >
              {number}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
