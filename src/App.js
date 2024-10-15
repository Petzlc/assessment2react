import axios from 'axios';
import React, { useState } from 'react';
// Router Setup
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import ItemDetail from './ItemDetail';

export default function App() {
  // set state for the input in the searchbar
  const [searchQuery, setSearchQuery] = useState('');

  // state for the results
  const [results, setResults] = useState([]);

  // current page
  const [page, setPage] = useState(1);

  // page size or number of items per page
  const [pageSize, setPageSize] = useState(10);

  // Total amount of pages
  const [totalPages, setTotalPages] = useState(1);

  // amount of items per page
  // const [totalItems, setTotalItems] = useState(0);

  // handle search
  const handelSearch = async () => {
    // console.log('Suche nach:', searchQuery);
    try {
      const response = await axios.get(
        'https://marketplace-api.sshopencloud.eu/api/item-search',
        {
          // Parameters as stated in the assessment
          params: {
            q: searchQuery,
            categories: 'tool-or-service',
          },
        },
      );

      const allResults = response.data.items || [];
      setResults(allResults);

      // calculate total amount of pages, if no items set to 1
      setTotalPages(Math.ceil(allResults.length / pageSize));
      // reset to first page on new seearch
      setPage(1);
    } catch (error) {
      console.error('Fehler bei der API-Anfrage:', error);
    }
  };

  // calculate visible results based on page and size
  const getPaginatedResults = () => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // return only items for the current page
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
    // Update total pages based on new pageSize
    setTotalPages(Math.ceil(results.length / newSize));
    // Reset to first page on size change
    setPage(1);
  };

  return (
    // Router configuration
    <>
      <Router>
        <Routes>
          {/* Main page with search bar */}
          <Route path="/" element={<SearchView />} />
          {/*  detail view for certain items */}
          <Route path="/tools-services/:id" element={<ItemDetail />} />
        </Routes>
      </Router>
      <div>
        <h1>Social Sciences & Humanities Open Marketplace</h1>

        {/* Search field */}
        <div>
          <input
            type="text"
            placeholder="Suchbegriff eingeben..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <button onClick={handelSearch}>Search</button>
        </div>

        {/* Choose page size */}
        <div>
          <label htmlFor="pageSize">Results per Page</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
          </select>
        </div>

        {/* Results list */}
        <div>
          <h2>Search results</h2>
          <ul>
            {getPaginatedResults().length > 0 ? (
              getPaginatedResults().map((item) => (
                <li key={item.id}>
                  <Link to={`/tools-services/${item.id}`}>
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
        <div>
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
    </>
  );
}
