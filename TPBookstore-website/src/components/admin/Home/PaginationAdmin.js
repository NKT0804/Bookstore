import React from "react";
import { Link } from "react-router-dom";

const PaginationAdmin = (props) => {
  const { page, pages, keyword = "", basePath = "/" } = props;
  const previousPageQuery = `&p=${page > 1 ? page - 1 : page}`;
  const nextPageQuery = `&p=${page < pages ? page + 1 : pages}`;
  const keywordQuery = keyword ? `?q=${keyword}` : "?";

  return (
    pages > 1 && (
      <nav className="pagination-group">
        <div className="icon-left">
          <Link to={`${basePath}${keywordQuery}${previousPageQuery}`}>
            <i className="fas fa-chevron-left"></i>
          </Link>
        </div>
        <ul className="pagination justify-content-center">
          {[...Array(pages).keys()].map((x) => (
            <li className={`page-item ${x + 1 === page ? "active" : ""}`} key={x + 1}>
              <Link className="page-link" to={`${basePath}${keywordQuery}&p=${x + 1}`}>
                {x + 1}
              </Link>
            </li>
          ))}
        </ul>
        <div className="icon-right">
          <Link to={`${basePath}${keywordQuery}${nextPageQuery}`}>
            <i className="fas fa-chevron-right"></i>
          </Link>
        </div>
      </nav>
    )
  );
};

export default PaginationAdmin;
