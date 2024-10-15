import axios from 'axios';
import React, { useState } from 'react';

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

  // implement search function later
  const handelSearch = async () => {
    // console.log('Suche nach:', searchQuery);
    try {
      const response = await axios.get(
        'https://marketplace-api.sshopencloud.eu/api/item-search',
        {
          // Parameters as stated inthe assessment
          params: {
            q: searchQuery,
            categories: 'tool-or-service',
            page: page,
            pageSize: pageSize,
          },
        },
      );
      // Put results in State
      setResults(response.data.items);

      // calculate total amount of pages
      setTotalPages(Math.ceil(response.data.totalItems / pageSize));

      // test in console
      console.log('Results:', response.data.items);
    } catch (error) {
      console.error('Fehler bei der API-Anfrage:', error);
    }
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

  return (
    <div>
      <h1>Social Sciences & Humanities Open Marketplace</h1>

      {/* Search field */}
      <div>
        <input
          type="text"
          placeholder="Suchbegriff eingeben..."
          value={searchQuery}
          // Aktualisiert den State bei Eingabe
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button onClick={handelSearch}>Search</button>
      </div>

      {/* Results list */}
      <div>
        <h2>Search results</h2>
        <ul>
          {results.map((item) => (
            <li key={item.id}>
              <strong>{item.label}</strong>
              <br />
              Accessible at: {item.accessibleAt}
              <br />
              Contributors: {item.contributors.join(', ')}
            </li>
          ))}
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
  );
}
