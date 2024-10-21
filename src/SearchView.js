import './SearchView.scss';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SearchView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const handelSearch = async () => {
    try {
      const response = await axios.get(
        'https://marketplace-api.sshopencloud.eu/api/item-search',
        {
          params: {
            q: searchQuery,
            categories: 'tool-or-service',
          },
        },
      );
      const allResults = response.data.items || [];
      setResults(allResults);
      setTotalPages(Math.ceil(allResults.length / pageSize));
      setPage(1);
    } catch (error) {
      console.error('Fehler bei der API-Anfrage:', error);
    }
  };

  const getPaginatedResults = () => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return results.slice(startIndex, endIndex);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handlePageSizeChange = (event) => {
    const newSize = Number(event.target.value);
    setPageSize(newSize);
    setTotalPages(Math.ceil(results.length / newSize));
    setPage(1);
  };

  return (
    <div className="search-container">
      <h1>Social Sciences & Humanities Open Marketplace</h1>

      {/* Search field */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Suchbegriff eingeben..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button onClick={handelSearch}>Search</button>
      </div>

      {/* Choose page size */}
      <div className="page-size-selector">
        <label htmlFor="pageSize">Results per Page</label>
        <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={8}>8</option>
        </select>
      </div>

      {/* Results list */}
      <div className="results">
        <h2>Search results</h2>
        <ul>
          {getPaginatedResults().length > 0 ? (
            getPaginatedResults().map((item) => (
              <li key={item.persistentId}>
                <Link to={`/tools-services/${item.persistentId}`}>
                  <strong>{item.label}</strong>
                </Link>
                <br />
                Accessible at: {item.accessibleAt}
                <br />
                Contributors: {item.contributors.join(', ')}
              </li>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </ul>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          {'<'}
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          {'>'}
        </button>
      </div>
    </div>
  );
}
