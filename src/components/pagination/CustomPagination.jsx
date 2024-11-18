import React, { useState, useEffect } from "react";
import { Button, Row } from "react-bootstrap";

export default function CustomPagination({
  dataLength,
  limit,
  currentPage,
  setCurrentPage,
  searchValues,
}) {
  const [maxVisiblePages, setMaxVisiblePages] = useState(5); // Maximum number of visible page numbers
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Calculate total pages
    const totalPagesCount = Math.ceil(dataLength / limit);
    setTotalPages(totalPagesCount);
  }, [dataLength, limit]);

  const endResultNumber = currentPage * limit;
  const startResultNumber = endResultNumber;

  const previousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfMaxVisiblePages);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= halfMaxVisiblePages) {
      endPage = maxVisiblePages;
    } else if (currentPage >= totalPages - halfMaxVisiblePages) {
      startPage = totalPages - maxVisiblePages + 1;
    }

    for (let page = startPage; page <= endPage; page++) {
      pageNumbers.push(
        <li key={page} className="page-item">
          <Button
            variant="link"
            className={page === currentPage ? "page-link active" : "page-link"}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <>
      <div className="col-sm">
        {/* <div className="text-muted">
          <span className="fw-semibold">
            {startResultNumber >= 0 ? (
              <span>
                {startResultNumber}{" "}
                {startResultNumber === 1 ? "result" : "results"}{" "}
              </span>
            ) : (
              <span>{startResultNumber} results </span>
            )}
          </span>
          <span>for </span>
          <span className="fw-semibold">"{searchValues}"</span>
        </div> */}

        {/* previous code  */}
        <div className="text-muted">
          Showing <span className="fw-semibold">{startResultNumber > dataLength ? dataLength : startResultNumber}</span> of{" "}
          <span className="fw-semibold">
            {dataLength}
          </span>{" "}
          Results
        </div>
      </div>
      <div className="align-items-center mt-2 py-2 px-2 gy-2 text-center text-sm-start">
        <div className="col-sm-auto">
          <ul className="pagination pagination-separated mb-0 justify-content-center justify-content-sm-start">
            <li
              className={currentPage === 1 ? "page-item disabled" : "page-item"}
            >
              <Button
                variant="link"
                className="page-link"
                onClick={goToFirstPage}
              >
                First
              </Button>
            </li>
            <li
              className={currentPage === 1 ? "page-item disabled" : "page-item"}
            >
              <Button
                variant="link"
                className="page-link"
                onClick={previousPage}
              >
                Pre
              </Button>
            </li>
            {renderPageNumbers()}
            <li
              className={
                currentPage === totalPages ? "page-item disabled" : "page-item"
              }
            >
              <Button variant="link" className="page-link" onClick={nextPage}>
                Next
              </Button>
            </li>
            <li
              className={
                currentPage === totalPages ? "page-item disabled" : "page-item"
              }
            >
              <Button
                variant="link"
                className="page-link"
                onClick={goToLastPage}
              >
                Last
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
