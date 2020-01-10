import React from 'react';

export default function Paginate(props) {
    return (
        <nav
            className="pagination is-centered"
            role="navigation"
            aria-label="pagination"
        >
            <a
                href="#previous"
                className="pagination-previous"
                aria-label="Go to previous page"
            >
                Previous
            </a>
            <a
                href="#next"
                className="pagination-next"
                aria-label="Go to next page"
            >
                Next page
            </a>
        </nav>
    );
}
