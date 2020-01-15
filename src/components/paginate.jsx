/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

function Paginate(props) {
    const { meta, onPageChange } = props;
    const { has_previous, has_next, current_page } = meta;

    return (
        <nav
            className="pagination is-centered"
            role="navigation"
            aria-label="pagination"
        >
            {has_previous ? (
                <a
                    href="#previous"
                    className="pagination-previous"
                    aria-label="Go to previous page"
                    onClick={(e) => {
                        e.preventDefault();
                        onPageChange(current_page - 1);
                    }}
                >
                    Previous page
                </a>
            ) : null}
            {has_next ? (
                <a
                    href="#next"
                    className="pagination-next"
                    aria-label="Go to next page"
                    onClick={(e) => {
                        e.preventDefault();
                        onPageChange(current_page + 1);
                    }}
                >
                    Next page
                </a>
            ) : null}
        </nav>
    );
}

Paginate.propTypes = {
    meta: PropTypes.objectOf(PropTypes.any).isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Paginate;
