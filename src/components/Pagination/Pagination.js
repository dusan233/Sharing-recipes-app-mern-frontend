import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IconContext } from "react-icons";

const Pagination = props => {
  const paginationNumerics = [];
  const totalPages = Math.ceil(props.recipesCount / 9);
  const currentPaginPage = parseInt(props.currentPage);

  if (totalPages <= 5 && currentPaginPage <= 5) {
    for (let i = 0; i < totalPages; i++) {
      paginationNumerics.push(i + 1);
    }
  } else if (totalPages > 5 && currentPaginPage <= 3) {
    for (let i = 0; i < 5; i++) {
      paginationNumerics.push(i + 1);
    }
  } else if (totalPages > 5 && currentPaginPage > totalPages - 2) {
    for (let i = totalPages - 4; i <= totalPages; i++) {
      paginationNumerics.push(i);
    }
  } else if (totalPages > 5 && currentPaginPage > 3) {
    let prevPage = parseInt(currentPaginPage) - 1;
    let beforePrevPage = prevPage - 1;
    let nextPage = parseInt(currentPaginPage) + 1;
    let afterNextPage = nextPage + 1;
    paginationNumerics.push(
      beforePrevPage,
      prevPage,
      currentPaginPage,
      nextPage,
      afterNextPage
    );
  }

  return (
    <div className="pagination_wrap">
      <div
        onClick={e => {
          if (currentPaginPage <= 1) {
            return;
          } else {
            props.prevPage();
          }
        }}
        className={
          currentPaginPage <= 1
            ? "pagination_numerico_arrow_disabled"
            : "pagination_numerico_arrow"
        }
      >
        <IconContext.Provider value={{ color: "black" }}>
          <FaAngleLeft />
        </IconContext.Provider>
      </div>
      {totalPages > 5 && currentPaginPage > 3 ? (
        <div className="pagination_more_less">
          <div
            onClick={e => {
              props.onChangePage(e);
            }}
            page="1"
            className="pagination_numerico"
          >
            1
          </div>
          {totalPages > 5 && currentPaginPage > 4 ? (
            <span className="pagination_dots">...</span>
          ) : null}
        </div>
      ) : null}
      {paginationNumerics.map((num, i) => {
        return (
          <div
            key={i}
            page={i}
            onClick={e => {
              props.onChangePage(e);
            }}
            className={
              num === currentPaginPage
                ? "pagination_numerico_active"
                : "pagination_numerico"
            }
          >
            {num}
          </div>
        );
      })}
      {totalPages > 5 && currentPaginPage < totalPages - 2 ? (
        <div className="pagination_more_less">
          {totalPages > 5 && currentPaginPage < totalPages - 3 ? (
            <span className="pagination_dots">...</span>
          ) : null}

          <div
            onClick={e => {
              props.onChangePage(e);
            }}
            page={totalPages}
            className="pagination_numerico"
          >
            {totalPages}
          </div>
        </div>
      ) : null}
      <div
        onClick={e => {
          if (currentPaginPage >= totalPages) {
            return;
          } else {
            props.nextPage();
          }
        }}
        className={
          currentPaginPage >= totalPages
            ? "pagination_numerico_arrow_disabled"
            : "pagination_numerico_arrow"
        }
      >
        <IconContext.Provider value={{ color: "black" }}>
          <FaAngleRight />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Pagination;
