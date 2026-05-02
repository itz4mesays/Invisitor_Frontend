import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, ChevronDown } from 'lucide-react';
import './Pagination.css';

const Pagination = ({
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  siblingCount = 1
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  // If there are less than 2 pages, don't show pagination
  if (totalPages < 2) {
    return null;
  }

  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const getPaginationOptions = () => {
    // Total numbers to display: siblings * 2 + 3 (first, current, last) + 2 (ellipsis placeholders) => roughly 7
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, '...', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, '...', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }
  };

  const paginationRange = getPaginationOptions();

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="custom-pagination-container">
      <div className="custom-pagination-info">
        Showing <span>{startRecord}</span> to <span>{endRecord}</span> of <span>{totalCount}</span> records
      </div>
      
      {/* Page Size Selector */}
      <div className="custom-pagination-page-size">
        <span>Show:</span>
        <div className="custom-page-size-selector">
          <select 
            value={pageSize} 
            onChange={(e) => onPageSizeChange && onPageSizeChange(Number(e.target.value))}
            className="custom-page-size-select"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <ChevronDown size={14} className="custom-page-size-arrow" />
        </div>
      </div>
      
      <div className="custom-pagination-controls">
        <button
          className={`custom-pagination-btn nav-btn ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {paginationRange.map((pageNumber, idx) => {
          if (pageNumber === '...') {
            return (
              <span key={`dots-${idx}`} className="custom-pagination-dots">
                <MoreHorizontal size={14} />
              </span>
            );
          }

          return (
            <button
              key={pageNumber}
              className={`custom-pagination-btn number-btn ${pageNumber === currentPage ? 'active' : ''}`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          className={`custom-pagination-btn nav-btn ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
