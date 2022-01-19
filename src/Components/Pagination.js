import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil( totalPosts / postsPerPage ); i++) {
    pageNumbers.push(i-1);

    // console.log("pagination " , pageNumbers );
  }

  return (
    <nav>
      <ul className="pagination">

        {pageNumbers.map((number) => (

          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="!#">

              {number}

            </a>

          </li>

        ))}

      </ul>
    </nav>
  );
};

export default Pagination;
